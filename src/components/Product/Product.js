import './Product.less';
import React, { useEffect, useState } from 'react';
import {
	Button,
	Divider,
	Form,
	Input,
	Select,
	Spin,
	Drawer,
	Typography,
} from 'antd';
import { func, bool, object } from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import ProductsService from '../../services/ProductsService';
import CommonForm from '../../components/CommomForm/CommomForm';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { DeleteOutlined } from '@ant-design/icons';
import { ErrorContext } from '../../providers/ErrorProvider';
import TypesService from '../../services/TypesService';
import MesuaresService from '../../services/MesuaresService';

const Product = ({ onClose, visible, product }) => {
	const [productName, setProductName] = useState('');
	const [types, setTypes] = useState([]);
	const [mesuares, setMesuares] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	// const { setError } = React.useContext(ErrorContext);
	const history = useHistory();
	const [form] = Form.useForm();
	const { id } = useParams();
	const typesService = new TypesService();
	const mesuaresService = new MesuaresService();
	const productsService = new ProductsService();
	const { Option } = Select;
	const { Text } = Typography;

	const backToProducts = () => history.replace('/products');

	const updateProduct = async (values) => {
		setLoading(true);

		try {
			await productsService.update(id, values);
			backToProducts();
		} catch (err) {
			// setError(err.toString());
		} finally {
			setLoading(false);
		}
	};

	const toggleShowModal = () => setShowModal(!showModal);

	const deleteProduct = async () => {
		setLoading(true);
		toggleShowModal();

		try {
			await productsService.delete(id);
			backToProducts();
		} catch (err) {
			// setError(err.toString());
		} finally {
			setLoading(false);
		}
	};

	const getProduct = (id) => {
		setLoading(true);

		productsService
			.get(id)
			.then((result) => {
				setProductName(result.name);
				form.setFieldsValue({
					name: result.name,
					type: result.type_id,
					mesuare: result.mesuare_id,
				});
			})
			.catch((err) => {
				console.error(err.toString());
				// setError(err.toString());
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const getMesuares = () => {
		setLoading(true);

		mesuaresService
			.getAll()
			.then((result) => {
				if (typeof result != 'undefined') {
					setMesuares(result);
					form.setFieldsValue({
						mesuare: result[0].id,
					});
				}
			})
			.catch((err) => {
				console.error(err.toString());
				// setError(err.toString());
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const getTypes = () => {
		setLoading(true);

		typesService
			.getAll()
			.then((result) => {
				if (typeof result != 'undefined') {
					setTypes(result);
					form.setFieldsValue({
						type: result[0].id,
					});
				}
			})
			.catch((err) => {
				console.error(err.toString());
				// setError(err.toString());
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const getModalDescription = () => {
		return [
			<Text key={1} strong>
				The product {productName} has active projects.
			</Text>,
			<Text key={2}> Please confirm you want to delete {productName}.</Text>,
		];
	};

	const handleCloseProduct = () => {
		onClose();
	};

	useEffect(() => {
		getMesuares();
		getTypes();
		if (product.length !== 0) {
			getProduct(product.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Drawer
				title='Create a new product'
				width={520}
				onClose={handleCloseProduct}
				visible={visible}
				bodyStyle={{ paddingBottom: 80 }}
			>
				<CommonForm
					title='Product details'
					primaryButton='Save product'
					onCancel={handleCloseProduct}
					onSubmit={() => {}}
					form={form}
				>
					<Form.Item
						className='field-name'
						name='name'
						label='Product Name'
						rules={[{ required: true }, { min: 2 }, { max: 50 }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						className='edit-product-types'
						name='type'
						label='Type'
						rules={[{ required: true }]}
					>
						<Select
							className='type-select'
							allowClear
							style={{ width: '100%' }}
							placeholder='Select type'
						>
							{types.map((mesuare, index) => (
								<Option key={index} value={mesuare.id}>
									{mesuare.name}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						className='edit-product-mesuares'
						name='mesuare'
						label='Mesuare'
						rules={[{ required: true }]}
					>
						<Select
							className='type-select'
							allowClear
							style={{ width: '100%' }}
							placeholder='Select mesuare'
						>
							{mesuares.map((type, index) => (
								<Option key={index} value={type.id}>
									{type.name}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Divider className='divider' />
					{product?.id && (
						<Button
							className='delete-button'
							type='link'
							icon={<DeleteOutlined />}
							onClick={toggleShowModal}
							disabled={loading}
							danger
							style={{ marginBlockEnd: '2.0em' }}
						>
							Delete product
						</Button>
					)}

					{loading && (
						<Spin style={{ display: 'flex', justifyContent: 'center' }} />
					)}
					<ConfirmModal
						sideSeparation='0px'
						visible={showModal}
						cancelTitle='No, cancel'
						okTitle='Yes, delete product'
						handleOk={deleteProduct}
						handleCancel={toggleShowModal}
						description={getModalDescription()}
					/>
				</CommonForm>
			</Drawer>
		</>
	);
};

Product.propTypes = {
	visible: bool.isRequired,
	onClose: func.isRequired,
	product: object.isRequired,
};

export default Product;
