/**
 *
 * Author: MagicJoey@MetaStudio
 * Description: http://MetaStudio.com.cn
 * Created: 2017-06-28 07:39,ToLoginAction.js V1.0
 *
 */

'use strict';

import FetchHttpClient, { form,header } from 'fetch-http-client';
import {api_url} from  '../common/constants';
import {NavigationPage, ListRow, Button, Toast, Input, Label} from 'teaset';
import * as ActionType from "./ActionType";
const client = new FetchHttpClient(api_url + "login");

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
        type: ActionType.LOGIN_ACTION,
    }
}

function receiveLoginResult(result){
    return {
        type: ActionType.LOGIN_RESULT_ACTION,
        data: result
    }

}