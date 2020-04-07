import { connect } from "react-redux";
import { signUp, getCountryList } from "../../../Redux/Actions";
import { Registration } from '../../Components/Login/registration';

export const localActions = {
    SIGN_UP_USER: 'SIGN_UP_USER',
    GET_COUNTRY_LIST: 'GET_COUNTRY_LIST'
};

const handleLocalAction = (dispatch, action, navigation) => {
    const { type, data } = action;
    switch (type) {
        case localActions.SIGN_UP_USER:
            return dispatch(signUp(data));
            break

        case localActions.GET_COUNTRY_LIST:
            return dispatch(getCountryList());
            break
    }
};

const mapStateToProps = (state) => {
    const { User } = state;
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

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
