import {
	CalendarOutlined,
	CarryOutOutlined,
	HomeOutlined,
	ReadOutlined,
	WhatsAppOutlined,
	ReconciliationOutlined,
	ProfileOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

import { NavLink } from 'react-router-dom';
import React from 'react';

const { Sider } = Layout;
const { SubMenu } = Menu;

const NavBar = () => {
	return (
		<Sider width={200} className='site-layout' style={{ marginTop: 60 }}>
			<Menu
				mode='inline'
				defaultSelectedKeys={['home']}
				defaultOpenKeys={['sub1']}
				style={{ height: '100%', borderRight: 0 }}
			>
				<Menu.Item key='home' icon={<HomeOutlined />}>
					<NavLink to='/'>Home</NavLink>
				</Menu.Item>
				<Menu.Item key='products' icon={<ProfileOutlined />}>
					<NavLink to='/products'>Products</NavLink>
				</Menu.Item>
				<Menu.Item key='recipes' icon={<ReadOutlined />}>
					<NavLink to='/recipes'>Recipes</NavLink>
				</Menu.Item>
				<Menu.Item key='stock' icon={<ReconciliationOutlined />}>
					<NavLink to='/stock'>Stock</NavLink>
				</Menu.Item>
				<Menu.Item key='calendar' icon={<CalendarOutlined />}>
					<NavLink to='/calendar'>Calendar</NavLink>
				</Menu.Item>
				<Menu.Item key='batch' icon={<CarryOutOutlined />}>
					<NavLink to='/batch'>Batch</NavLink>
				</Menu.Item>
				<Menu.Item key='contact' icon={<WhatsAppOutlined />}>
					<NavLink to='/contact'>Contact</NavLink>
				</Menu.Item>
			</Menu>
		</Sider>
	);
};

export default NavBar;
