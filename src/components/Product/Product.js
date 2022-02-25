import './Product.less';
import React, { useEffect, useState } from 'react';
import {
	Alert,
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
import { useForm } from 'react-hook-form';

const Product = ({ onClose, visible, product }) => {
	const [productName, setProductName] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [typeAlert, setTypeAlert] = useState('');
	const [messageAlert, setMessageAlert] = useState('');
	const [types, setTypes] = useState([]);
	const [mesuares, setMesuares] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	// const { setError } = React.useContext(ErrorContext);
	const [form] = Form.useForm();
	const { id } = useParams();
	const typesService = new TypesService();
	const mesuaresService = new MesuaresService();
	const productsService = new ProductsService();
	const { Option } = Select;
	const { Text } = Typography;

	const handleSaveProduct = async (values) => {
		setLoading(true);

		try {
			const response = await productsService.update(product.id, values);
			setMessageAlert(response.data.message);
			setTypeAlert('success');
			// handleCloseProduct();
		} catch (err) {
			setMessageAlert(err);
			setTypeAlert('error');
			// setError(err.toString());
		} finally {
			setLoading(false);
			setShowAlert(true);
		}
	};

	const toggleShowModal = () => setShowModal(!showModal);

	const deleteProduct = async () => {
		setLoading(true);
		toggleShowModal();

		try {
			await productsService.delete(id);
			handleCloseProduct();
		} catch (err) {
			// setError(err.toString());
		} finally {
			setLoading(false);
		}
	};

	const setValuesProduct = () => {
		setProductName(product.name);
		form.setFieldsValue({
			mesuare_id: product.mesuare_id,
			type_id: product.type_id,
			name: product.name,
		});
	};

	const resetValuesForm = () => {
		form.setFieldsValue({
			name: '',
			type_id: '',
			mesuare_id: '',
		});
	};

	const getMesuares = () => {
		setLoading(true);

		mesuaresService
			.getAll()
			.then((result) => {
				if (typeof result != 'undefined') {
					setMesuares(result);
					if (!product?.id) {
						form.setFieldsValue({
							mesuare_id: result[0].id,
						});
					}
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
					if (!product?.id) {
						form.setFieldsValue({
							type_id: result[0].id,
						});
					}
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

	const getSelectedName = () => {
		return product && product.name ? `${product.name}` : '';
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

	const handleCloseProduct = () => {
		onClose();
	};

	useEffect(() => {
		resetValuesForm();
		getMesuares();
		getTypes();
		if (product?.id) {
			setValuesProduct();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product]);

	return (
		<>
			<Drawer
				title={product?.name ? `Edit ${product.name}` : 'Create a new product'}
				width={520}
				onClose={handleCloseProduct}
				visible={visible}
				bodyStyle={{ paddingBottom: 80 }}
			>
				<CommonForm
					title='Product details'
					primaryButton='Save product'
					onCancel={handleCloseProduct}
					onSubmit={handleSaveProduct}
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
						name='type_id'
						label='Type'
						rules={[{ required: true }]}
					>
						<Select
							className='type-select'
							style={{ width: '100%' }}
							placeholder='Select type'
						>
							{types.map((type, index) => (
								<Option key={index} value={type.id}>
									{type.name}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						className='edit-product-mesuares'
						name='mesuare_id'
						label='Mesuare'
						rules={[{ required: true }]}
					>
						<Select
							className='mesuare-select'
							allowClear
							style={{ width: '100%' }}
							placeholder='Select mesuare'
						>
							{mesuares.map((mesuare, index) => (
								<Option key={index} value={mesuare.id}>
									{mesuare.name}
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
			{showAlert && (
				<Alert message={messageAlert} type={typeAlert} showIcon closable />
			)}
		</>
	);
};

Product.propTypes = {
	visible: bool.isRequired,
	onClose: func.isRequired,
	product: object.isRequired,
};

export default Product;
