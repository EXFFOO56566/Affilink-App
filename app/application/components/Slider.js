import React, { useState, useEffect } from 'react';
import { Animated, View, StyleSheet, ImageBackground, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {map} from 'lodash';
import {getSlider} from "../config/DataApp";
import Loading from './InnerLoading';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default function Slider(props) {

  const itemsPerInterval = props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [isLoaded, setIsLoaded] = useState(true);
  const [images, setImages] = useState([]);
  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    getSlider().then((response) => {
        setImages(response);
        setIsLoaded(true);
    });
  }, []);
  
  const [photoViewerConfig, setPhotoViewerConfig] = React.useState({
      selectedPhotoIndex: 0,
      isShowed: false,
    });

  const init = (width: number) => {
    setWidth(width);
    const totalItems = images.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  }

  const getInterval = (offset: any) => {
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
      size={14}
      color={"white"}
      style={{
        opacity: interval === i ? 0.9 : 0.3,
        marginHorizontal: 3
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
      source={{uri: item.image}}
      style={{ width: deviceWidth, height: deviceHeight*0.20}}
      resizeMode={"contain"}
      />
      )
    imageArray.push(thisImage)
  })

  if (!isLoaded) {
    return (
      <Loading/>
      );
  }

  if (isLoaded) {
  if (images) {
    return (
    <View style={styles.container}>
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
      );
  }else{
    return null
  }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: deviceHeight*0.20,
    marginTop: 5,
    width: deviceWidth

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