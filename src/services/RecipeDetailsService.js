import axios from 'axios';
import Configuration from './ServiceConfig';

class RecipeDetailsService {
	constructor(setError) {
		this.config = new Configuration();
		this.path = `${this.config.baseurl}/${'recipe_details/'}`;
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

	async create(recipeId, itemList) {
		let body = [];

		for (let item of itemList) {
			body.push({
				recipe_id: recipeId,
				product_id: item.product_id,
				quantity: item.quantity,
			});
		}

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
			.delete(`${this.path}/${id}`)
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

	async update(recipeId, itemList) {
		let body = [];

		for (let item of itemList) {
			body.push({
				recipe_id: recipeId,
				product_id: item.product_id,
				quantity: item.quantity,
			});
		}
		return axios
			.put(`${this.path}${recipeId}`, body)
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

	handleResponseError(response) {
		return response;
	}

	handleError(error) {
		return error;
	}
}

export default RecipeDetailsService;
