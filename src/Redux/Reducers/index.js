import User from './Chefs/chefReducer';
import Cuisine from './Cuisine/cusineReducer';
import MenuCategory from './Menu/menuTypeReducer';
import ForYouCategory from './ForYou/forYouReducer';
import CommunicationPreference from './CommunicationPreference/communicationPreferenceReducer';
import Common from './common'
import { combineReducers } from 'redux';

const appReducers = combineReducers({
    User,
    Cuisine,
    MenuCategory,
    Common,
    ForYouCategory,
    CommunicationPreference
});

export {appReducers}

