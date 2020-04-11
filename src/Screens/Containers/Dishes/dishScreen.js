import {connect} from "react-redux";
import {DishScreen} from '../../Components/Dishes/dishScreen';
import {getAllMenu} from '../../../Redux/Actions';

export const localActions = {
    LOAD_DISHES_DATA: 'LOAD_DISHES_DATA',
};

const handleLocalAction = (dispatch, action, navigation) => {
    const { type, data = {} } = action;
    switch (type) {

        case localActions.LOAD_DISHES_DATA:
            return dispatch(getAllMenu(data));
            break

    }
};

const mapStateToProps = (state) => {
    const { User, MenuCategory } = state;
    const { processing, status: userStatus } = User;
    const { processing: menuProcessing, status: menuStatus } = MenuCategory;
    return {
        localActions,
        User,
        MenuCategory,
        processing,
        menuProcessing: false,
        userStatus,
        menuStatus,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(DishScreen);
