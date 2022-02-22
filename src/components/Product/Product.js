import { Avatar, Button, List, Space } from 'antd';
import {
	DollarCircleOutlined,
	LikeOutlined,
	MessageOutlined,
	ShopOutlined,
	StarOutlined,
} from '@ant-design/icons';

import React from 'react';
import { useHistory } from 'react-router-dom';

const Product = ({ product }) => {
	const history = useHistory();
	const IconText = ({ icon, text }) => (
		<Space>
			{React.createElement(icon)}
			{text}
		</Space>
	);
	const urlHref = `/furniture/uid=${product.id}`;

	const onGoItemDetail = (needFurnitureInPath) => {
		history.push(
			needFurnitureInPath
				? `../../furniture/uid=${product.id}`
				: `../uid=${product.id})`
		);
	};

	return (
		<List.Item
			key={product.id}
			actions={[
				<IconText icon={StarOutlined} text='156' key='list-vertical-star-o' />,
				<IconText icon={LikeOutlined} text='156' key='list-vertical-like-o' />,
				<IconText
					icon={MessageOutlined}
					text='2'
					key='list-vertical-message'
				/>,
				<IconText
					icon={DollarCircleOutlined}
					text={product.price.toLocaleString('en-US', {
						minimumFractionDigits: 2,
					})}
					key='list-vertical-message'
				/>,
				<Button
					type='primary'
					shape='circle'
					icon={<ShopOutlined />}
					size={'small'}
					onClick={(value) => onGoItemDetail(true)}
				/>,
			]}
			extra={<img width={272} alt='img' src={product.pictureUrl} />}
		>
			<List.Item.Meta
				avatar={<Avatar src={product.pictureUrl} />}
				title={<a href={urlHref}>{product.title}</a>}
				description={product.description}
			/>
			{product.content}
		</List.Item>
	);
};

export default Product;
