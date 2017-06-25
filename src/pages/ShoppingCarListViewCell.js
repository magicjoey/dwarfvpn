'use strict';
import React, { Component, PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    ListView,
    PixelRatio,
    InteractionManager
} from 'react-native';
import Common from '../common/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Buttom from '../common/Buttom';
import {selectOne, changeShopCount} from '../action/ShopCarAction';

const isLoading = true;

const propTypes = {
    module: PropTypes.array.isRequired,

};
const cellHeight = Common.window.width / 3;

let num = 0;

let shopNum = 0;
export default class ShoppingCarListViewCell extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this._renderRow = this._renderRow.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }
    show(date) {
        alert(date);
    }
    selectOne(shopID, isSelectOne, isLoading) {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            // console.log(isSelectOne);
            dispatch(selectOne(shopID, isSelectOne, isLoading));
        });

    }
    changeShopCount(isChange, shopID) {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            // console.log(isSelectOne);
            dispatch(changeShopCount(isChange, shopID));

        });

    }
    fileGroupOldPrices() {
        var price = 0
        this.props.module.car_productlist.forEach(function (element) {
            if (element.buyStatus === true && element.state === '1') {
                price += parseInt(element.price1.value) * parseInt(element.number);
            }

        }, this);
        return price
    }
    fileGroupNewPrices() {
        var price = 0
        this.props.module.car_productlist.forEach(function (element) {
            if (element.buyStatus === true && element.state === '1') {
                price += parseInt(element.price2.value) * parseInt(element.number);
            }
        }, this);
        return price
    }


    _renderRow(rowDate) {
        const { ShopCarReducer} = this.props;
        // isSelect = ShopCarReducer.isSelectOne;
        // isSelect =Boolean(parseInt(rowDate.buyStatus));
        // console.log()
        var isSelect = rowDate.buyStatus;

        const BrandNameStyle = {
            justifyContent: 'center',
            alignItems: 'center',
            width: Common.window.width / 13,
            height: Common.window.width / 13,
            backgroundColor: 'rgb(240, 240, 240)',
            borderRadius: Common.window.width / 13,
            marginLeft: -10,
            borderColor: 'black',
            borderWidth: 1 / PixelRatio.get(),
        };
        return (
            <View style={{ flexDirection: 'column' }}>
                {rowDate.state === "1" ?
                    <View>
                        <View style={styles.row}>
                            <View style={styles.imgAndButton}>
                                <Buttom
                                    containerStyle = {
                                        [BrandNameStyle, isSelect ? { backgroundColor: 'black' } : { backgroundColor: '#fcfcfc' }]
                                    }
                                    style={[{ fontSize: 16, textAlign: 'center' },
                                        isSelect ? { color: 'white' } : { color: 'white' }]}
                                    text={'√'}
                                    onPress={
                                        () => this.selectOne(rowDate.id, !isSelect, isLoading)
                                    }
                                    />
                            </View>
                            <View style={styles.bigCell}>
                                <View style={styles.title}>
                                    <Text style={{ fontSize: 11 }}>{rowDate.name}</Text>
                                </View>
                                <View style={styles.tradeName}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.img}>
                                            <Image
                                                source={{ uri: rowDate.pic }}
                                                style={{ width: cellHeight * 3 / 5 - 5, height: cellHeight * 3 / 5 - 5 }}
                                                />
                                        </View>
                                        <View style={styles.shopDetial}>
                                            <Text style={styles.shopDetialTitle}>{'颜色:' + rowDate.color}</Text>
                                            <Text  style={styles.shopDetialTitle}>{'尺寸:' + rowDate.size}</Text>
                                            <Text style={styles.shopDetialTitle}>{'发货:' + rowDate.merchant}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.priceAndCound}>
                                        <Text style={{ height: cellHeight * 4 / 5 / 3, fontSize: 12, color: 'red', textAlign: 'right' }}>{'¥' + rowDate.price1.value}</Text>
                                        {ShopCarReducer.isChangeShopCar ?
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity
                                                    onPress={() => this.changeShopCount(false, rowDate.id) }
                                                    activeOpacity={0.75}
                                                    style={styles.countButton} >

                                                    <Text >-</Text>
                                                </TouchableOpacity>
                                                <View style={[styles.countButton, { borderRightWidth: 0, borderLeftWidth: 0 }]} >
                                                    <Text >{rowDate.number}</Text>

                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => this.changeShopCount(true, rowDate.id) }
                                                    activeOpacity={0.75}
                                                    style={styles.countButton} >

                                                    <Text>+</Text>

                                                </TouchableOpacity>

                                            </View>
                                            : <Text style={{ height: cellHeight * 4 / 5 / 3, fontSize: 12, textAlign: 'right' }}>{'x' + rowDate.number}</Text>
                                        }

                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ width: Common.window.width, height: Common.window.height / 60, backgroundColor: 'white' }}>
                        </View>
                    </View>
                    : <View></View>}
            </View>
        );
    }
    _renderHeader(object) {
        const { ShopCarReducer} = this.props;
         num = 0;
        this.props.module.car_productlist.forEach(function (element) {
            if (element.state === '0') {
                num++
            }

        }, this);
         shopNum = this.props.module.car_productlist.length;

        return (
            <View>
                {shopNum > num ?
                    <View>
                        <View style={{ width: Common.window.width, height: 50, backgroundColor: 'white', justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 10, paddingRight: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ backgroundColor: 'red', color: 'white', height: 20, padding: 3, fontSize: 12, marginTop: 5 }}>{this.props.module.title}</Text>
                                <Text style={{ margin: 5, fontSize: 11, padding: 5, color: 'gray' }}>{this.props.module.subtitle}</Text>
                            </View>
                            <View >
                                <Text style={{ paddingRight: 10, textAlign: 'right', color: 'red' }}>{ this.fileGroupOldPrices() !== 0 ? '¥' + this.fileGroupOldPrices() : '' }</Text>
                                <Text style={{ marginTop: 5, paddingRight: 10, textAlign: 'right', color: 'red' }}>{ (this.fileGroupOldPrices() - this.fileGroupNewPrices()) ? '节省' + (this.fileGroupOldPrices() - this.fileGroupNewPrices()) + '元' : ''}</Text>
                            </View>

                        </View>
                        <View style={{ height: 1 / PixelRatio.get() }}>
                        </View>
                    </View>
                    : <View></View>}
            </View>
        );
    }
    render() {

        return (
            <View style={styles.StyleFor18}>

                <View >
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRows(this.props.module.car_productlist ? this.props.module.car_productlist : []) }
                        renderRow={this._renderRow}
                        // dataSource={this.state.dataSource.cloneWithRows([1, 2]) }
                        renderHeader= {
                            this._renderHeader.bind(this)
                        }
                        enableEmptySections={true}
                        initialListSize= {4}
                        style={styles.listView}
                        />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    priceAndCound: {
        backgroundColor: 'white',
        marginTop: cellHeight / 5,
        width: Common.window.width * 1 / 5,
        // height: cellHeight * 3 / 5,



    },
    img: {
        // backgroundColor: 'yellow',
        width: cellHeight * 3 / 5,
        height: cellHeight * 3 / 5,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 15,

    },
    shopDetial: {
        backgroundColor: 'white',
        paddingTop: 10,

        width: Common.window.width * 2 / 5,
        marginLeft: 5,
        marginTop: 5,


    },
    shopDetialTitle: {
        height: cellHeight * 4 / 5 / 3 - 6,
        fontSize: 11,
        color: 'rgb(133,133,133)',
    },


    tradeName: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    imgAndButton: {
        backgroundColor: 'white',
        width: Common.window.width / 10,
        // height: cellHeight,
        marginLeft: 10,
        marginTop: 25,

        alignItems: 'center',
        justifyContent: 'center',

    },
    bigCell: {
        backgroundColor: 'white',

    },

    title: {
        backgroundColor: 'white',
        width: Common.window.width * 4 / 5,
        marginTop: 5,

    },
    row: {
        // height: cellHeight,
        width: Common.window.width,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',

    },
    listView: {
    },
    StyleFor18: {
        flexDirection: 'row',
        width: Common.window.width,
    },

    text1: {
        marginLeft: 10,
    },
    countButton: {
        width: 25,
        height: 20,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        borderWidth: 1 / PixelRatio.get(),
    }
});