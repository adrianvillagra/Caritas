import './CommomForm.less';

import CommonFormButtons from '../CommomFormButtons/CommomFormButtons';
import { Form } from 'antd';
import FormsTitle from '../FormsTitle/FormsTitle';
import React from 'react';

const CommonForm = ({
	title,
	onSubmit,
	children,
	onCancel,
	primaryButton,
	form,
	secondClass = '',
	titleClass,
	thirdButton = '',
	disabled,
}) => {
	return (
		<Form
			initialValues={{ remember: false }}
			layout='vertical'
			requiredMark='optional'
			onFinish={onSubmit}
			form={form}
		>
			<div className={`form-main-container ${titleClass}`}>
				<FormsTitle title={title} titleClass={titleClass} />
				<div className={`form-white-container ${secondClass}`}>{children}</div>
			</div>
			<Form.Item>
				<CommonFormButtons
					primaryButton={primaryButton}
					secondaryButton='Cancel'
					onSecondaryAction={onCancel}
					thirdButton={thirdButton}
					disabled={disabled}
				/>
			</Form.Item>
		</Form>
	);
};

export default CommonForm;
