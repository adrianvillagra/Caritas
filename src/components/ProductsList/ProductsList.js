import './ProductsList.less';
import React, { useContext, useEffect, useState } from 'react';
import {
	Alert,
	Col,
	Input,
	Table,
	Row,
	Typography,
	Button,
	Tooltip,
	Divider,
} from 'antd';
import {
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
	SearchOutlined,
	SortDescendingOutlined,
} from '@ant-design/icons';
import CustomBreadcrum from '../Breadcrum/CustomBreadcrum';
import ProductsService from '../../services/ProductsService';
import { ErrorContext } from '../../providers/ErrorProvider';
import { useHistory } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Product from '../Product/Product';

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [isProductVisible, setIsProductVisible] = useState(false);
	const [productSelected, setProductSelected] = useState([]);
	const [productsListFiltered, setProductListFiltered] = useState([]);
	const [messageAlert, setMessageAlert] = useState('');
	const [selected, setSelected] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [typeAlert, setTypeAlert] = useState('');
	const [totalCount, setTotalCount] = useState(0);
	const [visibleAlert, setVisibleAlert] = useState(false);
	const history = useHistory();
	// const { setError } = useContext(ErrorContext);
	const productsService = new ProductsService();
	const { Text } = Typography;
	const routes = [{ path: '../', breadcrumbName: 'Home' }];

	const resetSelected = () => setSelected(null);

	const getSelectedName = () => {
		return selected && selected.name ? `${selected.name}` : '';
	};

	const getModalDescription = () => {
		return [
			<Text key={1} strong>
				The product {getSelectedName()} has active recipes.
			</Text>,
			<Text key={2}>
				{' '}
				Please confirm you want to delete {getSelectedName()}.
			</Text>,
		];
	};

	const goToEditProduct = (item) => {
		setSelected(item);
		setIsProductVisible(true);
	};

	const goToAddProduct = () => {
		setSelected(null);
		setIsProductVisible(true);
	};

	const toggleShowModal = (item) => {
		setShowModal(!showModal);

		if (item && item.id) {
			setSelected(item);
		}
	};

	const deleteProduct = async () => {
		setLoading(true);
		toggleShowModal();

		try {
			// await service.delete(selected.key);
			// getClients();
		} catch (err) {
			// setError(err.toString());
		} finally {
			setLoading(false);
		}
	};

	const actions = (item) => {
		return (
			<div className='flex'>
				<Tooltip placement='top' title='Edit product'>
					<EditOutlined
						style={{ color: '#1991EB' }}
						onClick={() => goToEditProduct(item)}
					/>
				</Tooltip>
				<Divider type='vertical' style={{ margin: '0 10px' }} />
				<Tooltip placement='top' title='Delete product'>
					<DeleteOutlined
						style={{ color: '#1991EB' }}
						onClick={() => toggleShowModal(item)}
					/>
				</Tooltip>
			</div>
		);
	};

	const renderText = (text) => <a> {text} </a>;

	const columns = [
		{
			title: (
				<div>
					Product name <SortDescendingOutlined style={{ color: '#575757' }} />
				</div>
			),
			dataIndex: 'name',
			align: 'left',
			key: 'name',
			width: 300,
			render: (text) => renderText(text),
			// sorter: (a, b) => a.product.length - b.product.length,
			sortDirections: ['ascend', 'descend'],
		},
		{
			title: 'Mesuare',
			dataIndex: 'mesuare_name',
			align: 'left',
			key: 'mesuare_name',
			render: (text) => renderText(text),
		},
		{
			title: 'Type',
			dataIndex: 'type_name',
			align: 'left',
			key: 'type_name',
			render: (text) => renderText(text),
		},
		{
			title: 'Actions',
			dataIndex: '',
			key: 'x',
			align: 'right',
			render: (element) => actions(element),
		},
	];

	const getProductList = async () => {
		setLoading(true);
		productsService
			.getAll()
			.then((result) => {
				console.log('result:', result);
				if (typeof result != 'undefined') {
					setProducts(result.products);
					setTotalCount(result.totalCount);
					productsListFiltered(result.products);
				}
			})
			.catch((err) => {
				// setError(err.toString());
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const filterByName = (event) => {
		if (event.keyCode === 13) {
			const valueToSearch = event.target.value;
			setProductListFiltered({
				...productsListFiltered,
				name: event.target.value,
			});
			if (event.target.value) {
				const results = [];
				const elements = products.filter((item) => {
					return item.title
						.toLowerCase()
						.startsWith(valueToSearch.toLowerCase());
				});
				if (elements.length !== 0) {
					results.push(...elements);
				}
				setProductListFiltered(results);
			} else {
				setProductListFiltered(products);
			}
		}
	};

	const handleProductPanel = () => {
		resetSelected();
		setIsProductVisible(false);
	};

	const handleAlert = (message, type) => {
		setMessageAlert(message);
		setTypeAlert(type);
		setVisibleAlert(true);
	};

	const handleCloseAlert = () => {
		setVisibleAlert(false);
	};

	useEffect(() => {
		getProductList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='Products'>
			<div className='alert' style={{ paddingBlockEnd: '1.5em' }}>
				{visibleAlert && (
					<Alert
						onClose={handleCloseAlert}
						message={messageAlert}
						type={typeAlert}
						showIcon
						banner
						closable
					/>
				)}
			</div>

			<Row justify='space-between'>
				<Col>
					<CustomBreadcrum routes={routes} />
				</Col>
				<Col>
					<Row gutter={22} style={{ marginTop: '6px' }}>
						<Col style={{ paddingBlockEnd: '15px', width: '354px' }}>
							<Input
								width='354'
								placeholder='Search'
								onKeyDown={filterByName}
								suffix={<SearchOutlined />}
							/>
						</Col>
						<Col>
							<Button
								type='primary'
								onClick={goToAddProduct}
								icon={<PlusOutlined />}
							>
								Add new product
							</Button>
						</Col>
					</Row>
				</Col>
			</Row>
			<div className='ant-table-container'>
				<Table
					// rowKey={(record) => record.uid}
					columns={columns}
					dataSource={products}
					pagination={{
						total: totalCount,
						showQuickJumper: true,
						showSizeChanger: true,
					}}
					onChange={(pagination) =>
						getProductList(pagination.pageSize, pagination.current)
					}
					loading={loading}
				/>
			</div>

			<ConfirmModal
				afterClose={resetSelected}
				visible={showModal}
				cancelTitle='No, cancel'
				okTitle='Yes, delete product'
				handleOk={deleteProduct}
				handleCancel={toggleShowModal}
				description={getModalDescription()}
			/>

			<Product
				visible={isProductVisible}
				onClose={handleProductPanel}
				product={selected}
				alert={handleAlert}
			/>
		</div>
	);
};

export default ProductList;
