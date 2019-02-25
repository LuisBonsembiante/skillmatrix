import axios from 'axios';
import {Service} from 'axios-middleware';

const service = new Service(axios);

service.register({

    onRequest(config) {

        if(sessionStorage.getItem('tokenJWT'))
            config.headers = {
                Authorization:'Bearer ' + sessionStorage.getItem('tokenJWT'),
                ...config.headers
            };
        return config;
    },
    onSync(promise) {
        console.log('onSync');
        return promise;
    },
    onResponse(response) {
        console.log('onResponse');
        return response;
    },
    onResponseError(error) {
        // handle the response error
    }
});

export default service;
