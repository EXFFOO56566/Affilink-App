import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import AppLoading from '../components/AppLoading';
import {getComments} from "../config/DataApp";
import { map } from "lodash";
import Styles from '../config/Styles';
import { Text, IconButton, Avatar, Card, Paragraph } from 'react-native-paper';
import LoadMoreButton from '../components/LoadMoreButton';
import Rating from '../components/Rating';
import Strings from "../config/Strings";

export default function Comments(props) {

  const { route } = props;
  const { navigation } = props;
  const { id } = route.params;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {

    getComments(id, page).then((response) => {
        setItems(response);
        setIsLoaded(true);
    });
		
    });

    return unsubscribe;

  }, [navigation]);

  const onSubmitComment = (id) => {
    props.navigation.navigate('submitcomment', {id, comment: null});
  };

  const rightButton = () => {
    return (
      <IconButton icon="plus" color='white' size={24} onPress={() => onSubmitComment(id)}/>
      )
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => rightButton(),
    });
  }, []);

  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    getComments(id, page+1).then((response) => {

      if (!items) {
        setItems(response);
        setLoading(false);
      }else{
        setItems([...items, ...response]);
        setLoading(false);
      }

      if (response.length <= 0) {
        setshowButton(false);
      }

      setIsLoaded(true);

    });

  };

  const renderButton = () => {

    return (
      <LoadMoreButton
      Indicator={loading}
      showButton={showButton}
      Items={items}
      Num={10}
      Click={() => loadMore()}/>
      )
  }

  if (isLoaded) {

      return(

    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
    <View style={Styles.CommentsScreen}>

        {items && items.length ? null : <Text style={{alignSelf: 'center', marginTop: 20, opacity: 0.3}}>{Strings.ST90}</Text>}

        {map(items, (item, i) => (

  <View key={i}>
  <Card style={{marginBottom: 20, borderColor: 'rgba(0,0,0,0.05)', borderWidth: 1, elevation: 0}}>
    <Card.Title
    title={item.user_name}
    titleStyle={{fontSize: 16}}
    subtitleStyle={{marginTop: -6, opacity:0.6}}
    subtitle={item.created}
    left={props => <Avatar.Image size={45} source={{uri: item.user_avatar}} />} />
    {item.body ? <Card.Content style={{paddingBottom: 15}}>
      <Paragraph>{item.body}</Paragraph>
    </Card.Content> : null}
    <View activeOpacity={0.6} style={{position: 'absolute', top: 10, right: 10}}>
    <Rating rate={item.rating}></Rating>
    </View>
  </Card>

  </View>

          ))}

        {renderButton()}

    </View>

    <View style={{height: 80}}></View>

    </ScrollView>

        );

  }else{
   return (
     <AppLoading/>
     );
 }
 
}

