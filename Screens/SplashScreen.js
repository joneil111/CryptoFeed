import React, { useEffect, useState } from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../Components/contents';
import { LinearGradient } from 'expo-linear-gradient';


export default function SplashScreen({navigation}) {
    const {signIn} =React.useContext(AuthContext);
    //const [signinReady, setsigninReady] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            signIn();
        }, 3000)
    
      }, [])
        


    return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Animatable.Image
            animation='zoomIn'
          source={require('../assets/DigiCoin.png')}
          style={styles.logo}
          resizeMode='stretch'/>
      </View>
      <Animatable.View style={styles.footer}
            animation='slideInUp'
            
      >
        <Text style={styles.title}>Everything you need to know About Crypto!</Text>
        
      </Animatable.View>
      
      
    </View>
    );
    }

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'black'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#0C8111',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'black',
        fontWeight: 'bold'
    }
  });