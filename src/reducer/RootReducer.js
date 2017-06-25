/**
 *
 * Author: MagicJoey@MetaStudio
 * Description: http://MetaStudio.com.cn
 * Created: 2017-06-25 21:21,RootReducer.js V1.0
 *
 */
import { combineReducers } from 'redux';
//添加个页面的reducer并进行合并
import HomeReducer from './HomeReducer';
import BrandReducer from './BrandReducer';
import ShopCarReducer from './ShopCarReducer';


export default rootReducer = combineReducers({
    HomeReducer,
    BrandReducer,
    ShopCarReducer,
})
