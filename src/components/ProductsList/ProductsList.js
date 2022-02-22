import { Col, Input, List, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import CustomBreadcrum from '../Breadcrum/CustomBreadcrum';
import Product from '../Product/Product';
import { SearchOutlined } from '@ant-design/icons';
import ProductsService from '';

const ProductList = (categoryId) => {
	const [productsList, setProductList] = useState([]);
	const [productsListFiltered, setProductListFiltered] = useState([]);
	const [loading, setLoading] = useState(false);
	const productsService = new ProductsService(setError);
	const routes = [{ path: '../', breadcrumbName: 'Home' }];

	const getProductList = async () => {
		setLoading(true);
		analystsService
			.getAll()
			.then((result) => {
				if (typeof result != 'undefined') {
					setAnalysts(result);
					setFilteredAnalysts(result);
				}
			})
			.catch((err) => {
				setError(err.toString());
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const filterByName = (event) => {
		if (event.keyCode === 13) {
			const valueToSearch = event.target.value;
			setProductListFiltered({
				...productsListFiltered,
				name: event.target.value,
			});
			if (event.target.value) {
				const results = [];
				const elements = productsList.filter((item) => {
					return item.title
						.toLowerCase()
						.startsWith(valueToSearch.toLowerCase());
				});
				if (elements.length !== 0) {
					results.push(...elements);
				}
				setProductListFiltered(results);
			} else {
				setProductListFiltered(productsList);
			}
		}
	};

	useEffect(() => {
		getProductList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Col>
				<Row>
					<CustomBreadcrum routes={routes} />
				</Row>
				<Row gutter={22} style={{ marginTop: '20px', marginBlockEnd: '20px' }}>
					<Col style={{ width: '600px' }}>
						<Input
							width='600'
							placeholder='filter by name'
							onKeyDown={filterByName}
							suffix={<SearchOutlined />}
						/>
					</Col>
				</Row>
			</Col>
			<List
				itemLayout='vertical'
				size='large'
				pagination={{
					total: productsList.length,
					showQuickJumper: true,
					showSizeChanger: true,
				}}
				onChange={(pagination) =>
					getProductList(pagination.pageSize, pagination.current)
				}
				dataSource={productsListFiltered}
				footer={
					<div>
						<b>AV - Furniture</b> New Collection
					</div>
				}
				renderItem={(item) => <Product product={item} />}
			/>
			{loading && (
				<Spin style={{ display: 'flex', justifyContent: 'center' }} />
			)}
		</div>
	);
};

export default ProductList;
