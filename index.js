import React from 'react';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';

import axios from 'axios';
axios.defaults.baseURL = 
    'https://lambe-28c98-default-rtdb.firebaseio.com/';

import App from './src/App';
import {name as appName} from './app.json';
import storeConfig from './src/store/storeConfig';


const store = storeConfig();
const Redux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
