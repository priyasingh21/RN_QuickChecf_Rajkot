import {connect} from "react-redux";
import {CreateMenu} from '../../Components/Dishes/createMenu';
import {getAllTagsWithSubTags} from '../../../Redux/Actions';


export const localActions = {
    GET_ALL_TAGS_SUBTAGS: 'GET_ALL_TAGS_SUBTAGS',
};

const handleLocalAction = (dispatch, action, navigation) => {
    const { type, data } = action;
    switch (type) {
        case localActions.GET_ALL_TAGS_SUBTAGS:
            return dispatch(getAllTagsWithSubTags());
            break
    }
};

const mapStateToProps = (state) => {
    const { User, MenuCategory } = state;
    return {
        localActions,
        User,
        MenuCategory
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateMenu);
