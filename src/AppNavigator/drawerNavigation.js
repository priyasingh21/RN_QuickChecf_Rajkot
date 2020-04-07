import {createDrawerNavigator} from 'react-navigation-drawer';
import {
    SideMenu,
    TermsAndConditions,
    AboutUs,
    DeliveryAreas,
    AppVedioDetailScreen,
    CommunicationPreference,
    Feedback,
    Faq,
    AddAddress,
    AddressList,
} from '../Screens/Containers';
import {BottomTab} from './bottomNavigator';
import {wp} from '../Helper';


const AppDrawer = createDrawerNavigator({
        BottomTab,
        TermsAndConditions,
        CommunicationPreference,
        AboutUs,
        DeliveryAreas,
        AppVedioDetailScreen,
        Feedback,
        Faq,
        AddAddress,
        AddressList,
    }, {
        initialRouteName: 'BottomTab',
        contentComponent: SideMenu,
        drawerWidth: wp('80%'),
        drawerBackgroundColor: 'transparent'
    }
);

export {AppDrawer};
