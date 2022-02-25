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
		console.log('item:', item);
		return axios
			.post(this.path, item)
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
		console.log('entro al delete, id:', id);
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
				return response;
			})
			.catch((err) => {
				if (err.response) {
					return err.response;
				} else {
					return err;
				}
			});
	}

	handleResponseError(response) {
		return response;
	}

	handleError(error) {
		return error;
	}
}

export default ProductsService;
