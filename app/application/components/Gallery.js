import React, { Component } from 'react'
import { Animated, View, StyleSheet, ImageBackground, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {map} from 'lodash';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default function Gallery(props) {

  const { images, onclick } = props;

  const itemsPerInterval = props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const [photoViewerConfig, setPhotoViewerConfig] = React.useState({
      selectedPhotoIndex: 0,
      isShowed: false,
    });

  const openViewer = () => {
    onclick();
  }

  const init = (width) => {
    setWidth(width);
    const totalItems = images.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  }

  const getInterval = (offset) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset+1 < (width / intervals) * i) {
        return i;
      }
      if (i == intervals) {
        return i;
      }
    }
  }

  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Icon
      name={"circle"}
      key={i}
      size={10}
      color={"white"}
      style={{
        opacity: interval === i ? 0.9 : 0.3,
        marginHorizontal: 2
      }}
      />
      );
  }



  let imageArray = []
  let barArray = []
  images.map((item, i) => {
    const thisImage = (
      <ImageBackground
      key={`item${i}`}
      source={{uri: item.url}}
      style={{ width: deviceWidth}}
      resizeMode={"cover"}
      />
      )
    imageArray.push(thisImage)
  })

  return (
    <View style={styles.container} flex={1}>
    <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    onContentSizeChange={(w, h) => init(w)}
    onScroll={data => {
      setWidth(data.nativeEvent.contentSize.width);
      setInterval(getInterval(data.nativeEvent.contentOffset.x));
    }}
    scrollEventThrottle={200}
    pagingEnabled
    decelerationRate="fast"
    >
    {imageArray}
    </ScrollView>
    <View style={styles.barContainer}>
    {bullets}
    </View>

    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: deviceHeight*0.38
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    bottom: 25,
    flexDirection: 'row',
  },

  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
  bar: {
    backgroundColor: '#fff',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
})