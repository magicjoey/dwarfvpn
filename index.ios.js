/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Root from './src/Root';
import {TeaNavigator} from 'teaset';
import TeasetExampleHome from './src/views/Home'

export default class MetaDemo extends Component{
    render(){
        return <TeaNavigator rootView={<TeasetExampleHome />} />;
    }
}

AppRegistry.registerComponent('DwarfVpn', () => MetaDemo);

// AppRegistry.registerComponent('DwarfVpn', () => Root);
