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
 * Default Get Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function Fetch(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        //.then((data) => ({data}))
        .catch((err) => ({err}));
}

/**
 * Post request a url,returning a promise
 * @param url                       The URL we want to request
 * @param params                    The params we want to pass to "fetch"
 * @param params                    The options we want to pass to "fetch"
 * @returns {Promise.<TResult>}     An object containing either "data" or "err"
 * @constructor
 */
export function FetchPost(url, params = {}, option = {}) {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(params),
        option
    }).then(checkStatus)
        .then(parseJSON)
        //.then((data) => ({data}))
        .catch((err) => ({err}));
}