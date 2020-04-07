import {connect} from "react-redux";
import {AccountScreen} from '../../Components/Account/accountScreen';

const handleLocalAction = (dispatch, action, navigation) => {};

export const localActions = {};


const mapStateToProps = (state) => {

    const {User} = state
    
    return {User};
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
