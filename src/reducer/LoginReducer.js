/**
 *
 * Author: MagicJoey@MetaStudio
 * Description: http://MetaStudio.com.cn
 * Created: 2017-06-28 07:12,LoginReducer.js V1.0
 *
 */
'use strict'

import * as types from '../action/ActionType';

const initialState = {
    HomeList: [],
    UGOList:[],
    isLoading: true,
    isRefreshing: false,
    userName: '',
    password: ''
};

let loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.FETCH_HOME_LIST, types.FETCH_SEAUGO_LIST:
            return Object.assign({}, state, {
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading
            })

        case types.RECEIVE_HOME_LIST:


            return Object.assign({}, state, {
                HomeList: action.homeList,
                isRefreshing: false,
                isLoading: false,
            })
        case types.RECEIVE_SEAUGO_LIST:


            return Object.assign({}, state, {
                UGOList: action.uGoList,
                isRefreshing: false,
                isLoading: false,
            })

        default:
            return state;
    }
}

export default loginReducer;
