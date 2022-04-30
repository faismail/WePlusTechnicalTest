import React, { useState, useEffect, } from 'react';
import { StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Card, CardItem, Container, Text, Form, View, Textarea, Picker, Col, Icon, Button} from 'native-base';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { weplus } from '../../Assets/Images/index';

const StartedPage = ({ navigation }) => {

  return (
    <Container style={styles.container}>
        <Col style={{  justifyContent:'center', alignSelf:'center',  }}>  
                <TouchableOpacity onPress={()=>navigation.replace('Form')}>
                    <Image style={styles.logoStyle} source={weplus} />
                </TouchableOpacity>     
        </Col>
    </Container>
  );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor:'white',
        justifyContent: 'center',
    },

    logoStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: RFPercentage(60),
        height: RFPercentage(30),
        },

    buttonText: {
        fontFamily: 'Avenir Next',
        fontSize: RFValue(25, 680),
        color: 'red',
        textAlign: 'center',
        marginTop:'10%'
    },
});

export default StartedPage;