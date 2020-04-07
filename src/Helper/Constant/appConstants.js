

const lunchData = [{
    profileImage: require('../../../assets/QKLogo.jpeg'),
    name: 'Peter Cousin',
    ratings: 4.5,
    reviewCount: 5,
    distance: 3.5,
    foodImage: require('../../../assets/dry_fruit.jpg'),
    price: 30,
    bottomText: 'Spicy Noodles'
}, {
    profileImage: require('../../../assets/QKLogo.jpeg'),
    name: 'Peter Cousin',
    ratings: 4.5,
    reviewCount: 5,
    distance: 3.5,
    foodImage: require('../../../assets/foodPlate.jpg'),
    price: 30,
    bottomText: 'Spicy Noodles'
}];

const snackData = [{
    profileImage: require('../../../assets/QKLogo.jpeg'),
    name: 'Peter Cousin',
    ratings: 4.5,
    reviewCount: 5,
    distance: 3.5,
    foodImage: require('../../../assets/dry_fruit.jpg'),
    price: 30,
    bottomText: 'Spicy Noodles'
}, {
    profileImage: require('../../../assets/QKLogo.jpeg'),
    name: 'Felipe Doe',
    ratings: 4.5,
    reviewCount: 5,
    distance: 2.1,
    foodImage: require('../../../assets/capsicum.jpg'),
    price: 45,
    bottomText: 'Beef Burger'
}];

const communicationType = [{
    title: 'Push Notification',
    selected: true
}, {
    title: 'Email',
    selected: false
}, {
    title: 'SMS',
    selected: true
}, {
    title: 'Phone',
    selected: false
}, {
    title: 'By Post',
    selected: false
},]

const cuisineCountry = [{
    title: 'Kerala',
    selected: true
}, {
    title: 'Goan',
    selected: true
}, {
    title: 'Andhra',
    selected: true
}, {
    title: 'South Indian',
    selected: false
}, {
    title: 'International',
    selected: false
}, {
    title: 'Gujarati',
    selected: false
}, {
    title: 'North Indian',
    selected: true
}, {
    title: 'American',
    selected: false
}];

const forYouData = ['Highest Rated', 'Newly Added', 'Within 2 hours', 'All'];
const menuData = ['Breakfast', 'Lunch', 'Dinner', 'Bakery', 'Snacks', 'Other', 'All'];
const deliveryData = ['Delivery', 'Collections', 'Postal', 'All'];
const distanceData = ['1 KM', '2KM', 'Dinner', '3 KM', 'Snacks', '5 KM', '10 KM', 'All'];
const menuClassificationData = ['Veg', 'Non Veg'];
const menuRangeData = ['Standard', 'Premium', 'Exquisite'];
const portionSize = [{
        title: 'For one',
        selected: true
    }, {
        title: 'For two',
        selected: false
    }, {
        title: 'Combo',
        selected: true
    }, {
        title: 'Sharing',
        selected: false
    }];

const markers = [
    {
        title: 'Halal',
        selected: true
    }, 
    {
        title: 'Diet',
        selected: false
    }, {
        title: 'Organic',
        selected: false
    }
];

const spicyMenu = [{
    title: 'Mild',
    selected: true
},{
    title: 'Medium',
    selected: false
},{
    title: 'Hot',
    selected: false
}];

const menuAvailibility = [{
    title: 'Mon',
    selected: true
},{
    title: 'Tue',
    selected: false
},{
    title: 'Wed',
    selected: false
},{
    title: 'Thu',
    selected: false
},{
    title: 'Fri',
    selected: false
},{
    title: 'Sat',
    selected: false
}];

const vegMenu = [{
    title: 'Fruits',
    selected: true
},{
    title: 'Salad',
    selected: false
},{
    title: 'Nuts',
    selected: false
},{
    title: 'Pulses',
    selected: false
},{
    title: 'Dry Fruits',
    selected: false
}];

const nonvegMenu = [{
    title: 'Nuts/Seeds',
    selected: true
},{
    title: 'Fish',
    selected: false
},{
    title: 'Egg',
    selected: false
},{
    title: 'Red Meat',
    selected: false
}];

const allergensMenu = [{
    title: 'Nuts/Seeds',
    selected: true
},{
    title: 'Fish',
    selected: false
},{
    title: 'Gluton',
    selected: false
}];

const createMenuAvail = [{
    title: 'Today',
    selected: true
},{
    title: 'Upon Request',
    selected: false
},{
    title: 'For Period',
    selected: false
}];

export {
    lunchData,
    snackData,
    forYouData,
    menuData,
    communicationType,
    deliveryData,
    distanceData,
    menuClassificationData,
    menuRangeData,
    cuisineCountry,
    portionSize,
    markers,
    spicyMenu,
    menuAvailibility,
    vegMenu,
    nonvegMenu,
    createMenuAvail,
    allergensMenu
}
