import {connect} from "react-redux";
import {InitialScreen} from '../../Components/Login/initalScreen';

const handleLocalAction = (dispatch, action, navigation) => {
};

export const localActions = {};

const mapStateToProps = (state) => {
    const { User } = state;
    return {
        User
    };
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen);
