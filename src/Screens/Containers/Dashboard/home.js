import { connect } from "react-redux";
import { Home } from '../../Components/Dashboard/home';
import { getAllCuisine, getAllMenuTypes, logoutApp, getAllForYouTypes } from "../../../Redux/Actions";

export const localActions = {
    CUISINE_DATA: 'CUISINE_DATA',
    MENU_TYPE_DATA: 'MENU_TYPE_DATA',
    FOR_YOU_DATA: 'FOR_YOU_DATA',
};

const handleLocalAction = (dispatch, action, navigation) => {
    const { type, data } = action;
    switch (type) {

        case localActions.CUISINE_DATA:
            return dispatch(getAllCuisine(data));
            break

        case localActions.MENU_TYPE_DATA:
            return dispatch(getAllMenuTypes(data));
            break

        case localActions.FOR_YOU_DATA:
            return dispatch(getAllForYouTypes(data));
            break
    }
};

const mapStateToProps = (state) => {
    const { User, Cuisine, MenuCategory, ForYouCategory } = state;
    const { processing, status: userStatus } = User;
    const { processing: menuProcessing, status: menuStatus } = MenuCategory;
    const { processing: foryouProcessing, status: foryouStatus } = ForYouCategory;
    const { processing: cuisineProcessing, status: cuisineStatus } = Cuisine;
    return {
        localActions,
        User,
        Cuisine,
        MenuCategory,
        processing,
        menuProcessing: false,
        cuisineProcessing: false,
        userStatus,
        menuStatus,
        cuisineStatus,
        ForYouCategory
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
