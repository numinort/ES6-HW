export class httpRequest {

    constructor(url) {
        this.url = url
    }

    xhrUser(url) {

        return new Promise(function (resolve, reject) {

            const xhr = new XMLHttpRequest();

            xhr.open('GET', url);

            xhr.onload = function () {
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    const error = new Error(this.statusText);
                    error.code = this.status;

                    reject(error);
                }
            };

            xhr.onerror = function () {
                reject(new Error('network error'))
            };

            xhr.send();
        });
    };
}
