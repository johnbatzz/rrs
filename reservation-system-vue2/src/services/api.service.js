const BASE_URL = "http://localhost:3000";
import axios from "axios";
const GET_METHOD   = "get";
const POST_METHOD  = "post";


/**
 * Service to call HTTP request via Axios
 */
const ApiService = {
    /**
     * Initialize the API service
     */
    init() {
        // Set the base URL for all requests
        this.instance = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    },
    /**
     * Send the GET HTTP request
     * @param resource
     * @returns {*}
     */
    get(resource, params) {
        let instance = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return instance({
            method: GET_METHOD,
			url:  resource,
            params: params
        })

    },

    /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
   post(resource, data) {
    let instance = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    return instance({
        method: POST_METHOD,
        url:  resource,
        data: data
    })
  },
};

export default ApiService;