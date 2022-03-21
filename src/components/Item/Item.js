import React from 'react';
import { Avatar, Divider, Popconfirm, List } from 'antd';
const avatarUrl =
	'https://static.toiimg.com/thumb/60276119.cms?width=573&height=382';

const Item = ({ recipe }) => {
	const urlHref = `/recipe/${recipe.id}`;

	const handleDeleteRecipe = async (recipeId) => {
		try {
		} catch (err) {
			// setError(err.toString());
		} finally {
			console.log('ERROR:');
		}
	};

	return (
		<List.Item
			key={recipe.id}
			actions={[
				[
					<a href={urlHref}>Edit</a>,
					<Divider type='vertical' style={{ margin: '0 10px' }} />,
					<Popconfirm
						title='Sure to delete?'
						onConfirm={() => handleDeleteRecipe(recipe.id)}
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
						{recipe.name}
					</a>
				}
			/>
		</List.Item>
	);
};

export default Item;
