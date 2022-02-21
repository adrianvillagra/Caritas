import { Layout, Menu } from 'antd';
import React from 'react';

const Header = () => {
	const { Header } = Layout;
	const { SubMenu } = Menu;
	const userName = 'Caritas';

	const logOut = () => {
		localStorage.clear();
	};

	return (
		<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
			<Menu
				theme='dark'
				mode='horizontal'
				defaultSelectedKeys={['2']}
				style={{ float: 'right' }}
			>
				<SubMenu title={userName} key={userName}>
					<Menu.Item onClick={logOut} key='logout'>
						Logout
					</Menu.Item>
				</SubMenu>
			</Menu>
		</Header>
	);
};

export default Header;
