import React from 'react';
import { Image } from 'react-native';
import shorthash from 'shorthash';
import { FileSystem } from 'expo';




export default class Img extends React.Component {
  state = {
    source: null,
  };

  async componentDidMount(){
    const { uri } = this.props;
    const name = shorthash.unique(uri);
    console.log(name);
    const path = `${FileSystem.cacheDirectory}${name}`;
    const image =  await FileSystem.getInfoAsync(path);
    if (image.exists) {
      console.log('read image from cache');
      console.log(image.uri);

      this.setState({
        source: {
          uri: image.uri,
        },
      });

      console.log(image.uri);

      return;
    }

    console.log('downloading image to cache');
    const newImage = await FileSystem.downloadAsync(uri, path);
    this.setState({
      source: {
        uri: newImage.uri,
      },
    });
  };

  render() {
    return <Image style={this.props.style} source={this.state.source} />;
  }
}
