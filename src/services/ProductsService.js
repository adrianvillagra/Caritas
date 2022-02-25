import axios from 'axios';
import Configuration from './ServiceConfig';

class ProductsService {
	constructor(setError) {
		this.config = new Configuration();
		this.path = `${this.config.baseurl}/${'products/'}`;
		// this.setError = setError;
	}

	async getAll() {
		return axios
			.get(this.path)
			.then((response) => {
				return this.parseDataTable(response);
			})
			.catch((err) => {
				if (err.response) {
					this.handleResponseError(err.response);
				} else {
					this.handleError(err);
				}
			});
	}

	async get(id) {
		return axios
			.get(`${this.path}/${id}`)
			.then((response) => {
				return response.data;
			})
			.catch((err) => {
				if (err.response) {
					this.handleResponseError(err.response);
				} else {
					this.handleError(err);
				}
			});
	}

	async create(item) {
		return axios
			.post(this.path, item, {
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
			})
			.then((response) => {
				return response.data;
			})
			.catch((err) => {
				if (err.response) {
					this.handleResponseError(err.response);
				} else {
					this.handleError(err);
				}
			});
	}

	async delete(id) {
		return axios
			.delete(`${this.path}${id}`)
			.then((response) => {
				return response;
			})
			.catch((err) => {
				if (err.response) {
					this.handleResponseError(err.response);
				} else {
					this.handleError(err);
				}
			});
	}

	async update(id, item) {
		return axios
			.put(`${this.path}${id}`, item)
			.then((response) => {
				if (response.status === 200) {
					return response.data;
				}
			})
			.catch((err) => {
				if (err.response) {
					this.handleResponseError(err.response);
				} else {
					this.handleError(err);
				}
			});
	}

	async parseDataTable(response) {
		// const tableData = response.data.results.map((object) => {
		// 	return {
		// 		key: object.id,
		// 		client: object.name,
		// 		partner: object.global_partner,
		// 		activeProjects: object.active_projects,
		// 	};
		// });

		// response.data.tableData = tableData;

		return response.data;
	}

	handleResponseError(response) {
		this.setError(response.status);
	}

	handleError(error) {
		this.setError(error.message);
	}
}

export default ProductsService;
