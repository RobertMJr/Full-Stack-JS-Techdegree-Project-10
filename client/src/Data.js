import config from './config';

export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            // Encode credentials
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            // Set the authorization header
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);
    }

    async getUser(emailAddress, password) {
        const response = await this.api('/users', 'GET', null, true, {emailAddress, password});
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    // Send a POST request to the API with the body containing the course object and the credentials to authenticate the user
    async createCourse(course, emailAddress, password) {
        const response = await this.api('/courses', 'POST', course, true, {emailAddress, password});
        if(response.status === 201 ) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    // Send a PUT request to the API with the body containing the course object, the credentials and the id of the course
    async updateCourse(course, emailAddress, password, id) {
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress, password});
        if(response.status === 204) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        }
        else {
            throw new Error();
        }
    }

    // Send a DELETE request to the API with the credentials and the id of the course
    async deleteCourse(emailAddress, password, id) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
        if(response.status === 204) {
            return [];
        }
        else {
            throw new Error();
        }
    }
}