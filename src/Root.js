/**
 *
 * Author: MagicJoey@MetaStudio
 * Description: http://MetaStudio.com.cn
 * Created: 2017-06-25 20:54,App.js V1.0
 *
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/Store';

import App from './containers/App';

export default class Root extends Component{
    render(){
        return (
            <Provider store= {store} >
                <App />
            </Provider>
        )
    }
}