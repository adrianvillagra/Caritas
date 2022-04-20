import './CalendarRecipes.less';
import React, { useEffect, useState } from 'react';
import {
	Alert,
	Badge,
	Button,
	Calendar,
	Col,
	Modal,
	Row,
	Select,
	Input,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CustomBreadcrum from '../Breadcrum/CustomBreadcrum';
import CalendarService from '../../services/CalendarService';
import RecipesService from '../../services/RecipesService';
import Batch from '../Batch/Batch';
import CustomBreadcrumb from '../Breadcrum/CustomBreadcrum';

const CalendarRecipes = () => {
	const [calendar, setCalendar] = useState([]);
	const [dateSelected, setDateSelected] = useState('');
	const [totalCount, setTotalCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [recipes, setRecipes] = useState([]);
	const [recipeIdSelected, setRecipeIdSelected] = useState();
	const [isBatchOpen, setIsBatchOpen] = useState(false);
	const [isVisibleModal, setIsVisibleModal] = useState(false);
	const [visibleAlert, setVisibleAlert] = useState(false);
	const [messageAlert, setMessageAlert] = useState('');
	const [typeAlert, setTypeAlert] = useState('');
	const recipesService = new RecipesService();
	const calendarService = new CalendarService();
	const { Option } = Select;
	const successAlertType = 'success';
	const errorAlertType = 'error';
	const defaultDateFormat = 'YYYY-MM-DD';
	const routes = [{ path: '../', breadcrumbName: 'Home' }];
	let lastBatchId = 1;
	let previousBatchId = 1;
	//gainsboro //==antiquewhitem  lightblue thistle

	const getListData = (value) => {
		const recipeToRenderTemp = calendar.find(
			(item) => item.date === value.format(defaultDateFormat)
		);
		const listData = recipeToRenderTemp
			? [
					{
						type: 'success',
						content: recipeToRenderTemp.name,
						id: recipeToRenderTemp.date,
						batch_id: recipeToRenderTemp.batch_id,
					},
			  ]
			: [];

		return listData;
	};

	function dateCellRender(value) {
		const listData = getListData(value);
		if (listData[0]) {
			lastBatchId =
				previousBatchId === listData[0].batch_id && listData[0].batch_id;
			if (lastBatchId === previousBatchId) {
				return (
					<div className='ul' style={{ backgroundColor: 'lightblue' }}>
						<ul className='events'>
							{listData.map((item) => (
								<li key={item.date}>
									<Badge status={item.type} text={item.content} />
								</li>
							))}
						</ul>
					</div>
				);
			} else {
				previousBatchId = listData[0].batch_id;
				return (
					<div className='ul' style={{ backgroundColor: 'thistle' }}>
						<ul className='events'>
							{listData.map((item) => (
								<li key={item.date}>
									<Badge status={item.type} text={item.content} />
								</li>
							))}
						</ul>
					</div>
				);
			}
		}
	}

	const getMonthData = (value) => {
		if (value.month() === 8) {
			return 1394;
		}
	};

	const monthCellRender = (value) => {
		const num = getMonthData(value);
		return num ? (
			<div className='notes-month'>
				<section>{num}</section>
				<span>Backlog number</span>
			</div>
		) : null;
	};

	const getCalendar = async () => {
		setLoading(true);
		calendarService
			.getAll()
			.then((result) => {
				if (typeof result != 'undefined') {
					setCalendar(result);
					lastBatchId = result[0].batch_id;
					setTotalCount(result.totalCount);
				}
			})
			.catch((err) => {
				console.error(err.toString());
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const getRecipes = async () => {
		setLoading(true);
		recipesService
			.getAll()
			.then((result) => {
				if (typeof result != 'undefined') {
					setRecipes(result.recipes);
					setRecipeIdSelected(result.recipes[0]?.id);
				}
			})
			.catch((err) => {
				console.error(err.toString());
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const setDefaultValues = () => {
		setRecipeIdSelected(recipes[0]?.id);
		setDateSelected('');
	};

	const onSelect = (date) => {
		const dateTemp = date.format(defaultDateFormat);
		const calendarIdFiltered = calendar.find((item) => item.date === dateTemp);
		setDateSelected(dateTemp);
		setRecipeIdSelected(calendarIdFiltered?.recipe_id ?? recipeIdSelected);
		setIsVisibleModal(true);
	};

	const reloadData = () => {
		getCalendar();
	};

	const handleSave = async () => {
		setLoading(true);
		let response;
		const calendarIdFiltered = calendar.find(
			(item) => item.date === dateSelected
		);

		if (calendarIdFiltered) {
			response = await calendarService.update(calendarIdFiltered.id, {
				recipe_id: recipeIdSelected,
			});
		} else {
			response = await calendarService.create({
				date: dateSelected,
				recipe_id: recipeIdSelected,
			});
		}

		if (response.status === 200) {
			setMessageAlert(response.data.message);
			setTypeAlert(successAlertType);
			setLoading(false);
		} else {
			setMessageAlert(response.data.message);
			setTypeAlert(errorAlertType);
			setIsVisibleModal(false);
		}

		setDefaultValues();
		setLoading(false);
		setIsVisibleModal(false);
		setVisibleAlert(true);
		reloadData();
	};

	const handleCancel = () => {
		setDefaultValues();
		setIsVisibleModal(false);
	};

	const handleCloseBatch = () => {
		setIsBatchOpen(false);
	};

	useEffect(() => {
		getCalendar();
		getRecipes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='Calendar'>
			{visibleAlert && (
				<div style={{ paddingBlockEnd: '1.5em' }}>
					<Alert
						// afterClose={handleCloseAlert}
						message={messageAlert}
						type={typeAlert}
						showIcon
						closable
					/>
				</div>
			)}
			<Row justify='space-between'>
				<Col>
					<CustomBreadcrumb routes={routes} />
				</Col>
				<Col>
					<Row gutter={22} style={{ marginTop: '6px' }}>
						<Col style={{ paddingBlockEnd: '15px' }}>
							<Button
								type='primary'
								onClick={() => setIsBatchOpen(true)}
								icon={<PlusOutlined />}
							>
								Add new batch
							</Button>
						</Col>
					</Row>
				</Col>
			</Row>
			<Calendar
				dateCellRender={dateCellRender}
				monthCellRender={monthCellRender}
				onSelect={onSelect}
			/>

			<Modal
				visible={isVisibleModal}
				title='Add recipe'
				onOk={handleSave}
				onCancel={handleCancel}
				footer={[
					<Button key='back' onClick={handleCancel}>
						Return
					</Button>,
					<Button
						key='submit'
						type='primary'
						loading={loading}
						onClick={handleSave}
					>
						Submit
					</Button>,
				]}
			>
				<p>Recipe</p>
				<Select
					className='recipe-select'
					style={{ width: '100%' }}
					placeholder='Select recipe'
					filterOption={(input, option) =>
						option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					defaultValue={recipeIdSelected}
					showSearch
					value={recipeIdSelected}
					onChange={(value) => setRecipeIdSelected(value)}
				>
					{recipes.map((recipe, index) => (
						<Option key={index} value={recipe.id}>
							{recipe.name}
						</Option>
					))}
				</Select>
			</Modal>
			<Batch visible={isBatchOpen} onClose={handleCloseBatch} />
		</div>
	);
};

export default CalendarRecipes;
