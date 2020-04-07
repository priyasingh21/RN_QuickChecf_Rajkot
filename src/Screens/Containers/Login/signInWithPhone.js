import { connect } from "react-redux";
import { signIn, getCountryList } from "../../../Redux/Actions";
import { SignInWithPhone } from '../../Components/Login/signInWithPhone';

export const localActions = {
    LOGIN_CHEF: 'LOGIN_CHEF',
    GET_COUNTRY_LIST: 'GET_COUNTRY_LIST'
};

const handleLocalAction = (dispatch, action, navigation) => {
    const { type, data } = action;
    switch (type) {
        case localActions.LOGIN_CHEF:
            return dispatch(signIn(data));
            break

        case localActions.GET_COUNTRY_LIST:
            return dispatch(getCountryList());
            break
    }
};
const mapStateToProps = (state) => {
    const { User } = state;
    const { processing } = User;
    return {
        localActions,
        User,
        processing
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInWithPhone);
