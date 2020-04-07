import {connect} from "react-redux";
import {signIn} from "../../../Redux/Actions";
import {MobileVerificationScreen} from '../../Components/Login/mobileVerificationScreen';

export const localActions = {
    LOGIN_CHEF: 'LOGIN_CHEF'
};

const handleLocalAction = (dispatch, action, navigation) => {
    const {type, data} = action;
    switch (type) {
        case localActions.LOGIN_CHEF:
            return dispatch(signIn(data));
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileVerificationScreen);
