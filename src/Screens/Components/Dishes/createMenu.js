import React, { Component } from 'react';
import { View, Text, Image, FlatList, ScrollView, TextInput, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import {
    colors,
    hp,
    wp,
    fontSizes,
    menuClassificationData,
    menuRangeData,
    vegMenu,
    nonvegMenu,
    createMenuAvail,
    allergensMenu,
    markers,
} from '../../../Helper'
import { AppButton, CustomHeader, ActionSheet } from "../../Common";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-crop-picker';

const spicyMenu = ['Mild', 'Medium', 'Hot'];

class CreateMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuTitle: '',
            portainText: '',
            menuType: 'all',
            menuClassificationType: 'veg',
            menuRangeType: 'standard',
            tempVeg: vegMenu,
            tempNonVeg: nonvegMenu,
            tempCreateMenuAvail: createMenuAvail,
            tempAllergence: allergensMenu,
            tempMarkers: markers,
            spicyType: 'mild',
            images: new Array(4).fill(''),
            showPicker: false,
        }
        this.index = -1
        BackHandler.addEventListener('backHandler', this.handleDeviceBackButton)
    }

    componentDidMount(){
        const { handleLocalAction, localActions, navigation } = this.props;
        handleLocalAction({ type: localActions.GET_ALL_TAGS_SUBTAGS })
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        // alert(JSON.stringify(nextProps.MenuCategory.allTags.success))
        // alert(JSON.stringify(nextProps.MenuCategory.allTags.data))
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('backHandler', this.handleDeviceBackButton)
    }

    handleDeviceBackButton = () => {
        this.props.navigation.goBack();
        return true;
    }

    onChangeValuye = (key, val) => {
        this.setState({
            [key]: val
        })
    }

    renderItem = (item, index, type, key) => {
        return (
            <View key={index} style={{ flexDirection: 'row', flex: 1, marginVertical: wp(1) }}>
                <TouchableOpacity
                    onPress={() => this.onChangeValuye(key, item.toLowerCase())}
                    style={{
                        height: wp(5),
                        width: wp(5),
                        borderRadius: wp(5) / 2,
                        borderWidth: wp(0.3),
                        borderColor: (item.toLowerCase() === type) ? colors.APPGREEN : colors.GRAY,
                        marginRight: wp(3),
                        justifyContent: 'center',
                    }}
                >
                    <View style={{
                        height: wp(3),
                        width: wp(3),
                        borderRadius: wp(3) / 2,
                        borderWidth: wp(0.1),
                        borderColor: (item.toLowerCase() === type) ? colors.APPGREEN : colors.TRANSPARENT,
                        backgroundColor: (item.toLowerCase() === type) ? colors.APPGREEN : colors.TRANSPARENT,
                        alignSelf: 'center'
                    }} />
                </TouchableOpacity>
                <Text>{item}</Text>
            </View>
        )
    }

    toggleCheckbox = (item, index, type) => {
        let newSelectedValue = !item.selected
        type[index].selected = newSelectedValue
        this.setState({
            [type]: [...type]
        })
    }

    renderCheckBoxes = (item, index, type) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginVertical: wp(1) }}>
                <Icon
                    name={(item.selected) ? 'checkbox-marked' : 'checkbox-blank-outline'}
                    size={wp(7)}
                    color={(item.selected) ? colors.APPGREEN : colors.GRAY}
                    onPress={() => this.toggleCheckbox(item, index, type)}
                />
                <Text style={{ alignSelf: 'center', marginLeft: wp(2) }}>{item.title}</Text>
            </View>
        )
    }

    onCreateMenu = () => {
        const { menuTitle, portainText, menuType, menuClassificationType, menuRangeType, spicyType, tempAllergence, tempCreateMenuAvail, tempMarkers, tempNonVeg, tempVeg } = this.state;
        let selectedAllergence = tempAllergence.filter(data => data.selected);
        let selectedVeg = tempVeg.filter(data => data.selected);
        let selectedNonVeg = tempNonVeg.filter(data => data.selected);
        let selectedCreateMenuAvail = tempCreateMenuAvail.filter(data => data.selected);
        let selectedMarkers = tempMarkers.filter(data => data.selected);

        let menuData = {
            menuTitle,
            portainText,
            menuType,
            menuClassificationType,
            menuRangeType,
            spicyType,
            selectedMarkers,
            selectedNonVeg,
            selectedVeg,
            selectedCreateMenuAvail,
            selectedAllergence
        }
    }

    renderImageSection = ({ item, index }) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => { this._showPicker('showPicker', true); this.index = index; }}
                style={{
                    height: hp(15),
                    width: '48%',
                    backgroundColor: colors.WHITE,
                    borderRadius: wp(2),
                    marginVertical: wp(1),
                    marginHorizontal: wp(1),
                    borderWidth: wp(0.7),
                    borderColor: colors.APPGREEN,
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
                }}
            >
                {!(item) &&
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            height: hp(3),
                            width: hp(3),
                            borderRadius: hp(3) / 2,
                            backgroundColor: colors.APPGREEN,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                color: colors.WHITE,
                                fontSize: fontSizes.small,
                                alignSelf: 'center'
                            }}>{'+'}</Text>
                        </View>
                        <Text style={{
                            color: colors.BLACK,
                            fontSize: fontSizes.mini,
                            alignSelf: 'center',
                            marginTop: wp(2)
                        }}>{'Insert Picture'}</Text>

                    </View>
                    ||
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                        overflow: 'hidden'
                    }}>
                        <Image source={{ uri: item.sourceURL || item }} style={{ height: '100%', width: '100%' }} />
                    </View>
                }
            </TouchableOpacity>
        )
    }

    openImagePickerAsync = async () => {
        let imgOption = {
            width: 400,
            height: 400,
            cropping: true,
            mediaType: 'photo',
            includeBase64: true,
            writeTempFile: true,
            multiple: true,
            maxFiles: 15,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            compressImageQuality: 0.75,
        }

        ImagePicker.openPicker(imgOption).then(image => {
            console.log('image =>', image)
            this.setState({showPicker: false});

            if(image.length > 0) {
                image.map((i, index) => {
                    arr[this.index] = {filename: i.path.split('/').pop(), sourceURL: i.path, type: i.mime}
                    this.index += 1
                })
            }

            this.onChangeValuye('images', arr)
        }).catch((e) => {
            if(e.code === 'E_PICKER_CANCELLED') {
                this.setState({showPicker: false})
            } else {
                this.checkPermission();
            }
        })
    }

    openCameraAsync = () => {
    const {images} = this.state
    let arr = images

        let imgOption = {
            width: 400,
            height: 400,
            cropping: true,
            mediaType: 'photo',
            includeBase64: true,
            writeTempFile: true,
            multiple: true,
            maxFiles: 15,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            compressImageQuality: 0.75,
        }
        ImagePicker.openCamera(imgOption).then(image => {
            this.setState({showPicker: false})
            arr[this.index] = {filename: image.path.split('/').pop(), sourceURL: image.path, type: image.mime}
            this.onChangeValuye('images', arr)
        }).catch((e) => {
            if(e.code === 'E_PICKER_CANCELLED') {
                this.setState({showPicker: false})
            } else {
                this.checkPermission();
            }
        })
    }

    checkPermission = () => {
        Alert.alert('Permission Warning', 'You have not allowed this app to use camera/photos. Do you want to change permissions?',[
                {
                    text: 'No',
                    onPress: () => {this.setState({showPicker: false})},
                    style: 'cancel'
                },
                {text: 'Yes',
                    onPress: () => {
                        openSettings().then(res => {}).catch(e => {console.log(JSON.stringify(e))})
                    }
                },
            ],
            {cancelable: false}
        )
    }

    _showPicker = (key, val = false) => {
        this.setState({ [key]: val })
    }

    showActionSheet = () => {
        const { safeArea } = this.props

        return (
            <ActionSheet safeArea={safeArea}
                onClickCancel={() => this._showPicker('showPicker')}
                otherButtonOption={[{ title: 'Take Photo', color: colors.BLACK, onClick: () => this.openImagePicker(1) }, { title: 'Choose Existing', color: colors.BLACK, onClick: () => this.openImagePicker(2) }]}
                isVisible={this.state.showPicker}
            />
        )
    }

    openImagePicker = (buttonIndex) => {

        switch (buttonIndex) {
            case 1:
                this.openCameraAsync()
                break
            case 2:
                this.openImagePickerAsync();
                break
        }
    }

    render() {
        const { menuClassificationType, menuRangeType, spicyType, tempAllergence, tempCreateMenuAvail, tempMarkers, tempVeg, tempNonVeg, images } = this.state;
        return (
            <View style={{
                flex: 1,
                backgroundColor: colors.APPGREEN,
            }}>
                <View style={{ height: hp(11) }}>
                    <CustomHeader
                        navigation={this.props.navigation}
                        isCreateMenu={true}
                        titleText={'Create Menu'}
                        isBack={true}
                    />
                </View>

                <View style={{
                    flex: 1,
                    backgroundColor: colors.WHITE,
                    borderTopLeftRadius: wp(5),
                    borderTopRightRadius: wp(5),
                }} >
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{
                            flex: 1,
                            paddingVertical: wp(4),
                            paddingHorizontal: wp(2)
                        }}>

                            {/* Image Section */}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3),
                                marginVertical: wp(4),
                            }}>
                                <FlatList
                                    style={{ flex: 1, width: '100%' }}
                                    data={images}
                                    numColumns={2}
                                    renderItem={this.renderImageSection}
                                />
                            </View>

                            {/* Menu Title */}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'Menu Title'}</Text>
                                <TextInput
                                    style={{
                                        marginVertical: wp(2),
                                        borderWidth: wp(0.1),
                                        borderColor: colors.SILVER,
                                        paddingHorizontal: wp(3)
                                    }}
                                    onChangeText={(text) => this.onChangeValuye('menuTitle', text)}
                                />
                            </View>

                            {/* Portain Text */}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'A Portain contains(s)'}</Text>
                                <TextInput
                                    style={{
                                        marginVertical: wp(2),
                                        borderWidth: wp(0.1),
                                        borderColor: colors.SILVER,
                                        paddingHorizontal: wp(3),
                                        height: hp(10)
                                    }}
                                    onChangeText={(text) => this.onChangeValuye('portainText', text)}
                                    multiline
                                />
                            </View>

                            {/*Menu Classification*/}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3),
                                marginTop: wp(4)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'Menu Classification'}</Text>
                                <View style={{ paddingHorizontal: wp(5) }}>
                                    <FlatList
                                        data={menuClassificationData}
                                        numColumns={2}
                                        renderItem={({ item, index }) => this.renderItem(item, index, menuClassificationType, 'menuClassificationType')}
                                    />
                                </View>
                            </View>

                            {/* Veg Non-veg specification section */}
                            <View>
                                {
                                    <View style={{
                                        borderWidth: hp(0.1),
                                        borderColor: colors.SILVER,
                                        padding: wp(3),
                                        marginTop: wp(4)
                                    }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{(menuClassificationType === 'veg') ? 'Veg' : 'Non Veg'}</Text>
                                        <View style={{ paddingHorizontal: wp(5) }}>
                                            {
                                                (menuClassificationType === 'veg') &&
                                                <FlatList
                                                    data={tempVeg}
                                                    renderItem={({ item, index }) => this.renderCheckBoxes(item, index, tempVeg)}
                                                    numColumns={2}
                                                />
                                                ||
                                                <FlatList
                                                    data={tempNonVeg}
                                                    renderItem={({ item, index }) => this.renderCheckBoxes(item, index, tempNonVeg)}
                                                    numColumns={2}
                                                />
                                            }
                                        </View>
                                    </View>
                                }
                            </View>

                            {/*Menu Range*/}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3),
                                marginTop: wp(4)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'Menu Range'}</Text>
                                <View style={{ paddingHorizontal: wp(5), marginTop: wp(1) }}>
                                    <FlatList
                                        data={menuRangeData}
                                        numColumns={3}
                                        renderItem={({ item, index }) => this.renderItem(item, index, menuRangeType, 'menuRangeType')}
                                    />
                                </View>
                            </View>

                            {/*Spicy*/}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3),
                                marginTop: wp(4)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'Spicy'}</Text>
                                <View style={{ paddingHorizontal: wp(5), marginTop: wp(1) }}>
                                    <FlatList
                                        data={spicyMenu}
                                        numColumns={3}
                                        renderItem={({ item, index }) => this.renderItem(item, index, spicyType, 'spicyType')}
                                    />
                                </View>
                            </View>

                            {/*Allergents*/}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3),
                                marginTop: wp(4)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'Allergens'}</Text>

                                <View style={{ paddingHorizontal: wp(5) }}>
                                    <FlatList
                                        data={tempAllergence}
                                        renderItem={({ item, index }) => this.renderCheckBoxes(item, index, tempAllergence)}
                                        numColumns={2}
                                    />
                                </View>

                            </View>

                            {/*Markers*/}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3),
                                marginTop: wp(4)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'Markers'}</Text>

                                <View style={{ paddingHorizontal: wp(5) }}>
                                    <FlatList
                                        data={tempMarkers}
                                        renderItem={({ item, index }) => this.renderCheckBoxes(item, index, tempMarkers)}
                                        numColumns={2}
                                    />
                                </View>
                            </View>

                            {/*Menu Available on*/}
                            <View style={{
                                borderWidth: hp(0.1),
                                borderColor: colors.SILVER,
                                padding: wp(3),
                                marginTop: wp(4)
                            }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fontSizes.small }}>{'Menu Available on'}</Text>

                                <View style={{ paddingHorizontal: wp(5) }}>
                                    <FlatList
                                        data={tempCreateMenuAvail}
                                        renderItem={({ item, index }) => this.renderCheckBoxes(item, index, tempCreateMenuAvail)}
                                    />
                                </View>
                            </View>

                        </View>
                        {this.showActionSheet()}
                    </ScrollView>

                    <AppButton
                        buttonText={'Publish Now'}
                        textColor={colors.WHITE}
                        backgroundColor={colors.APPGREEN}
                        styleBtn={{ alignSelf: 'center' }}
                        onBtnPress={this.onCreateMenu}
                    />

                </View>
            </View>
        )
    }
}

export { CreateMenu }
