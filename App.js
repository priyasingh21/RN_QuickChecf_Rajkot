import React, {Component} from 'react';
import { SafeAreaView } from 'react-native';
import StoreConfig from './src/Redux/Store';
import { colors } from './src/Helper';
import { setI18nConfig } from "localization";
console.disableYellowBox = true;

export default class App extends Component {

  constructor(props) {
    super(props);
    setI18nConfig();
  }

  render() {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.TRANSPARENT}}>
          <StoreConfig />
        </SafeAreaView>
    );
  }
}
