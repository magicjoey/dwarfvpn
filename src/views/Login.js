/**
 *
 * Author: MagicJoey@MetaStudio
 * Description: 登陆页面
 * Created: 2017-06-27 23:43,Login.js V1.0
 *
 */
import React, {Component, PropTypes} from 'react';
import{
    View,
    ScrollView,
    Text,
    BackAndroid,
    TouchableOpacity,
    Image,
    StyleSheet,
    InteractionManager,
    TextInput,
    Platform,
    ToastAndroid,
} from 'react-native';

import {NavigationPage, ListRow, Button, Toast, Input, Label} from 'teaset';
import Register from "./Register";
import {NativeModules} from 'react-native';
var EncryptionModule = NativeModules.EncryptionModule;

var username = '';
var password = '';

export default class Login extends NavigationPage {

    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: '登陆',
        showBackButton: true,
    };

    constructor(props) {
        super(props);
        this.doLoginAction = this.doLoginAction.bind(this);
        this.toRegisterAction = this.toRegisterAction.bind(this);
    }

    //用户登录/注册
    doLoginAction() {
        const {navigator, dispatch} = this.props;
        //用户登录
        if (username === '') {
            Toast.message('用户名不能为空...');
            return;
        }
        if (password === '') {
            Toast.message('密码不能为空...')
            return;
        }
        EncryptionModule.MD5ByCallBack(password, (msg) => {
            dispatch(performLoginAction(username, msg));
        }, (error) => {
            Toast.message('系统异常...');
        });
    }

    toRegisterAction() {
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: Register,
                name: 'Register'
            });
        });
    }

    renderPage() {
        return (
            <ScrollView style={{flex: 1}}>
                <View style={{height: 20}}/>
                <ListRow title='用户名' detail={<Input style={{width: 200}} size='md' value="请输入用户名"
                                                    onChangeText={text => this.setState({valueMD: text})}/>}/>
                <ListRow title='密码' detail={<Input style={{width: 200}} size='md' value="请输入密码"
                                                   onChangeText={text => this.setState({valueMD: text})}/>}/>
                <View style={{height: 20}}/>
                /** 点击登陆操作  */
                <Button title='登陆' type='primary' onPress={() => {
                    this.doLoginAction()
                }} disabled={false}/>
                <View style={{height: 5}}/>
                /** 点击跳转注册页面 */
                <Button title='注册' type='secondary' onPress={() => {
                    this.toRegisterAction()
                }} disabled={false}/>
            </ScrollView>
        );
    }

}