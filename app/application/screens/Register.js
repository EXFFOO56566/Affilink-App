import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Alert, TouchableOpacity, Image } from 'react-native';
import { Text, TextInput, Button, Checkbox } from 'react-native-paper';
import Styles from '../config/Styles';
import { signUpApi, checkUserApi, setLogged } from "../config/DataApp";
import ColorsApp from '../config/ColorsApp';
import Strings from '../config/Strings';
import usePreferences from '../hooks/usePreferences';

export default function Register(props) {

  const {theme} = usePreferences();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  const register = async () => {

    setLoading(true);

    if (name, email, password, checked != false) {

      await signUpApi(name, email, password).then(response => {

        if (response === 'success') {

        checkUserApi(email).then(data => {
              setLoading(false);
              setLogged(true);
              props.navigation.navigate('login');
        });

        }else if(response === 'exist'){

          setLoading(false);
          Alert.alert(Strings.ST104, Strings.ST36);

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

    <SafeAreaView style={Styles.AuthPage}>
    <Image source={theme === "dark" ? require('../../assets/logo-white.png') : require('../../assets/logo.png')} resizeMode={"contain"} style={Styles.AuthLogo} />

    <View style={Styles.AuthContent}>

    <TextInput label={Strings.ST18} onChangeText={text => setName(text)} mode="outlined" style={Styles.AuthInput} />
    <TextInput label={Strings.ST19} onChangeText={text => setEmail(text)} mode="outlined" autoCapitalize="none" style={Styles.AuthInput} />
    <TextInput label={Strings.ST20} onChangeText={text => setPassword(text)} mode="outlined" secureTextEntry={true} style={Styles.AuthInput} />
    <View style={{justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
    <Checkbox.Android color={ColorsApp.PRIMARY} uncheckedColor={"#b9b9b9"} status={checked ? 'checked' : 'unchecked'} onPress={() => { setChecked(!checked); }} />
    <TouchableOpacity activeOpacity={0.8} onPress={() => onChangeScreen("terms")}>
    <Text style={Styles.AuthCheckBoxLabel}>{Strings.ST14}</Text>
    </TouchableOpacity>
    </View>
    <Button mode="contained" onPress={()=> register()} style={Styles.AuthButton} contentStyle={Styles.AuthButtonContent} labelStyle={Styles.AuthButtonLabel}>
    {!loading ? Strings.ST17 : Strings.ST31}
    </Button>

    <View style={Styles.AuthBottomContent}>
    <TouchableOpacity activeOpacity={0.9} onPress={() => onChangeScreen('login')}>
    <Text style={Styles.AuthBottomText}>
    {Strings.ST13} <Text style={{fontWeight: 'bold'}}>{Strings.ST34}</Text>
    </Text>
    </TouchableOpacity>
    </View>

    </View>
    </SafeAreaView>

    );
}
