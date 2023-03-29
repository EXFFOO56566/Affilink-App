import React from 'react';
import ConfigApp from '../config/ConfigApp';
import Home1 from './Home1';
import Home2 from './Home2';
import Home3 from './Home3';

export default function Home(props) {

if(ConfigApp.HOMESTYLE === "home1"){
  return(
    <Home1/>
    )
}else if(ConfigApp.HOMESTYLE === "home2"){
  return(
    <Home2/>
    )
}else if(ConfigApp.HOMESTYLE === "home3"){
  return(
    <Home3/>
    )
}

   }

