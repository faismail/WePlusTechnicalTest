import React, {Component, useEffect, useState} from 'react';
import {
  View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { Container, Content, Grid, Col, Card, Icon} from 'native-base';
import {RFValue, RFPercentage } from "react-native-responsive-fontsize";
import LinearGradient from 'react-native-linear-gradient';
import { CommonActions } from '@react-navigation/native';

const Profile = ({route, navigation}) => {

    const { Profile } = route.params;
    const [isLoading, setIsLoading] = useState(false);

    const monthNames = ['Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
    ];

    const DayName = [ "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu"
    ];


    const convertWaktuTanggal = (waktu) => {
      if (waktu) {
        let hari = new Date(waktu).getDay();
        let jam =
          new Date(waktu).getHours() < 10
            ? "0" + new Date(waktu).getHours()
            : new Date(waktu).getHours();
        let menit =
          new Date(waktu).getMinutes() < 10
            ? "0" + new Date(waktu).getMinutes()
            : new Date(waktu).getMinutes();
        let detik =
          new Date(waktu).getSeconds() < 10
            ? "0" + new Date(waktu).getSeconds()
            : new Date(waktu).getSeconds();
        let date = new Date(waktu).getDate();
        let month = new Date(waktu).getMonth();
        let year = new Date(waktu).getFullYear();
  
        return `${DayName[hari]}, ${date} ${monthNames[month]} ${year}`;
      } else {
        return "--:--:--";
      }
    };
  
    const goBack = () => {
      navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                { name: 'Form' },
            ],
        })
        );
    }


  return (
    <View style={styles.container}>
        <Col style={styles.Box} >
            <LinearGradient useAngle={true}
                            angle={136}
                            colors={['#D0C1C1' , '#F50303',]}
                            locations={[0,1]}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            style={styles.CardProfile}>

                          <View style={{marginLeft:'5%', height:'10%', flexDirection:'row',  alignItems:'center', justifyContent:'center',    }}>
                            <Text style={[styles.TitleText, {flex:2}]}> PROFILE </Text>
                            
                            <TouchableOpacity style={{flex:1 , marginLeft:'1%', marginTop:'2%',  alignItems:'center'}} onPress={() => goBack()}>
                              <Icon type='FontAwesome' name="home" style={{fontSize:RFValue(30, 680), marginLeft:'5%', marginRight:'3%', alignSelf:'center', color:'black'}}/>
                            </TouchableOpacity>
                          </View>

            
                          <View style={{height:'80%', marginLeft:'5%', marginTop:'3%', flexDirection:'column', justifyContent:'space-evenly' }}>
                            
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                              <Text style={styles.TitleText}>Nama :</Text>
                              <Text style={styles.ContentText}>{Profile.Name}</Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                              <Text style={styles.TitleText}>Email : </Text>
                              <Text style={styles.ContentText}>{Profile.Email}</Text>

                            </View>

                            <View style={{flexDirection:'row'}}>
                              <Text style={styles.TitleText}>KTP : </Text>
                              <Text style={styles.ContentText}>{Profile.KTP}</Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                              <Text style={styles.TitleText}>Tanggal Lahir : </Text>
                              <Text style={styles.ContentText}>{(Profile.birthDate) === "1970-01-01" ? " " : convertWaktuTanggal(Profile.birthDate)}</Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                              <Text style={styles.TitleText}>No Telp : </Text>
                              <Text style={styles.ContentText}>{Profile.Phone === "08" ? " " : Profile.Phone} </Text>
                            </View>

                            <View style={{flexDirection:'row', width:RFPercentage(30), height:RFPercentage(10), }}>
                              <Text style={styles.TitleText}>Alamat : </Text>
                              <Text style={styles.ContentText}>{Profile.Address}</Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                              <Text style={styles.TitleText}>Jenis Kelamin : </Text>
                              <Text style={styles.ContentText}>{Profile.selectedGender}</Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                              <Text style={styles.TitleText}>Provinsi : </Text>
                              <Text style={styles.ContentText}>{Profile.selectedProvinsi}</Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                              <Text style={styles.TitleText}>Kota : </Text>
                              <Text style={styles.ContentText}>{Profile.selectedKota}</Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                              <Text style={styles.TitleText}>Kecamatan : </Text>
                              <Text style={styles.ContentText}>{Profile.selectedKecamatan}</Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                              <Text style={styles.TitleText}>Kelurahan : </Text>
                              <Text style={styles.ContentText}>{Profile.selectedKelurahan}</Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                              <Text style={styles.TitleText}>Kode POS : </Text>
                              <Text style={styles.ContentText}>{Profile.Postal}</Text>
                            </View>
                          </View>
            </LinearGradient>
        </Col>          
    </View>
)};

const styles = StyleSheet.create({

container: {
  flex: 1,
  padding: 5,
  backgroundColor: '#DCECF6',
  },

Box: {
  width: '100%',
  height: '100%',
  padding: 5,
  alignItems:'center',

},

CardProfile: {
  width: '100%',
  height:'80%',
  marginTop:'15%', 
  alignSelf:'center',
  borderRadius:8, 
  borderWidth:1,
  borderColor:'rgba(104, 148, 181, 0.5)', 
},

TitleText:{
  fontFamily: 'Avenir Next',
  fontWeight: '600',
  fontSize: RFValue(20,680),
  color:'black',
},

ContentText:{
  fontFamily: 'Avenir Next',
  fontWeight: '500',
  fontSize: RFValue(18,680),
  color:'black',
  justifyContent:'center',
  marginLeft:'1%',
  marginTop:'1%'
  
},

});

export default Profile;