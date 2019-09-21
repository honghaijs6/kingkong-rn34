import React, { Component } from 'react';
import { WebView } from 'react-native';



export default class BackgroundTaskRunner extends Component {
  componentDidMount() {

    this.runJSInBackground(`
      window.postMessage("Post message from web", "*");

    `)
  }

  render() {
    return (
      <WebView

        javaScriptEnabled = {false}

        ref={el => this.webView = el}
        source={{html: '<html><body></body></html>'}}

        onMessage={this.onMessage}

      />
    )
  }
  runJSInBackground (code) {
    this.webView.injectJavaScript(code)
  }

  onMessage = (e) => {

    alert('hello handler me')
    const message = e.nativeEvent.data
    console.log(' ::::::::: message from webview:', message)
  }
}
