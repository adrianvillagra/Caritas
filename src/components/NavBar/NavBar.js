import {
	AppstoreOutlined,
	HomeOutlined,
	NotificationOutlined,
	WhatsAppOutlined,
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
				<Menu.Item key='new-sale' icon={<NotificationOutlined />}>
					<NavLink to='/products'>Products</NavLink>
				</Menu.Item>
				<Menu.Item key='new-sale' icon={<NotificationOutlined />}>
					<NavLink to='/products'>Recipes</NavLink>
				</Menu.Item>
				<Menu.Item key='new-sale' icon={<NotificationOutlined />}>
					<NavLink to='/products'>Stock</NavLink>
				</Menu.Item>
				<Menu.Item key='new-sale' icon={<NotificationOutlined />}>
					<NavLink to='/products'>Order</NavLink>
				</Menu.Item>
				<SubMenu key='subOrder' icon={<AppstoreOutlined />} title='Furniture'>
					<Menu.Item key='sofa-couches'>
						<NavLink to='/order/order_list'>Lists</NavLink>
					</Menu.Item>
				</SubMenu>
				<Menu.Item key='contact' icon={<WhatsAppOutlined />}>
					<NavLink to='/contact'>Contact</NavLink>
				</Menu.Item>
			</Menu>
		</Sider>
	);
};

export default NavBar;
