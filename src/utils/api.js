import axios from 'axios'
import Cookies from 'js-cookie'
import { authApi } from '../api/auth/authApi'

const defaultHeaders = {
    get: {},
    post: {},
    put: {},
    delete: {}
}

const refreshToken = async () => {
    let expresIn = localStorage.getItem('expresIn');
    let now = new Date();
    if (expresIn && parseInt(expresIn) < now.getTime()) {
        let res = await authApi.refreshToken();
        if (res.data.statusCode !== 400) {
            Cookies.set('access-token', res.data.access_token, { secure: false, path: '/' });
        }
    }
}

async function prepare(config, method) {
    await refreshToken()
    return {
        ...config,
        headers: {
            ...config.headers,
            ...defaultHeaders[method],
        },
        withCredentials: true
    }
}

export default {
    async get(url, config = {}) {
        return axios.get(url, await prepare(config, 'get'))
    },

    async post(url, data, config = {}) {
        return axios.post(url, data, await prepare(config, 'post'))
    },

    async put(url, data, config = {}) {
        return axios.put(url, data, await prepare(config, 'put'))
    },

    async delete(url, config = {}) {
        return axios.delete(url, await prepare(config, 'delete'))
    }
}
