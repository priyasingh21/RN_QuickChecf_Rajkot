import { connect } from "react-redux";
import { ChefDetail } from '../../Components/Chefs/chefDetail';
import { getChef } from "../../../Redux/Actions/userActions";

export const localActions = {
    GET_CHEF: 'GET_CHEF',
    TOGGLE_FOLLOW_CHEF: 'TOGGLE_FOLLOW_CHEF',
};

const handleLocalAction = (dispatch, action, navigation) => {
    const { type, data } = action;
    switch (type) {

        case localActions.GET_CHEF:
            return dispatch(getChef(data));
            break

        case localActions.TOGGLE_FOLLOW_CHEF:
            return dispatch(getChef(data));
            break
    }
};

const mapStateToProps = (state) => {
    const { User } = state;
    const { processing, singleChef } = User;
    return {
        localActions,
        User,
        singleChef,
        processing
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChefDetail);
