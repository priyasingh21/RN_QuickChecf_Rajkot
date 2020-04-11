import {connect} from "react-redux";
import {AccountScreen} from '../../Components/Account/accountScreen';
import {becomeAChef, updateProfile} from '../../../Redux/Actions';

const handleLocalAction = (dispatch, action, navigation) => {
    const {type, data = {}} = action;
    switch (type) {
        case localActions.BECOME_A_CHEF:
            return dispatch(becomeAChef(data));
            break

        case localActions.EDIT_PROFILE:
            return dispatch(updateProfile(data));
            break
    }
};

export const localActions = {
    BECOME_A_CHEF: 'BECOME_A_CHEF',
    EDIT_PROFILE: 'EDIT_PROFILE',
};


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
