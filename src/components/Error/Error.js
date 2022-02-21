import { Button, Result } from 'antd';

import React from 'react';
import { withRouter } from 'react-router';

const Error = ({ history }) => {
	const back = () => {
		history.push('/');
	};

	return (
		<Result
			status='404'
			title='404'
			subTitle='Sorry, the page you visited does not exist.'
			extra={
				<Button onClick={() => back()} type='primary'>
					Back
				</Button>
			}
		/>
	);
};
export default withRouter(Error);
