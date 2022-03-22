import './Recipes.less';
import React, { useEffect, useState } from 'react';
import {
	Alert,
	Button,
	Form,
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
import RecipesService from '../../services/RecipesService';
import RecipeDetailsService from '../../services/RecipeDetailsService';
import CommonForm from '../../components/CommomForm/CommomForm';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { ErrorContext } from '../../providers/ErrorProvider';
import ProductsService from '../../services/ProductsService';
import { DeleteOutlined } from '@ant-design/icons';

const EditableCell = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode =
		dataIndex === 'quantity' ? (
			<InputNumber />
		) : (
			<Input style={{ with: '150vh' }} disabled={true} />
		);
	// const inputNode = <InputNumber />;
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const Recipe = () => {
	const [recipe, setRecipe] = useState({});
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
	const productsService = new ProductsService();
	const recipesService = new RecipesService();
	const recipesDetailsService = new RecipeDetailsService();
	const { Option } = Select;
	const { Text } = Typography;
	const successAlertType = 'success';
	const errorAlertType = 'error';

	const isEditing = (record) => record.key === editingRow;

	const edit = (record) => {
		form.setFieldsValue({
			measure: '',
			quantity: '',
			...record,
		});
		setEditingRow(record.key);
	};

	const cancel = () => {
		setEditingRow('');
	};

	const save = async (key) => {
		try {
			const newRow = await form.getFieldValue();
			const newRecipes = [...recipes];
			const index = newRecipes.findIndex((item) => key === item.key);
			if (index > -1) {
				const item = newRecipes[index];
				newRecipes.splice(index, 1, { ...item, ...newRow });
				setRecipes(newRecipes);
				setEditingRow('');
			} else {
				newRecipes.push(newRow);
				setRecipes(newRecipes);
				setEditingRow('');
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	const columns = [
		{
			title: 'Product name',
			dataIndex: 'product_name',
			align: 'left',
			key: 'product_name',
			width: '20%',
			render: (_, record) => renderSelect(record),
		},
		{
			title: 'Measure',
			dataIndex: 'measure',
			align: 'left',
			key: 'measure',
			width: '5%',
			editable: true,
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			align: 'left',
			key: 'quantity',
			editable: true,
			width: '5%',
		},
		{
			title: 'Action',
			dataIndex: 'action',
			width: '5%',
			render: (_, record) => renderAction(record),
		},
	];

	const handleSaveRecipe = async (values) => {
		setLoading(true);
		let response;
		if (recipe?.id) {
			response = await recipesService.update(id, values);
		} else {
			response = await recipesService.create(values);
		}
		if (response?.status === 'OK') {
			if (recipe?.id) {
				response = await recipesDetailsService.update(id, recipes);
			} else {
				response = await recipesDetailsService.create(
					response.data.recipe.id,
					recipes
				);
			}
			if (response?.status === 'OK') {
				setMessageAlert(response.message);
				setTypeAlert(successAlertType);
				setVisibleAlert(true);
				// handleCloseRecipe();
				setLoading(false);
			} else {
				setMessageAlert(response.message);
				setTypeAlert(errorAlertType);
				setVisibleAlert(true);
				setLoading(false);
			}
		} else {
			setMessageAlert(response.message);
			setTypeAlert(errorAlertType);
			setVisibleAlert(true);
			setLoading(false);
		}
	};

	const getModalDescription = () => {
		return [
			<Text key={1} strong>
				{`The recipe ${recipe.name} has assigned in calendar.`}
			</Text>,
			<Text key={2}>
				{' '}
				{`Please confirm you want to delete ${recipe.name}.`}
			</Text>,
		];
	};

	const toggleShowModal = () => setShowModal(!showModal);

	const deleteRecipe = async () => {
		setLoading(true);
		toggleShowModal();

		try {
			const response = await recipesService.delete(recipe.id);
			handleCloseRecipe();
		} catch (err) {
			// setError(err.toString());
		} finally {
			setLoading(false);
		}
	};

	const setValuesRecipe = () => {
		setRecipeName(recipe.name);
		form.setFieldsValue({
			measure_id: recipe.measure_id,
			type_id: recipe.type_id,
			name: recipe.name,
		});
	};

	const resetValuesForm = () => {
		form.setFieldsValue({
			name: '',
			type_id: '',
			measure_id: '',
		});
	};

	const getProducts = () => {
		setLoading(true);

		productsService
			.getAll()
			.then((result) => {
				if (typeof result != 'undefined') {
					console.log('result:', result);
					setProducts(result.products);
				}
			})
			.catch((err) => {
				console.error(err.toString());
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleSelectChange = (index) => {
		const productFind = products.find((product) => product.id === index);
		form.setFieldsValue({
			product_name: productFind.name,
			measure: productFind.measure_name,
			quantity: 0,
			product_id: index,
		});
	};

	const renderSelect = (record) => (
		<div>
			<Select
				style={{ width: '100%' }}
				onChange={handleSelectChange}
				disabled={editingRow === record.key ? false : true}
				defaultValue={record.product_id}
				showSearch
				optionFilterProp='children'
				filterOption={(input, option) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
				filterSort={(optionA, optionB) =>
					optionA.children
						.toLowerCase()
						.localeCompare(optionB.children.toLowerCase())
				}
			>
				{products.map((product, index) => (
					<Option
						value={product.id}
						key={product.id}
						// disabled={product?.disabled}
					>
						{product.name}
					</Option>
				))}
			</Select>
		</div>
	);

	const renderAction = (record) => {
		const editable = isEditing(record);
		return editable ? (
			<span>
				<Typography.Link
					onClick={() => save(record.key)}
					style={{
						marginRight: 8,
					}}
				>
					Save
				</Typography.Link>
				<Popconfirm title='Sure to cancel?' onConfirm={cancel}>
					<a>Cancel</a>
				</Popconfirm>
			</span>
		) : (
			<span>
				<Typography.Link
					disabled={editingRow !== ''}
					onClick={() => edit(record)}
					style={{
						marginRight: 8,
					}}
				>
					Edit
				</Typography.Link>
				<Popconfirm
					title='Sure to delete?'
					onConfirm={() => handleDelete(record.key)}
				>
					<a>Delete</a>
				</Popconfirm>
			</span>
		);
	};

	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}

		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: col.dataIndex === 'number',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	const handleCloseAlert = () => {
		setVisibleAlert(false);
	};

	const handleCloseRecipe = () => {
		goToRecipesList();
	};

	const handleDelete = (key) => {
		const recipesTemporary = [...recipes];
		setRecipes(recipesTemporary.filter((item) => item.key !== key));
	};

	const goToRecipesList = () => history.replace('/recipes');

	const setDataTableDetails = (dataTable) => {
		for (let index = 0; index < dataTable.length; index++) {
			form.setFieldsValue({
				product_name: dataTable[index].product_name,
				measure: dataTable[index].measure,
				quantity: dataTable[index].quantity,
				product_id: dataTable[index].product_id,
			});
		}
	};

	const handleAddRow = () => {
		setTotalCount(totalCount + 1);
		setRecipes([...recipes, defaultRow]);
	};

	const getRecipe = (id) => {
		setLoading(true);
		recipesService
			.get(id)
			.then((result) => {
				if (result) {
					setRecipe(result.recipe);
					form.setFieldsValue({
						recipe_name: result.recipe.name,
					});

					setDataTableDetails(result.tableData);
					setRecipes(result.tableData);
					setTotalCount(result.tableData.length);
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
		// resetValuesForm();
		getProducts();
		if (id) {
			getRecipe(id);
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
				<CommonForm
					title={id ? 'Update recipe' : 'Add a new recipe'}
					primaryButton='Save recipe'
					onSubmit={handleSaveRecipe}
					onCancel={handleCloseRecipe}
					form={form}
				>
					<Form.Item
						className='user-name'
						name='recipe_name'
						label='Recipe name'
						dataIndex='recipe_name'
						rules={[{ required: true }, { min: 2 }, { max: 50 }]}
					>
						<Input />
					</Form.Item>
					<Button
						onClick={handleAddRow}
						type='primary'
						style={{
							marginBottom: 16,
						}}
					>
						Add a row
					</Button>
					<div
						style={{
							marginBottom: 25,
							height: '60vh',
						}}
					>
						<Table
							size='middle'
							components={{
								body: {
									cell: EditableCell,
								},
							}}
							rowClassName='editable-row'
							bordered
							dataSource={recipes}
							columns={mergedColumns}
							pagination={{
								onChange: cancel,
							}}
							scroll={{ x: '100vh', y: '45vh' }}
						/>
					</div>
					{recipe?.id && (
						<Button
							className='delete-button'
							type='link'
							icon={<DeleteOutlined />}
							onClick={toggleShowModal}
							disabled={loading}
							danger
							style={{ marginBlockEnd: '2.0em' }}
						>
							Delete recipe
						</Button>
					)}

					{loading && (
						<Spin style={{ display: 'flex', justifyContent: 'center' }} />
					)}
					<ConfirmModal
						sideSeparation='0px'
						visible={showModal}
						cancelTitle='No, cancel'
						okTitle='Yes, delete recipe'
						handleOk={deleteRecipe}
						handleCancel={toggleShowModal}
						description={getModalDescription()}
					/>
				</CommonForm>
			</Content>
		</Layout>
	);
};

export default Recipe;
