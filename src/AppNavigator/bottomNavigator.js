import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import Icon from 'react-native-vector-icons/Entypo';
// import ChefIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import InboxIcon from 'react-native-vector-icons/FontAwesome';
import { colors, wp, hp } from '../Helper';
import {
    ChefScreen,
    DishScreen,
    AccountScreen,
    InboxScreen,
    Home
} from '../Screens/Containers';

const BottomTab = createBottomTabNavigator({
    Home: {
        screen: Home,
    },
    Chef: {
        screen: ChefScreen
    },
    Dish: {
        screen: DishScreen
    },
    Inbox: {
        screen: InboxScreen
    },
    Account: {
        screen: AccountScreen
    }
}, {
    headerMode: 'none',
    defaultNavigationOptions: ({ navigation, navigationOptions }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = Icon;
            let iconName;
            switch (routeName) {
                case 'Home':
                    // IconComponent = Icon;
                    iconName = 'home';
                    break;

                case 'Chef':
                    // IconComponent = ChefIcon;
                    iconName = 'chef-hat'
                    break;
                case 'Dish':
                    // IconComponent = Icon;
                    iconName = 'bowl';
                    break
                case 'Inbox':
                    // IconComponent = InboxIcon;
                    iconName = 'envelope-o';
                    break
                case 'Account':
                    // IconComponent = InboxIcon;
                    iconName = 'user-o';
                    break;
            }
            // return (
            //     <IconComponent
            //       name={iconName}
            //       size={20}
            //       color={tintColor}
            //     />
            //   );
        },
        tabBarLabel: ({tintColor}) => {
            const { routeName } = navigation.state;
            let title;
            switch (routeName) {
                case 'Home':  title = 'Home'; break
                case 'Chef': title = 'Chefs' ; break
                case 'Dish':  title = 'Dish'; break
                case 'Inbox': title = 'Inbox'; break
                case 'Account': title = 'Account'; break
            }
        return <Text style={{fontSize: 11, alignSelf: 'center', color: tintColor}}>{title}</Text>
        }
    }),
    tabBarOptions: {
        showLabel: true,
        activeTintColor: colors.APPGREEN,
        inactiveTintColor: colors.APPBROWN,
        style: {
            backgroundColor: colors.WHITE,
            overflow: 'hidden'
        }
    },
});


export { BottomTab };
