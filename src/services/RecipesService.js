import axios from 'axios';
import Configuration from './ServiceConfig';

class RecipesService {
	constructor(setError) {
		this.config = new Configuration();
		this.path = `${this.config.baseurl}/${'recipes/'}`;
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
				return this.parseDataDetailsTable(response, id);
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
		const body = { name: item.recipe_name };
		return axios
			.post(this.path, body)
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

	async parseDataDetailsTable(response, id) {
		let responseTemporary = {};
		let tableData = [];
		if (response.data[0].productName) {
			tableData = response.data.map((object, index) => {
				return {
					key: index,
					product_name: object.productName,
					product_id: object.productId,
					mesuare: object.mesuare,
					quantity: object.quantity,
				};
			});
		}

		responseTemporary = {
			recipe: { id, name: response.data[0].recipeName },
			tableData,
		};

		return responseTemporary;
	}

	handleResponseError(response) {
		return response;
	}

	handleError(error) {
		return error;
	}
}

export default RecipesService;
