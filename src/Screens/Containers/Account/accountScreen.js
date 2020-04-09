import {connect} from "react-redux";
import {AccountScreen} from '../../Components/Account/accountScreen';

const handleLocalAction = (dispatch, action, navigation) => {};

export const localActions = {};


const mapStateToProps = (state) => {

    const {User} = state
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
