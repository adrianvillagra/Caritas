import './Commerce.less';
import React, { useEffect, useState } from 'react';
import {
	Alert,
	Button,
	Form,
	Divider,
	Input,
	Select,
	Spin,
	Layout,
	Typography,
	Table,
	InputNumber,
	Popconfirm,
} from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import CommerceService from '../../services/CommerceServices';
import InvoiceService from '../../services/CommerceServices';
import CommonForm from '../../components/CommomForm/CommomForm';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { ErrorContext } from '../../providers/ErrorProvider';
import { DeleteOutlined } from '@ant-design/icons';

const Commerce = () => {
	const [commerce, setCommerce] = useState({});
	const [products, setProducts] = useState([]);
	const [recipeName, setRecipeName] = useState('');
	const [visibleAlert, setVisibleAlert] = useState(false);
	const [typeAlert, setTypeAlert] = useState('');
	const [messageAlert, setMessageAlert] = useState('');
	const [totalCount, setTotalCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const defaultRow = { key: totalCount, product_id: '', quantity: 0 };
	const [recipes, setRecipes] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [editingRow, setEditingRow] = useState('');
	// const { setError } = React.useContext(ErrorContext);
	const [form] = Form.useForm();
	const { id } = useParams();
	const history = useHistory();
	const { Content } = Layout;
	const commerceService = new CommerceService();
	const { Option } = Select;
	const { Text } = Typography;
	const successAlertType = 'success';
	const errorAlertType = 'error';

	const handleSaveCommerce = async (values) => {
		setLoading(true);
		let response;
		if (commerce?.id) {
			response = await commerceService.update(id, values);
		} else {
			response = await commerceService.create(values);
		}
		if (response?.statusText === 'OK') {
			setMessageAlert(response.data.message);
			setTypeAlert(successAlertType);
			setVisibleAlert(true);
		} else {
			setMessageAlert(response.data.message);
			setTypeAlert(errorAlertType);
			setVisibleAlert(true);
		}
		setLoading(false);
	};

	const getModalDescription = () => {
		return [
			<Text key={1} strong>
				{`The commerce ${commerce.name} has assigned in receives.`}
			</Text>,
			<Text key={2}>
				{' '}
				{`Please confirm you want to delete ${commerce.name}.`}
			</Text>,
		];
	};

	const toggleShowModal = () => setShowModal(!showModal);

	const deleteCommerce = async () => {
		setLoading(true);
		toggleShowModal();

		try {
			const response = await commerceService.delete(commerce.id);
			handleCloseCommerce();
		} catch (err) {
			// setError(err.toString());
		} finally {
			setLoading(false);
		}
	};

	const handleCloseAlert = () => {
		setVisibleAlert(false);
	};

	const handleCloseCommerce = () => {
		goToRecipesList();
	};

	const handleDelete = (key) => {
		const recipesTemporary = [...recipes];
		setRecipes(recipesTemporary.filter((item) => item.key !== key));
	};

	const goToRecipesList = () => history.replace('/commerces');

	const getCommerce = (id) => {
		setLoading(true);
		commerceService
			.get(id)
			.then((result) => {
				if (typeof result != 'undefined') {
					setCommerce(result);
					form.setFieldsValue({
						name: result.name,
						socialReason: result.socialReason,
						address: result.address,
						cuit: result.cuit,
					});
				}
			})
			.catch((err) => {
				setMessageAlert(err);
				setTypeAlert(errorAlertType);
				setVisibleAlert(true);
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		if (id) {
			getCommerce(id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Layout
			style={{
				height: 'auto',
				padding: '20px 20px',
				backgroundColor: '#ffffff',
			}}
		>
			<Content style={{ width: '100%', height: 'auto' }}>
				{visibleAlert && (
					<div style={{ paddingBlockEnd: '1.5em' }}>
						<Alert
							afterClose={handleCloseAlert}
							message={messageAlert}
							type={typeAlert}
							showIcon
							closable
						/>
					</div>
				)}
				<div style={{ paddingBlockEnd: '2.5em' }}>
					<CommonForm
						title={id ? 'Update Commerce' : 'New Commerce'}
						primaryButton='Save commerce'
						onCancel={handleCloseCommerce}
						onSubmit={handleSaveCommerce}
						form={form}
					>
						<Form.Item
							className='field-name'
							name='name'
							label='Commerce Name'
							rules={[{ required: true }, { min: 2 }, { max: 50 }]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							className='field-name'
							name='socialReason'
							label='Social Reason'
							rules={[{ required: true }, { min: 2 }, { max: 50 }]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							className='field-name'
							name='cuit'
							label='CUIT'
							rules={[{ required: true }, { min: 2 }, { max: 50 }]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							className='field-name'
							name='address'
							label='Address'
							rules={[{ required: true }, { min: 2 }, { max: 50 }]}
						>
							<Input />
						</Form.Item>
						<Divider className='divider' />
						{commerce?.id && (
							<Button
								className='delete-button'
								type='link'
								icon={<DeleteOutlined />}
								onClick={toggleShowModal}
								disabled={loading}
								danger
								style={{ marginBlockEnd: '2.0em' }}
							>
								Delete commerce
							</Button>
						)}

						{loading && (
							<Spin style={{ display: 'flex', justifyContent: 'center' }} />
						)}
						<ConfirmModal
							sideSeparation='0px'
							visible={showModal}
							cancelTitle='No, cancel'
							okTitle='Yes, delete commerce'
							handleOk={deleteCommerce}
							handleCancel={toggleShowModal}
							description={getModalDescription()}
						/>
					</CommonForm>
				</div>
			</Content>
		</Layout>
	);
};

export default Commerce;
