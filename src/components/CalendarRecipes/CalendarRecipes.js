import './CalendarRecipes.less';
import React, { useEffect, useState } from 'react';
import { Alert, Badge, Button, Calendar, Modal, Select } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import CustomBreadcrum from '../Breadcrum/CustomBreadcrum';
import CalendarService from '../../services/CalendarService';
import RecipesService from '../../services/RecipesService';

const CalendarRecipes = () => {
	const [calendar, setCalendar] = useState([]);
	const [dateSelected, setDateSelected] = useState('');
	const [totalCount, setTotalCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [recipes, setRecipes] = useState([]);
	const [recipeIdSelected, setRecipeIdSelected] = useState();
	const [isVisibleModal, setIsVisibleModal] = useState(false);
	const [visibleAlert, setVisibleAlert] = useState(false);
	const [messageAlert, setMessageAlert] = useState('');
	const [typeAlert, setTypeAlert] = useState('');
	const recipesService = new RecipesService();
	const calendarService = new CalendarService();
	const { Option } = Select;
	const successAlertType = 'success';
	const errorAlertType = 'error';

	const getListData = (value) => {
		let listData;
		switch (value.date()) {
			case 8:
				listData = [
					{ type: 'warning', content: 'This is warning event.' },
					{ type: 'success', content: 'This is usual event.' },
				];
				break;
			case 10:
				listData = [
					{ type: 'warning', content: 'This is warning event.' },
					{ type: 'success', content: 'This is usual event.' },
					{ type: 'error', content: 'This is error event.' },
				];
				break;
			case 15:
				listData = [
					{ type: 'warning', content: 'This is warning event' },
					{ type: 'success', content: 'This is very long usual event。。....' },
					{ type: 'error', content: 'This is error event 1.' },
					{ type: 'error', content: 'This is error event 2.' },
					{ type: 'error', content: 'This is error event 3.' },
					{ type: 'error', content: 'This is error event 4.' },
				];
				break;
			default:
		}
		return listData || [];
	};

	const dateCellRender = (value) => {
		const listData = getListData(value);
		return (
			<ul className='events'>
				{listData.map((item) => (
					<li key={item.content}>
						<Badge status={item.type} text={item.content} />
					</li>
				))}
			</ul>
		);
	};

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
		const dateTemp = date.format('YYYY-MM-DD');
		const calendarIdFiltered = calendar.find((item) => item.date === dateTemp);
		setDateSelected(dateTemp);
		setRecipeIdSelected(calendarIdFiltered?.recipe_id ?? recipeIdSelected);
		setIsVisibleModal(true);
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
	};

	const handleCancel = () => {
		setDefaultValues();
		setIsVisibleModal(false);
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
		</div>
	);
};

export default CalendarRecipes;
