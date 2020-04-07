import React, {Component} from 'react';
import { SafeAreaView } from 'react-native';
import StoreConfig from './src/Redux/Store/index';
import { colors } from './src/Helper';
console.disableYellowBox = true;

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.TRANSPARENT}}>
          <StoreConfig />
        </SafeAreaView>
    );
  }
}
