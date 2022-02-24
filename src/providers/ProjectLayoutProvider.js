import React, { createContext, useState } from 'react';

export const ProjectLayoutContext = createContext();

const ProjectLayoutProvider = (props) => {
	const [routes, setRoutes] = useState([]);
	const [active, setActive] = useState('');

	return (
		<ProjectLayoutContext.Provider
			value={{ routes, setRoutes, active, setActive }}
		>
			{props.children}
		</ProjectLayoutContext.Provider>
	);
};

export default ProjectLayoutProvider;
