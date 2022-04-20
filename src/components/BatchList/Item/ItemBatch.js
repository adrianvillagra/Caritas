import React from 'react';
import { Avatar, Divider, Popconfirm, List } from 'antd';
import moment from 'moment';

const avatarUrl =
	'https://image.shutterstock.com/image-photo/group-stacked-files-top-view-260nw-696789433.jpg';

const ItemBatch = ({ batch }) => {
	const urlHref = `/batch/${batch.id}`;
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
			key={batch.id}
			actions={[
				[
					<a href={urlHref}>Edit</a>,
					<Divider type='vertical' style={{ margin: '0 10px' }} />,
					<Popconfirm
						title='Sure to delete?'
						onConfirm={() => handleDeleteBatch(batch.id)}
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
						Batch {batch.id}
					</a>
				}
				description={`${moment(batch.period_start).format('L')} - 
                ${moment(batch.period_end).format('L')}`}
			/>
		</List.Item>
	);
};

export default ItemBatch;
