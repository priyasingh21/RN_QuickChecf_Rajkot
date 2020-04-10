const BASE_URL = "http://qikchef.codesequel.in/api/";

const API_ENDPOINT = {
    USER: 'user',
    CUISINES: 'cuisines',
    MENU_TYPES: 'menus/type',
    MENU: 'menus',
    FOR_YOU: 'for/you',
    REGISTER: 'register',
    LOGIN: 'login',
    All_CHEFS: 'chefs',
    COUNTRIES: 'countries',
    COMMUNICATION_PREFERENCE: 'communication/preference',
    BECOME_CHEF: 'becomeachef',
    CHEF: 'chef',
    UPDATE_PROFILE: 'update/profile',
    TAG_TYPES: 'tag/types', // parent of /tags and no need for now
    TAGS: 'tags',

    //pending
    TOGGLE_FOLLOW: 'toggle/follow',
}

export {
    BASE_URL,
    API_ENDPOINT
}
