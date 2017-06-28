/**
 *
 * Author: MagicJoey@MetaStudio
 * Description: http://MetaStudio.com.cn
 * Created: 2017-06-28 07:39,ToLoginAction.js V1.0
 *
 */

'use strict';

import FetchHttpClient, { form,header } from 'fetch-http-client';
import {HOST,LOGIN_ACTION} from  '../common/Request';
import {NavigationPage, ListRow, Button, Toast, Input, Label} from 'teaset';
const client = new FetchHttpClient(HOST);

export function performLoginAction(username,password){
    return dispatch => {
        dispatch(performLogin());
        client.addMiddleware(form());
        client.addMiddleware(request => {
            request.options.headers['appkey'] = '8a9283a0567d5bea01567d5beaf90000';
        });
        client.post(LOGIN_ACTION, {
            form: {
                username: username,
                password: password,
            },
        }).then(response => {
            return response.json();
        }).then((result)=>{
            dispatch(receiveLoginResult(result));
            if(result.code === '0'){
                //登录成功..
                Toast.message('登录成功...');
            }else{
                Toast.message(result.msg);
            }
        }).catch((error) => {
            Toast.message('网络发生错误,请重试!')
        });
    }
}

function performLogin() {
    return {
        type: ActionTypes.PERFORM_LOGIN_ACTION,
    }
}

function receiveLoginResult(result){
    return {
        type: ActionTypes.RECEIVE_LOGIN_ACTION,
        data: result
    }

}