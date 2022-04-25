import React, { useEffect, useState } from 'react';
import { Alert, Col, Input, Row, Typography, Button, List, Spin } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import CustomBreadcrum from '../Breadcrum/CustomBreadcrum';
import CommerceService from '../../services/CommerceServices';
import { ErrorContext } from '../../providers/ErrorProvider';
import { useHistory } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import ItemCommerce from './Item/ItemCommerce';

const CommerceList = () => {
	const [commerces, setCommerces] = useState([]);
	const [isProductVisible, setIsProductVisible] = useState(false);
	const [batchListFiltered, setBatchListFiltered] = useState([]);
	const [messageAlert, setMessageAlert] = useState('');
	const [selected, setSelected] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [typeAlert, setTypeAlert] = useState('');
	const [totalCount, setTotalCount] = useState(0);
	const [visibleAlert, setVisibleAlert] = useState(false);
	const history = useHistory();
	// const { setError } = useContext(ErrorContext);
	const batchService = new CommerceService();
	const { Text } = Typography;
	const routes = [{ path: '../', breadcrumbName: 'Home' }];

	const resetSelected = () => setSelected(null);

	const getSelectedName = () => {
		return selected && selected.name ? `${selected.name}` : '';
	};

	const getModalDescription = () => {
		return [
			<Text key={1} strong>
				The batch {getSelectedName()} has active commerces.
			</Text>,
			<Text key={2}>
				{' '}
				Please confirm you want to delete {getSelectedName()}.
			</Text>,
		];
	};

	const goToAddCommerce = () => history.push('/commerce');

	const toggleShowModal = (item) => {
		setShowModal(!showModal);

		if (item && item.id) {
			setSelected(item);
		}
	};

	const deleteCommerce = async (id) => {
		setLoading(true);

		//TODO:VERIFICAR SI TIENE CARGADO EN ALGUN CALENDARIO

		try {
			const response = await batchService.delete(id);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const getCommerceList = async () => {
		setLoading(true);
		batchService
			.getAll()
			.then((commerces) => {
				if (typeof commerces != 'undefined') {
					setCommerces(commerces);
					setTotalCount(commerces.length);
					batchListFiltered(commerces);
				}
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const filterByName = (event) => {
		if (event.keyCode === 13) {
			const valueToSearch = event.target.value;
			setBatchListFiltered({
				...batchListFiltered,
				name: event.target.value,
			});
			if (event.target.value) {
				const results = [];
				const elements = commerces.filter((item) => {
					return item.title
						.toLowerCase()
						.startsWith(valueToSearch.toLowerCase());
				});
				if (elements.length !== 0) {
					results.push(...elements);
				}
				setBatchListFiltered(results);
			} else {
				setBatchListFiltered(commerces);
			}
		}
	};

	const handleCloseAlert = () => {
		setVisibleAlert(false);
	};

	useEffect(() => {
		getCommerceList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
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
								onClick={goToAddCommerce}
								icon={<PlusOutlined />}
							>
								Add new commerce
							</Button>
						</Col>
					</Row>
				</Col>
			</Row>
			<List
				size='large'
				pagination={{
					total: totalCount,
					showQuickJumper: true,
					showSizeChanger: true,
				}}
				onChange={(pagination) =>
					getCommerceList(pagination.pageSize, pagination.current)
				}
				dataSource={commerces}
				renderItem={(item) => (
					<ItemCommerce commerce={item} onDelete={(id) => deleteCommerce(id)} />
				)}
			/>
			{loading && (
				<Spin style={{ display: 'flex', justifyContent: 'center' }} />
			)}
		</div>
	);
};

export default CommerceList;
