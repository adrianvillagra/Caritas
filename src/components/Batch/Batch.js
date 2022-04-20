import './Batch.less';
import React, { useEffect, useState } from 'react';
import {
	Alert,
	Button,
	Form,
	Select,
	Spin,
	List,
	Drawer,
	Typography,
	DatePicker,
} from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { func, bool } from 'prop-types';
import ProductsService from '../../services/ProductsService';
import CommonForm from '../../components/CommomForm/CommomForm';
import BatchService from '../../services/CalendarService';
import { useForm } from 'react-hook-form';

const Batch = ({ onClose, visible }) => {
	const [visibleAlert, setVisibleAlert] = useState(false);
	const [typeAlert, setTypeAlert] = useState('');
	const [messageAlert, setMessageAlert] = useState('');
	const [loading, setLoading] = useState(false);
	const [listData, setListData] = useState([]);
	const calendarService = new BatchService();
	const [form] = Form.useForm();
	const { RangePicker } = DatePicker;
	const { Option } = Select;
	const { Text } = Typography;
	const successAlertType = 'success';
	const errorAlertType = 'error';

	const handleSaveBatch = async (values) => {
		setLoading(true);
		let response;
		response = await calendarService.create(values);
		if (response.status === 200) {
			alert(response.data.message, successAlertType);
			handleCloseBatch();
			setLoading(false);
		} else {
			setMessageAlert(response.data.message);
			setTypeAlert(errorAlertType);
			//setVisibleAlert(true);
			setLoading(false);
		}
	};

	const handleCloseBatch = () => {
		setListData([]);
		onClose();
	};

	const handleCloseAlert = () => {
		setVisibleAlert(false);
	};

	const handleRemoveRangePicker = (value, index) => {
		console.log('remove:', value);
		console.log('index:', index);
	};

	const handleAddRangePicker = () => {
		setLoading(true);
		let rangePickersTemp = listData;
		rangePickersTemp.push(
			<>
				<RangePicker
					style={{ marginRight: '15px' }}
					key={listData.length + 1}
				/>
				<Button
					size='small'
					shape='circle'
					icon={<MinusOutlined />}
					type='primary'
					danger
					onClick={(value) => handleRemoveRangePicker(value)}
				/>
			</>
		);
		setLoading(false);
		console.log('rangePickersTemp:', rangePickersTemp);
		setListData(rangePickersTemp);
	};

	const renderItem = (item) => {
		console.log('item:', item);
		return <List.Item>{item}</List.Item>;
	};

	useEffect(() => {
		console.log('listData.length:', listData.length);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listData]);

	return (
		<div className='Batch'>
			<Drawer
				title={'Create a new batch'}
				width={520}
				onClose={handleCloseBatch}
				visible={visible}
				bodyStyle={{ paddingBottom: 80 }}
			>
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
					title='Batch details'
					primaryButton='Save batch'
					onCancel={handleCloseBatch}
					onSubmit={handleSaveBatch}
					form={form}
				>
					<Form.Item
						className='rangePicker_1'
						name='rangePicker_1'
						label='Select range'
						style={{ marginBottom: '50px' }}
						rules={[{ required: true }]}
					>
						<RangePicker
							style={{ marginRight: '15px' }}
							key={'rangePicker_1'}
						/>
					</Form.Item>
					<Form.Item
						className='rangePicker_2'
						name='rangePicker_2'
						label='Select range'
						style={{ marginBottom: '50px' }}
					>
						<RangePicker
							style={{ marginRight: '15px' }}
							key={'rangePicker_2'}
						/>
					</Form.Item>
					<Form.Item
						className='rangePicker_3'
						name='rangePicker_3'
						label='Select range'
						style={{ marginBottom: '50px' }}
					>
						<RangePicker
							style={{ marginRight: '15px' }}
							key={'rangePicker_3'}
						/>
					</Form.Item>
					<Form.Item
						className='rangePicker_4'
						name='rangePicker_4'
						label='Select range'
						style={{ marginBottom: '50px' }}
					>
						<RangePicker
							style={{ marginRight: '15px' }}
							key={'rangePicker_4'}
						/>
					</Form.Item>
					<Form.Item
						className='rangePicker_5'
						name='rangePicker_5c'
						label='Select range'
						style={{ marginBottom: '50px' }}
					>
						<RangePicker
							style={{ marginRight: '15px' }}
							key={'rangePicker_5'}
						/>
					</Form.Item>
					{loading && (
						<Spin style={{ display: 'flex', justifyContent: 'center' }} />
					)}
				</CommonForm>
			</Drawer>
		</div>
	);
};

Batch.propTypes = {
	visible: bool.isRequired,
	onClose: func.isRequired,
};

export default Batch;
