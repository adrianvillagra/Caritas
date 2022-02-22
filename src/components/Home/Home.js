import './Home.css';

import { Carousel, Col, Row } from 'antd';

import React from 'react';

const Home = () => {
	const carouselData = [
		{
			path: 'https://firebasestorage.googleapis.com/v0/b/fir-ecommerceproject.appspot.com/o/images%2Fhome%2Fcarousel%2Fcarousel_1.png?alt=media&token=651df6e4-5bdd-4f25-83bb-330afd893133',
		},
		{
			path: 'https://firebasestorage.googleapis.com/v0/b/fir-ecommerceproject.appspot.com/o/images%2Fhome%2Fcarousel%2Fcarousel_2.png?alt=media&token=d030b7a6-c30a-4658-983c-7955417c117a',
		},
		{
			path: 'https://firebasestorage.googleapis.com/v0/b/fir-ecommerceproject.appspot.com/o/images%2Fhome%2Fcarousel%2Fcarousel_3.png?alt=media&token=42181230-cd7f-4edc-9e6f-9e4eed43de2f',
		},
	];

	return (
		<div>
			{/* <Carousel autoplay>
				{carouselData.map((item, index) => {
					return (
						<div className='container' key={index}>
							<img
								alt='img'
								style={{
									width: '100%',
								}}
								src={item.path}
							/>
						</div>
					);
				})}
			</Carousel> */}
			<Row gutter={[24, 24]} style={{ marginTop: '50px' }}>
				<Col span={18} push={6}>
					<div className='row' key={1}>
						<img
							alt='img'
							style={{
								width: '100%',
							}}
							src={
								'https://firebasestorage.googleapis.com/v0/b/fir-ecommerceproject.appspot.com/o/images%2Fhome%2Fcontent%2Fcontent_1.png?alt=media&token=3d07325f-d774-4246-afae-6bc492f2190d'
							}
						/>
					</div>
				</Col>
				<Col span={6} pull={18}>
					<h3
						style={{
							fontSize: '30px',
							paddingTop: '30px',
							textAlign: 'left',
							color: '#848484',
							fontWeight: '300',
						}}
					>
						Design and manufacture following each process with an emphasis on
						details and finishes
					</h3>
				</Col>
			</Row>
			<Row gutter={[24, 24]} style={{ marginTop: '20px' }}>
				<Col span={6} push={18}>
					<h3
						style={{
							fontSize: '30px',
							paddingTop: '30px',
							textAlign: 'right',
							color: '#848484',
							fontWeight: '300',
						}}
					>
						Furniture and Lighting united in a perfect balance between tradition
						and modernity
					</h3>
				</Col>
				<Col span={18} pull={6}>
					<div className='row' key={1}>
						<img
							alt='img'
							className='img'
							style={{
								width: '100%',
							}}
							src={
								'https://firebasestorage.googleapis.com/v0/b/fir-ecommerceproject.appspot.com/o/images%2Fhome%2Fcontent%2Fcontent_2.png?alt=media&token=9204ea78-8177-4c62-9324-6b9d088229d7'
							}
						/>
					</div>
				</Col>
			</Row>
			<Row gutter={[24, 24]} style={{ marginTop: '20px' }}>
				<Col span={18} push={6}>
					<div className='row' key={1}>
						<img
							alt='img'
							style={{
								width: '100%',
							}}
							src={
								'https://firebasestorage.googleapis.com/v0/b/fir-ecommerceproject.appspot.com/o/images%2Fhome%2Fcontent%2Fcontent_3.png?alt=media&token=d28d21e1-ce68-4786-8cf4-e9efe5570d36'
							}
						/>
					</div>
				</Col>
				<Col span={6} pull={18}>
					<h3
						style={{
							fontSize: '30px',
							paddingTop: '30px',
							textAlign: 'left',
							color: '#848484',
							fontWeight: '300',
						}}
					>
						Modern settings with unique designs blend with modern Italian
						collections and concepts
					</h3>
				</Col>
			</Row>
		</div>
	);
};

export default Home;
