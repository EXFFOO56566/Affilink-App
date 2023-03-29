import React, { useState, useEffect, useRef, useContext } from 'react';
import { Animated, ScrollView, View, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Text, IconButton, Divider, Button } from 'react-native-paper';
import { getDealById, getGalleryByDeal, getLogged, checkLike, submitLike, submitUnLike } from "../config/DataApp";
import Styles from '../config/Styles';
import { LinearGradient } from 'expo-linear-gradient';
import Strings from "../config/Strings";
import AppLoading from '../components/AppLoading';
import CountDown from '../components/CountDown';
import { Col, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ShareModal from '../components/ShareModal';
import UserContext from '../context/UserContext';
import HeaderGallery from '../components/Gallery';
import { HTMLStyles } from '../config/HTMLStyles';
import { HTMLStylesDark } from '../config/HTMLStylesDark';
import HTMLView from 'react-native-htmlview';
import Rating from '../components/Rating';
import ExclusiveContent from '../components/ExclusiveContent';
import { useIsFocused } from '@react-navigation/native';
import usePreferences from '../hooks/usePreferences';

export default function SingleDeal(props) {

	const isFocused = useIsFocused();
  const {theme} = usePreferences();

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const userState = useContext(UserContext);
  const userInfo = userState.user;

  const { route } = props;
  const { navigation } = props;
  const { id } = route.params;
  const [isLoaded, setIsLoaded] = useState(false);
  const [share, setShare] = useState(false);
  const [isBookmark, setBookmark] = useState('');
  const [item, setItem] = useState([]);
  const [isLogged, setisLogged] = useState('');
  const [gallery, setGallery] = useState([]);

  const onChangeScreen = (screen) => {
    navigation.navigate(screen);
  };

  const onClickSingleCategory = (id, title) => {
    props.navigation.navigate('singlecategory', {id, title});
  };

  const onClickSingleLocation = (id, title) => {
    props.navigation.navigate('singlelocation', {id, title});
  };

  const onClickSingleStore = (id, title) => {
    props.navigation.navigate('singlestore', {id, title});
  };

  const onClickComments = (id) => {
    props.navigation.navigate('comments', {id});
  };

  const openShare = () => {
    setShare(true);
  }

  const closeShare = () => {
    setShare(false);
  }

  const renderBookMark = async (UserId, itemId) => {

  checkLike(UserId, itemId).then(token => {
    if (token === 'true') {
      setBookmark(true);
    }
  });

 };

 const saveBookmark = async (UserId, itemId) => {
      setBookmark(true);
      submitLike(UserId, itemId);
};

const removeBookmark = async (UserId, itemId) => {
      setBookmark(false);
      submitUnLike(UserId, itemId);
};

const checkLogged = async () => {
  const response = await getLogged();
  setisLogged(response);
}

useEffect(() => {
  checkLogged();
}, [isFocused]);

const renderButtonFav = () => {

  if (!isBookmark) {
    if (isLogged === "true") {
      return (<IconButton color='white' icon="heart-outline" size={24} animated={true} onPress={() => saveBookmark(userInfo.user_id, item.id)}/>)
    }else{
      return (<IconButton color='white' icon="heart-outline" size={24} animated={true} onPress={() => onChangeScreen("login")}/>)}
    }else{
      return (<IconButton color='red' icon="heart" color={"red"} size={24} animated={true} onPress={() => removeBookmark(userInfo.user_id, item.id)}/>)
    }
}

const rightButtons = () => {
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
    <IconButton icon="share-variant" color='white' size={24}  style={{marginHorizontal: 0}} onPress={() => openShare()}/>
    {renderButtonFav()}
    </View>
    )
};

useEffect(() => {

  props.navigation.setOptions({
    headerTintColor: '#ffffff',
    headerTitleStyle: { opacity: headerOpacity },
    headerRight: () => rightButtons(),
    headerBackground: () => (
      <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        opacity: headerOpacity,
        backgroundColor: 'rgba(0,0,0,0.4)'
      }}
      />
      ),
  });


}, [headerOpacity]);

useEffect(() => {
      checkLogged();
}, []);

useEffect(() => {

  getGalleryByDeal(id).then(response => {
    setGallery(response);
  })

}, []);

useEffect(() => {

  getDealById(id).then(response => {
      setItem(response[0]);
      renderBookMark(userInfo.user_id, id);
      setIsLoaded(true);
  })

}, [isBookmark]);

//Adding Featured Image to Gallery
const images = [{url: item.image},...gallery];

      if (isLoaded) {

        if(item.exclusive === 1 && isLogged === "false"){

          return (
            <ExclusiveContent/>
            );

        }else{

          return (
            <View style={{flex: 1}}>
  
            <Animated.ScrollView
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: yOffset,
                      },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
  
           <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={Styles.singleOverlay}/>
           
           <HeaderGallery images={images}/>
  
           <View style={Styles.singleContent}>
  
           <View style={{flexDirection: 'row'}}>
  
            {item.exclusive ? <View style={Styles.singleBadge1}>
              <Icon name="crown" color="#000" size={12}></Icon>
              <Text style={Styles.singleBadge1Text}>{Strings.ST29}</Text>
              </View> : null}
  
            {item.rating >= 4.5 ? <View style={Styles.singleBadge2}>
              <Icon name="star-circle" color="#f1c40f" size={12}></Icon>
              <Text style={Styles.singleBadge2Text}>{Strings.ST47}</Text>
            </View> : null}
  
          </View>
  
           <Text style={Styles.singleTitle}>{item.title}</Text>
           {item.tagline ? <Text style={Styles.singleSubTitle}>{item.tagline}</Text> : null}
  
           <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            {item.oldprice ? <Text style={Styles.singleOldPrice} numberOfLines={1}>{item.oldprice}</Text> : null}
            {item.price ? <Text style={Styles.singlePrice} numberOfLines={1}>{item.price}</Text> : null}
            {item.discount ? <View style={Styles.singleDiscountView}>
            <Text style={Styles.singleDiscountText} numberOfLines={1}>{item.discount}</Text>
            </View>
            : null}
            </View>
  
            {item.countdown || item.id == 1 || item.id == 8 ? <CountDown finishDate={item.countdown}/> : null}
  
            <Divider style={{marginVertical:20}}/>
  
            <HTMLView value={"<div>"+ item.description +"</div>"} stylesheet={theme === "dark" ? HTMLStylesDark : HTMLStyles}/>
  
            <Divider style={{marginVertical:20}}/>
  
            <ScrollView
            style={{width: '100%'}}
            contentContainerStyle={{ flexGrow: 1, paddingRight: 20 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
  
            {item.category ? <Button icon="tag-outline"
            compact={true}
            uppercase={false}
            theme={{ roundness: 30 }}
            style={{elevation:0}}
            labelStyle={{letterSpacing:0}}
            contentStyle={{letterSpacing:0, paddingHorizontal: 10}}
            mode="outlined"
            onPress={() => onClickSingleCategory(item.category_id, item.category)}>
                {item.category}
            </Button> : null}
  
            {item.store ? <Button icon="storefront-outline"
            compact={true}
            uppercase={false}
            theme={{ roundness: 30 }}
            style={{elevation:0, marginLeft: 10}}
            labelStyle={{letterSpacing:0}}
            contentStyle={{letterSpacing:0, paddingHorizontal: 10}}
            mode="outlined"
            onPress={() => onClickSingleStore(item.store_id, item.store)}>
                {item.store}
            </Button> : null}
  
            {item.location ? <Button icon="map-marker-outline"
            compact={true}
            uppercase={false}
            theme={{ roundness: 30 }}
            style={{elevation:0, marginLeft: 10}}
            labelStyle={{letterSpacing:0}}
            contentStyle={{letterSpacing:0, paddingHorizontal: 10}}
            mode="outlined"
            onPress={() => onClickSingleLocation(item.location_id, item.location)}>
                {item.location}
            </Button> : null}
  
            </ScrollView>
  
            <Divider style={{marginVertical:20}}/>
  
            <TouchableOpacity activeOpacity={0.7} onPress={() => onClickComments(item.id)}>
            <Grid style={{alignItems:'center'}}>
              {item.rating ? <Col size={20}>
              <Text style={{fontSize:38, alignSelf:'center', fontWeight: 'bold', marginTop:7}}>{item.formatrating}</Text>
              </Col> : null}
              <Col size={60}>
              <Rating rate={item.rating}/>
              <Text style={{marginTop: 5, color:'#999'}}>{item.total_reviews} {Strings.ST54}</Text>
              </Col>
              <Col size={20}>
              <IconButton color={'#999'} size={26} style={{alignSelf:'flex-end'}} icon={'pencil-plus'}/>
              </Col>
            </Grid>
            </TouchableOpacity>
  
           <View style={{height: 100}}></View>
  
           </View>
  
            <ShareModal isVisible={share} closeModal={closeShare} itemData={item}/>
  
           </Animated.ScrollView>
  
            <View style={{position: 'absolute', bottom: 15, left: 0, right: 0, marginHorizontal: 20}}>
            <Button icon="cart" uppercase={false} theme={{ roundness: 30 }} style={{elevation:0}} labelStyle={{letterSpacing:0, fontSize:16, fontWeight: 'bold'}} contentStyle={{paddingVertical: 7, elevation: 0}} mode="contained" onPress={() => Linking.openURL(item.link)}>
                {Strings.ST53}
            </Button>
            </View>
  
            </View>
  
  
             );

        }

     }else{
       return (
         <AppLoading/>
         );
     }

   }


