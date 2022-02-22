import './CustomBreadcrum.less';

import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

const CustomBreadcrum = ({ routes }) => {
	const itemRender = (route, params, routes, paths) => {
		const last = routes.indexOf(route) === routes.length - 1;
		return last ? (
			<span>{route.breadcrumbName}</span>
		) : (
			<Link to={paths.join('/')}>{route.breadcrumbName}</Link>
		);
	};

	return (
		<Breadcrumb className='breadcrum' itemRender={itemRender} routes={routes} />
	);
};

export default CustomBreadcrum;
