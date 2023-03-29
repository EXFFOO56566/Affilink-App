import React from 'react';
import {View, I18nManager} from 'react-native';
import Styles from '../config/Styles';
import { Text } from 'react-native-paper';
import moment from 'moment';
import CountDownTimer from './CountDownTimer';
import Strings from "../config/Strings";

export default function CountDown(props) {

    const {finishDate} = props;
    
    var seconds = moment(finishDate).valueOf();

    return(
        <View style={{
          backgroundColor:'#fff7f7',
          borderWidth: 1,
          borderColor: '#ffc1c3',
          paddingVertical: 15,
          borderRadius:6,
          alignItems:'center',
          marginTop: 16
          }}>
          <Text style={{marginBottom: 10, fontSize:16, fontWeight:'bold', color:'red'}}>Hurry Up, End Soon!</Text>
          <CountDownTimer
          until={seconds}
          digitStyle={{backgroundColor: 'transparent', height: 30}}
          timeLabels={{d: Strings.ST49, h: Strings.ST50, m: Strings.ST51, s: Strings.ST52}}
          size={22}
          showSeparator={true}
          separatorStyle={{fontSize:12, marginHorizontal: 5, marginTop: -4}}
          />
        </View>
    );
}