import React from 'react';
import { Avatar, Divider, Popconfirm, List } from 'antd';
import moment from 'moment';

const avatarUrl =
	'https://image.shutterstock.com/image-vector/vector-shop-market-store-front-260nw-1009297618.jpg';

const ItemCommerce = ({ commerce }) => {
	const urlHref = `/commerce/${commerce.id}`;
	const handleDeleteBatch = async (batchId) => {
		try {
		} catch (err) {
			// setError(err.toString());
		} finally {
			console.log('ERROR:');
		}
	};

	return (
		<List.Item
			key={commerce.id}
			actions={[
				[
					<a href={urlHref}>Edit</a>,
					<Divider type='vertical' style={{ margin: '0 10px' }} />,
					<Popconfirm
						title='Sure to delete?'
						onConfirm={() => handleDeleteBatch(commerce.id)}
					>
						<a>Delete</a>
					</Popconfirm>,
				],
			]}
		>
			<List.Item.Meta
				avatar={<Avatar src={avatarUrl} />}
				title={
					<a style={{ fontSize: '1.1em' }} href={urlHref}>
						{commerce.name}
					</a>
				}
				description={`CUIT: ${commerce.cuit}`}
			/>
		</List.Item>
	);
};

export default ItemCommerce;
