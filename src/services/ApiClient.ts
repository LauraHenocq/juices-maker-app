import Axios from 'axios';

class ApiClient {
    axios: any;
    constructor(config: { baseUrl: any; timeout: any; }) {
        this.axios = Axios.create({
            baseURL: config.baseUrl,
            headers: { 'Content-Type': 'Application/json'},
            timeout: config.timeout || 20000
        });
    }

    async sendRequest(request: any) {
        let responseToReturn = { data: [], status: 500 };
        try {
            responseToReturn = await this.axios.request(request);
        } catch (error) {
            throw error;
        }
        return responseToReturn;
    }

    async post(url: string, params: any) {
        let responseToReturn = { data: {}, status: 500 };
        try {
            responseToReturn = await this.axios.post(url, params);
        } catch (error) {
            throw error;
        }
        return responseToReturn;
    }
}

export default ApiClient; 