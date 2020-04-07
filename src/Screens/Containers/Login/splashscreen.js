import {connect} from "react-redux";
import {Splashscreen} from '../../Components/Login/splashscreen';
import {signIn} from "../../../Redux/Actions";

const handleLocalAction = (dispatch, action, navigation) => {
    const {type} = action;
    switch (type) {
        case localActions.LOGIN_CHEF:
            return dispatch(signIn());
            break
    }
};

export const localActions = {
    LOGIN_CHEF: 'LOGIN_CHEF'
};

const mapStateToProps = (state) => {
    const {User} = state;
    return {
        User
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Splashscreen);
