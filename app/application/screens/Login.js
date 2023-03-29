import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import Styles from '../config/Styles';
import Strings from '../config/Strings';
import { signInApi, setUserData, setLogged } from "../config/DataApp";
import UserContext from '../context/UserContext';
import usePreferences from '../hooks/usePreferences';

export default function Login(props) {

    const contextState = useContext(UserContext);
	  const {theme} = usePreferences();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeScreen = (screen) => {
        props.navigation.navigate(screen);
    };

  const login = async () => {

    setLoading(true);
    
    if (email, password) {

        signInApi(email, password).then(response => {
              
              if (response != 'error' && response != 'incomplete') {
                setUserData(response);
                contextState.updateValue(response[0]);
                setLoading(false);
                setLogged(true);
                props.navigation.goBack();

              }else if(response === 'error'){

                setUserData([]);
                setLoading(false);
                setLogged(false);
                Alert.alert(Strings.ST104, Strings.ST32);

              }else if(response === 'incomplete'){
                setLoading(false);
                Alert.alert(Strings.ST104, Strings.ST33);
              }

        });

      }else{
            setLoading(false);
            Alert.alert(Strings.ST104, Strings.ST33);
          }
      }

      return (


        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <View style={Styles.AuthPage}>

        <Image source={theme === "dark" ? require('../../assets/logo-white.png') : require('../../assets/logo.png')} resizeMode={"contain"} style={Styles.AuthLogo} />

        <View style={Styles.AuthContent}>

        <TextInput label={Strings.ST19} onChangeText={text => setEmail(text)} mode="outlined" autoCapitalize="none" style={Styles.AuthInput} />
        <TextInput label={Strings.ST20} onChangeText={text => setPassword(text)} mode="outlined" secureTextEntry={true} style={Styles.AuthInput} />
        <TouchableOpacity activeOpacity={0.9} onPress={() => onChangeScreen('forgot')}>
        <Text style={Styles.ForgotPass}>{Strings.ST15}</Text>
        </TouchableOpacity>
        <Button mode="contained" onPress={()=> login()} style={Styles.AuthButton} contentStyle={Styles.AuthButtonContent} labelStyle={Styles.AuthButtonLabel}>
        {!loading ? Strings.ST17 : Strings.ST31}
        </Button>

        <View style={Styles.AuthBottomContent}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => onChangeScreen('register')}>
        <Text style={Styles.AuthBottomText}>
        {Strings.ST12} <Text style={{fontWeight: 'bold'}}>{Strings.ST35}</Text>
        </Text>
        </TouchableOpacity>
        </View>

        </View>
        </View>
        </SafeAreaView>


        );
  }
