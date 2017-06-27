/**
 *
 * Author: MagicJoey@MetaStudio
 * Description: http://MetaStudio.com.cn
 * Created: 2017-06-25 21:07,App.js V1.0
 *
 */
import React from 'react';
import {
    Navigator,
    View,
    NavigatorIOS,
    StyleSheet,
    Text,
} from 'react-native';

import Splash from '../components/Splash';
import StatusBarIOS from '../components/StatusBarIOS';


export default class App extends React.Component {
    render() {

        return (
            <View style={{flex: 1}}>
                <StatusBarIOS barStyle="default"/>

                <NavigatorIOS
                    initialRoute={{title: Splash, name: 'Splash', component: Splash}}

                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component navigator={navigator} route={route} {...route.passProps} />
                        )
                    } }
                />
            </View>
        )
    }
}