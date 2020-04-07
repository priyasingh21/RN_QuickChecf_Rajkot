import { AsyncStorage } from '@react-native-community/async-storage';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
    Login,
    SignInWithPhone,
    Splashscreen,
    Registration,
    Filters,
    MobileVerificationScreen,
    InitialScreen,
    CreateMenu,
    OrderStatusMap,
    OrderList,
    OrderDetails,
    Chat
} from '../Screens/Containers';

import { AppDrawer } from './drawerNavigation';

let initRoute = 'Splashscreen';

AsyncStorage.getItem('loginData').then(res => {
    if(res && JSON.parse(res).id){
        initRoute = 'AppDrawer'
    }
}).catch(e => {});

const stack = createStackNavigator({
    AppDrawer,
    Login,
    InitialScreen,
    Registration,
    MobileVerificationScreen,
    SignInWithPhone,
    Splashscreen,
    Filters,
    CreateMenu,
    OrderStatusMap,
    OrderList,
    OrderDetails,
    Chat
}, {
    initialRouteName: initRoute,
    headerMode: 'none'
});

const AppContainer = createAppContainer(stack);

export { AppContainer };
