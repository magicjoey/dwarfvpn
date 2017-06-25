/**
 *
 * Author: MagicJoey@MetaStudio
 * Description: http://MetaStudio.com.cn
 * Created: 2017-06-25 21:07,Store.js V1.0
 *
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducer/RootReducer';

const middlewares = [thunk];
const createLogger = require('redux-logger');

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger.createLogger();
    middlewares.push(logger);
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

let store = createStoreWithMiddleware(RootReducer);
export default store;