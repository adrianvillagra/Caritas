import './ConfirmModal.less';
import { Button, Typography } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

const ConfirmModal = (props) => {
	const {
		title,
		visible,
		handleOk,
		handleCancel,
		okTitle,
		cancelTitle,
		description,
		okType,
		showCancelButton,
		afterClose,
		sideSeparation,
	} = props;
	const { Title } = Typography;

	return (
		<Modal
			className='ConfirmModal'
			title={title}
			onCancel={handleCancel}
			width='395px'
			afterClose={afterClose}
			visible={visible}
			footer={[
				showCancelButton ? (
					<Button key='back' type='link' onClick={handleCancel}>
						{cancelTitle}
					</Button>
				) : null,
				<Button key='submit' type={okType} onClick={handleOk}>
					{okTitle}
				</Button>,
			]}
		>
			<div
				className='body'
				style={{ paddingLeft: sideSeparation, paddingRight: sideSeparation }}
			>
				<Title level={5} style={{ fontWeight: 'normal' }}>
					{description}
				</Title>
			</div>
		</Modal>
	);
};

ConfirmModal.defaultProps = {
	title: '',
	visible: false,
	okTitle: 'Ok',
	cancelTitle: 'Cancel',
	description: 'Are you sure?',
	okType: 'danger',
	showCancelButton: true,
	sideSeparation: '60px',
};

export default ConfirmModal;
