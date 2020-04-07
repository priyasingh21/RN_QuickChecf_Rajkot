import {connect} from "react-redux";
import {SideMenu} from '../../Components/SideDrawer/sideMenu';
import { logoutApp} from "../../../Redux/Actions";

export const localActions = {
    LOGOUT: 'LOGOUT'
};

const handleLocalAction = (dispatch, action, navigation) => {
    const {type} = action;
    switch (type) {

        case localActions.LOGOUT:
            return dispatch(logoutApp());
            break
    }
};

const mapStateToProps = (state) => {
    const {User} = state;
    return {
        localActions,
        User
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
