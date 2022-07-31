import axios from 'axios'
import { apihost } from '../config/index'

let _traceId = 10001

const setDefaultHeaders = (fetch) => {
    try {
        const headers = {
            'equipment': 'dobby',
            'x-platform': 'rewriteh5',
            'x-traceid': `${Date.now()}_${++_traceId}`,
            'version': '1.0.0'
        }
        Object.assign(fetch.defaults.headers, headers)
        console.log(`[j] api http headers:`, headers)
        return headers
    } catch (err) {
        return {}
    }
}

const apiHttp = axios.create({
    baseURL: apihost,
    withCredentials: true,
    timeout: 10000,
    headers: {
        'equipment': 'dobby',
        'x-platform': 'rewriteh5',
        'x-traceid': `${Date.now()}_${++_traceId}`,
        'version': '1.0.0'
    }
})

apiHttp.interceptors.request.use(
    (req) => {
        // setDefaultHeaders(apiHttp)
        return req
    },
    error => {
        return Promise.reject(error)
    },
)

apiHttp.interceptors.response.use(
    (response) => {
        try {
        } catch (e) { }
        if (response.status === 200) {
            return response.data
        } else {
            Promise.reject(response)
        }
    },
    error => {
        return Promise.reject(error)
    },
)

export default apiHttp