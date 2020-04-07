import { connect } from "react-redux";
import { ChefScreen } from '../../Components/Chefs/chefScreen';
import { getAllChefs } from "../../../Redux/Actions/userActions";

export const localActions = {
    GET_ALL_CHEF: 'GET_ALL_CHEF',
};

const handleLocalAction = (dispatch, action, navigation) => {
    const { type } = action;
    switch (type) {

        case localActions.GET_ALL_CHEF:
            return dispatch(getAllChefs());
            break
    }
};

const mapStateToProps = (state) => {
    const { User } = state;
    const { processing, chefData } = User;
    return {
        localActions,
        User,
        chefData,
        processing
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChefScreen);
