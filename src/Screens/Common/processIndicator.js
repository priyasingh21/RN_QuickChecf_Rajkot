import React, {Component} from 'react'
import {View} from 'react-native'
import {hp, colors} from "../../Helper";
import { CirclesLoader, BubblesLoader, DotsLoader, BreathingLoader} from 'react-native-indicator';

class ProcessIndicator extends Component {
  render () {
    
    const {isProcessing, color} = this.props;

     if (isProcessing) {
      return (
        <View style={{
          position: 'absolute',
          zIndex: 5000,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%'
          }}>
          <DotsLoader size={hp(3)} color={color} />
        </View>
      )
     } else {
       return null
     }
  }
}

export default ProcessIndicator
