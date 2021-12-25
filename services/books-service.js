import authHeader from '../helpers/auth-header';
import utils from './utils'
import { GET_BOOKS_API_URL } from "@env"

// Get all Books list
function getBooksList() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    const url = `${GET_BOOKS_API_URL}`;
    return fetch(url, requestOptions)
        .then(utils.handleResponse);
}
export default getBooksList;