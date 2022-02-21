import Header from '../components/Header/Header';
import { Layout } from 'antd';
import NavBar from '../components/NavBar/NavBar';
import React from 'react';

const { Content, Footer } = Layout;

const MainLayout = ({ children }) => {
	return (
		<Layout>
			<Header />
			<Layout>
				<NavBar />
				<Content
					className='site-layout'
					style={{ padding: '0 50px', marginTop: 70 }}
				>
					<div
						className='site-layout-background'
						style={{ padding: 24, minHeight: 380 }}
					>
						{children}
					</div>
					<Footer style={{ textAlign: 'center' }}>AV Furniture ©2021</Footer>
				</Content>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
