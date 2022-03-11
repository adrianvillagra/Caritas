import React, { useEffect, useState } from 'react';
import { Alert, Col, Input, Row, Typography, Button, List, Spin } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import CustomBreadcrum from '../Breadcrum/CustomBreadcrum';
import RecipesService from '../../services/RecipesService';
import { ErrorContext } from '../../providers/ErrorProvider';
import { useHistory } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Product from '../Product/Product';
import Item from '../Item/Item';

const RecipesList = () => {
	const [recipes, setRecipes] = useState([]);
	const [isProductVisible, setIsProductVisible] = useState(false);
	const [recipesListFiltered, setRecipesListFiltered] = useState([]);
	const [messageAlert, setMessageAlert] = useState('');
	const [selected, setSelected] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [typeAlert, setTypeAlert] = useState('');
	const [totalCount, setTotalCount] = useState(0);
	const [visibleAlert, setVisibleAlert] = useState(false);
	const history = useHistory();
	// const { setError } = useContext(ErrorContext);
	const recipesService = new RecipesService();
	const { Text } = Typography;
	const routes = [{ path: '../', breadcrumbName: 'Home' }];

	const resetSelected = () => setSelected(null);

	const getSelectedName = () => {
		return selected && selected.name ? `${selected.name}` : '';
	};

	const getModalDescription = () => {
		return [
			<Text key={1} strong>
				The recipe {getSelectedName()} has active recipes.
			</Text>,
			<Text key={2}>
				{' '}
				Please confirm you want to delete {getSelectedName()}.
			</Text>,
		];
	};

	const goToAddRecipe = () => history.push('/recipe');

	const toggleShowModal = (item) => {
		setShowModal(!showModal);

		if (item && item.id) {
			setSelected(item);
		}
	};

	const deleteRecipe = async (id) => {
		setLoading(true);

		//TODO:VERIFICAR SI TIENE CARGADO EN ALGUN CALENDARIO

		try {
			const response = await recipesService.delete(id);
		} catch (err) {
			// setError(err.toString());
		} finally {
			setLoading(false);
		}
	};

	const getRecipesList = async () => {
		setLoading(true);
		recipesService
			.getAll()
			.then((result) => {
				if (typeof result != 'undefined') {
					setRecipes(result.recipes);
					setTotalCount(result.total);
					recipesListFiltered(result.recipes);
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
			setRecipesListFiltered({
				...recipesListFiltered,
				name: event.target.value,
			});
			if (event.target.value) {
				const results = [];
				const elements = recipes.filter((item) => {
					return item.title
						.toLowerCase()
						.startsWith(valueToSearch.toLowerCase());
				});
				if (elements.length !== 0) {
					results.push(...elements);
				}
				setRecipesListFiltered(results);
			} else {
				setRecipesListFiltered(recipes);
			}
		}
	};

	const handleCloseAlert = () => {
		setVisibleAlert(false);
	};

	useEffect(() => {
		getRecipesList();
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
								onClick={goToAddRecipe}
								icon={<PlusOutlined />}
							>
								Add new product
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
					getRecipesList(pagination.pageSize, pagination.current)
				}
				dataSource={recipes}
				renderItem={(item) => (
					<Item recipe={item} onDelete={(id) => deleteRecipe(id)} />
				)}
			/>
			{loading && (
				<Spin style={{ display: 'flex', justifyContent: 'center' }} />
			)}
		</div>
	);
};

export default RecipesList;
