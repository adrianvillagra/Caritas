import React from 'react';
import { Row, Col, Typography } from 'antd';
import './FormsTitle.less';

const FormsTitle = ({ title, titleClass }) => {
	const { Title } = Typography;
	return (
		<Row justify='center'>
			<Col>
				<Title className={`forms-title ${titleClass} `} level={1}>
					{title}
				</Title>
			</Col>
		</Row>
	);
};

export default FormsTitle;
