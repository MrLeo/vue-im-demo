/**
 * @Date: 2016/10/23  0023  13:02
 * @Author: lxbin
 *
 * Created with JetBrains WebStorm.
 */

//Fetch API : https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function Fetch(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .catch((err) => ({err}));
}