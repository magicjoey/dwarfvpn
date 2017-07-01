/**
 *
 * Author: MagicJoey@MetaStudio
 * Description: http://MetaStudio.com.cn
 * Created: 2017-06-28 00:04,Register.js V1.0
 *
 */

import React, {Component, PropTypes} from 'react';
import {View, ScrollView, InteractionManager, Text} from 'react-native';
import {NavigationPage, ListRow,Toast, Button, Input, Label} from 'teaset';
import Login from "./Login";

export default class Register extends NavigationPage {

    static defaultProps = {
        ...NavigationPage.defaultProps,
        title: '注册',
        showBackButton: true,
    };

    constructor(props) {
        super(props);
        Object.assign(this.state, {
            "username": "请输入用户名",
            "password": "请输入密码",
        });
        this.toLoginAction = this.toLoginAction.bind(this);
        this.doRegisterAction = this.doRegisterAction.bind(this);
    }


    //用户登录/注册
    toLoginAction() {
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: Login,
                name: 'Login'
            });
        });
    }

    doRegisterAction() {
        const {navigator, dispatch} = this.props;
        //用户登录
        if (this.state.username === '') {
            Toast.message('用户名不能为空...');
            return;
        }
        if (this.state.password === '') {
            Toast.message('密码不能为空...')
            return;
        }

        dispatch(performRegisterAction(this.state.username, this.state.password));
    }

    renderPage() {
        return (
            <ScrollView style={{flex: 1}}>
                <View style={{height: 20}}/>
                <ListRow title='用户名' detail={<Input style={{width: 200}} size='md' value={this.state.username}
                                                    onChangeText={text => this.setState({username: text})}/>}/>
                <ListRow title='密码' detail={<Input style={{width: 200}} size='md' value={this.state.password}
                                                   onChangeText={text => this.setState({password: text})}/>}/>
                <View style={{height: 20}}/>
                <Button title='注册' type='primary' onPress={() => {
                    this.doRegisterAction()
                }} disabled={false}/>
                <View style={{height: 5}}/>
                <Button title='登陆' type='secondary' onPress={() => {
                    this.toLoginAction()
                }} disabled={false}/>

            </ScrollView>
        );
    }

}