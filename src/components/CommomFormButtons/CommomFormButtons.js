import './CommomFormButtons.less';

import { Button, Col, Row } from 'antd';

import React from 'react';

const CommonFormButtons = ({
	primaryButton,
	secondaryButton,
	onSecondaryAction,
	thirdButton,
	disabled,
}) => {
	return (
		<Row justify='center'>
			<Col>
				<Button
					className='cancel-button'
					type='link'
					onClick={onSecondaryAction}
					style={{ fontSize: '16px' }}
					disabled={disabled || false}
				>
					{secondaryButton}
				</Button>
			</Col>
			<Col>
				<Button
					className='secondButton'
					type='primary'
					htmlType='submit'
					disabled={disabled}
				>
					{primaryButton}
				</Button>
			</Col>
			{thirdButton.active ? (
				<Col>
					<Button
						type='primary'
						ghost
						style={{
							paddingLeft: '22px',
							paddingRight: '22px',
							marginLeft: '16px',
						}}
						onClick={thirdButton.action}
					>
						{thirdButton.content}
					</Button>
				</Col>
			) : null}
		</Row>
	);
};

export default CommonFormButtons;
