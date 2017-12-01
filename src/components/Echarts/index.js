import React, { Component } from 'react';
import { WebView, View, StyleSheet } from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';
const source = (Platform.OS === 'ios')||__DEV__? require('./tpl.html') : {'uri':'file:///android_asset/echarts/tpl.html'}

export default class App extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.option !== this.props.option) {
      this.refs.chart.reload();
    }
  }

  render() {
    return (
      <View style={{flex: 1, height: this.props.height || 400,}}>
        <WebView
          ref="chart"
          scrollEnabled = {false}
          scalesPageToFit={false}
          injectedJavaScript = {renderChart(this.props)}
          style={[{
            height: this.props.height || 400,
          },this.props.style]}
          source={source}
          onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
        />
      </View>
    );
  }
}
