import React, { useState, useContext } from 'react';
import { View, Alert, ScrollView} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { submitComment } from "../config/DataApp";
import UserContext from '../context/UserContext';
import StarRating from 'react-native-star-rating';
import Strings from "../config/Strings";
import Icon from 'react-native-vector-icons/Ionicons';
import usePreferences from '../hooks/usePreferences';

export default function SubmitComment(props) {

  const { route } = props;
  const { navigation } = props;
  const { id } = route.params;

  const {theme} = usePreferences();

  const userState = useContext(UserContext);
  const userInfo = userState.user;

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(3);
  const [body, setBody] = useState('');

  const goBack = () => {
    props.navigation.goBack();
  };

  const postComment = async () => {

    setLoading(true);

    if (id, body, userInfo, rating) {

      submitComment(id, userInfo.user_id, rating, body).then(response => {

        if (response === 'submitted') {

          setLoading(false);
          
          Alert.alert(Strings.ST57);

          setTimeout(function() {
            goBack();
          }, 1500);

        }else if(response === 'already') {

          setLoading(false);
          Alert.alert(Strings.ST104, Strings.ST56);

        }else{

          setLoading(false);
          Alert.alert(Strings.ST104, Strings.ST32);

        }
      });

    }else{
      setLoading(false);
      Alert.alert(Strings.ST104, Strings.ST33);
    }
  }

  return (
    <ScrollView contentContainerStyle={{flex: 1, justifyContent:'center'}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

    <View style={{marginHorizontal: 20}}>

    <Icon name="chatbubble-ellipses-outline" color={theme === "dark" ? '#fff' : '#000'} size={100} style={{alignSelf:'center', marginBottom: 30}}/>

      <StarRating
          disabled={false}
          maxStars={5}
          rating={rating}
          emptyStar={'ios-star-outline'}
          fullStar={'ios-star'}
          halfStar={'ios-star-half'}
          iconSet={'Ionicons'}
          containerStyle={{marginBottom: 10, alignSelf:'center'}}
          starSize={40}
          emptyStarColor={theme === "dark" ? 'rgba(255,255,255,0.3)' : '#eee'}
          fullStarColor={'#f1c40f'}
          selectedStar={(value) => setRating(value)}
      />

      <TextInput
      placeholder={Strings.ST103}
      onChangeText={text => setBody(text)}
      value={body}
      multiline={true}
      mode="outlined"
      style={{backgroundColor: theme === "dark" ? '#000' : '#fff'}}
      outlineColor={theme === "dark" ? 'rgba(255,255,255,0.3)' : '#eee'}
      activeOutlineColor={theme === "dark" ? 'rgba(255,255,255,0.3)' : '#eee'}
      autoCapitalize="none" />

      <Button uppercase={false} style={{elevation:0, marginTop: 15}} labelStyle={{letterSpacing:0, fontSize:16, fontWeight: 'bold'}} contentStyle={{paddingVertical: 7, elevation: 0}} mode="contained" onPress={()=> postComment()}>
      {!loading ? Strings.ST96 : Strings.ST31}
      </Button>

      </View>
      </ScrollView>

    );
}
