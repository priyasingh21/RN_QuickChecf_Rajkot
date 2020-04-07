import {connect} from "react-redux";
import {CommunicationPreference} from '../../Components/SideDrawer/communicationPreference';

export const localActions = {
    SET_COMMUNICATION_PREFERENCE: 'SET_COMMUNICATION_PREFERENCE',
};

const handleLocalAction = (dispatch, action, navigation) => {
    const { type, data } = action;
    switch (type) {

        case localActions.SET_COMMUNICATION_PREFERENCE:
            return dispatch(setCummunicationPreferenceData(data));
            break
    }
};

const mapStateToProps = (state) => {
    const { User, CommunicationPreference } = state;

    return {
        localActions,
        User,
        CommunicationPreference
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunicationPreference);
