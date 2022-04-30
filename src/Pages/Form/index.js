import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity,TextInput, Alert, LogBox , ScrollView} from 'react-native';
import { Card, CardItem, Container, Text, View, Title, Picker, Col, Icon, Item} from 'native-base';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import CalendarPicker from "react-native-calendar-picker";
import Modal, { ModalContent, SlideAnimation } from "react-native-modals";


const Form = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    // const isFocused = useIsFocused();
    const [Name, setName] = useState('');
    const [KTP, setKTP] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('08');
    const [Address, setAddress] = useState('');
    const [Postal, setPostal] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [provinsi, setProvinsi] = useState([]);
    const [kota, setKota] = useState([]);
    const [kecamatan, setKecamatan] = useState([]);
    const [kelurahan, setKelurahan] = useState([]);
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedProvinsi, setSelectedProvinsi] = useState('');
    const [selectedKota, setSelectedKota] = useState('');
    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [selectedKelurahan, setSelectedKelurahan] = useState('');
    const [modalVisible, setModalVisible] = useState(false)
    
    const getProvinsi = async () =>  {
        setIsLoading(true);
        axios.get
        (   
            'https://giuseppenina.ddns.net/postcode/province/',
        {
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
        }
    })
    .then(res => {
        if(res.data.message == 'success'){
            setProvinsi(res.data.data);
            setIsLoading(false);
        } 
    })
    .catch(function(error) {
        console.log(error.message)
      });
    }

    const getKota = async (value) =>  {
        setIsLoading(true);
        axios.get
        (   
            `https://giuseppenina.ddns.net/postcode/city/?province_id=${value}`,
        {
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
        }
    })
    .then(res => {
        if(res.data.message == 'success'){
            setKota(res.data.data);
            setIsLoading(false);
        } 
        
    })
    .catch(function(error) {
        console.log(error.message)
      });
    }

    const getKecamatan = async (value) =>  {
        setIsLoading(true);
        axios.get
        (   
            `https://giuseppenina.ddns.net/postcode/kecamatan/?city_id=${value}`,
        {
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
        }
    })
    .then(res => {
        if(res.data.message == 'success'){
            setKecamatan(res.data.data);
            setIsLoading(false);
        } 
        
    })
    .catch(function(error) {
        console.log(error.message)
      });
    }

    const getKelurahan = async (value) =>  {
        setIsLoading(true);
        axios.get
        (   
            `https://giuseppenina.ddns.net/postcode/kelurahan/?kecamatan_id=${value}`,
        {
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
        }
    })
    .then(res => {
        if(res.data.message == 'success'){
            // console.log(res.data.data)
            setKelurahan(res.data.data);
            setIsLoading(false);
        } 
        
    })
    .catch(function(error) {
        console.log(error.message)
      });
    }

    const getPostal = async (value) =>  {
        console.log(value)
        setIsLoading(true);
        axios.get
        (   
            `https://giuseppenina.ddns.net/postcode/?postcode=${value}`,
        {
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
        }
    })
    .then(res => {
        if(res.data.message == 'success'){
            const response = (res.data.data)
            setSelectedProvinsi(response[0].province)
            getKota(response[0].province_id) + setSelectedKota(response[0].city)
            getKecamatan(response[0].city_id) + setSelectedKecamatan(response[0].kecamatan)
            getKelurahan(response[0].kecamatan_id) + setSelectedKelurahan(response[0].kelurahan)
            setIsLoading(false)
        }
    })
    .catch(function(error) {
        console.log(error.message)
      });
    }

    const showDatePicker = () => {
        setModalVisible(true)
      };
    const CancelModalPicker = () => {
        setSelectedDate(null)
        setModalVisible(false)
    };
    const SubmitDate = () => {
        setModalVisible(false)
    }
    
    const onDateChange = (value, type) => { 
    if (type === "START_DATE") {
        setSelectedDate(value)
        }
    }

    const convertToDate = (tanggal) => {
    let date = new Date(tanggal);
    let year = date.getFullYear();
    let month =
        date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let dayOfMonth =
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return `${year}-${month}-${dayOfMonth}`;
    };

    const birthDate = convertToDate(selectedDate)

    const submitProcess = (  ) => {
        const Profile = {
            Name, KTP, birthDate, Email, Phone, Address, selectedGender, selectedProvinsi, selectedKota,  selectedKecamatan, selectedKelurahan, Postal
        }
        // console.log(Profile)
        navigation.navigate('Profile', {Profile}) 
    }

    useEffect(() => {
        getProvinsi()
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        LogBox.ignoreLogs(['responder.scrollResponderScrollTo is not a function.']);


    }, []);

    return (
        <Container style={styles.container}>
            <ScrollView scrollEnabled={true}>
            <Col style={{ flex:1, justifyContent:'center', alignItems:'center', marginTop:'10%'   }}>  

                <LinearGradient useAngle={true}
                                    angle={136}
                                    colors={['#D0C1C1' , '#F50303',]}
                                    locations={[0,1]}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                    style={styles.register}> 
                    <Text  style={styles.registerText}>
                        Form Pendaftaran
                    </Text>
                </LinearGradient>

                <View style={styles.formInput}>
                    <Icon type="FontAwesome5" name="user" style={{fontSize:RFValue(20, 680), marginLeft:'5%', marginRight:'3%', alignSelf:'center', color:'black' }}/>
                    <TextInput  style={styles.UserTextInput}
                                placeholder="Nama Lengkap"
                                placeholderTextColor = "black"
                                selectionColor="black"
                                spellCheck={false}
                                autoCorrect={false}
                                onChangeText={(value)=>setName(value)}
                                />
                </View>

                <View style={styles.formInput}>
                    <Icon type='FontAwesome5' name="id-card" style={{fontSize:RFValue(20, 680), marginLeft:'5%', marginRight:'3%', alignSelf:'center', color:'black'}}/>
                    <TextInput  style={styles.UserTextInput}
                                autoCapitalize='none'
                                keyboardType='numeric'
                                placeholder="No KTP"
                                maxLength = {16}
                                placeholderTextColor = "black"
                                selectionColor="black"
                                onChangeText={(value)=>setKTP(value)}
                                />
                </View>  

                <TouchableOpacity style={styles.formInput} onPress={showDatePicker}>
                    <Icon type='FontAwesome5' name="calendar" style={{fontSize:RFValue(20, 680), marginLeft:'5%', marginRight:'3%', alignSelf:'center', color:'black'}}/>
                    <Text style={[styles.UserTextInput, {  alignSelf:'center', }]}>
                       {birthDate === "1970-01-01" ? "-" : birthDate}
                    </Text>
                </TouchableOpacity>    

                <Picker
                    note
                    mode="dropdown"
                    placeholder= {"Pilih Gender"}
                    iosIcon= {<Icon regular type="FontAwesome5" name="chevron-down" style={{ fontSize:20 }}/>}
                    placeholderStyle={styles.UserTextInput}
                    style={styles.formInput}
                    textStyle={styles.UserTextInput}
                    selectedValue = { selectedGender }
                    onValueChange = { (value)  => setSelectedGender (value)}
                    >
                        <Picker.Item label="Laki - laki" value="Laki - Laki" />
                        <Picker.Item label="Perempuan" value="Perempuan" />
                </Picker>
                

                <View style={styles.formInput}>
                    <Icon type='FontAwesome5' name="at" style={{fontSize:RFValue(20, 680), marginLeft:'5%', marginRight:'3%', alignSelf:'center', color:'black'}}/>
                    <TextInput  style={styles.UserTextInput}
                                autoCapitalize="none"
                                placeholder="Email"
                                placeholderTextColor = "black"
                                selectionColor="black"
                                onChangeText={(value)=>setEmail(value)}
                                />
                </View>   

                <View style={styles.formInput}>
                    <Icon type='FontAwesome5' name="phone" style={{fontSize:RFValue(20, 680), marginLeft:'5%', marginRight:'3%', alignSelf:'center', color:'black'}}/>
                    <TextInput  style={styles.UserTextInput}
                                value={Phone}
                                placeholder= "  ......" 
                                maxLength = {13}
                                keyboardType='numeric'
                                placeholderTextColor = "black"
                                selectionColor="black"
                                onChangeText={(value)=>setPhone(value)}
                                />
                </View> 

                <View style={styles.formInputAlamat}>
                    <Icon type='FontAwesome5' name="address-book" style={{fontSize:RFValue(20, 680), marginLeft:'5%', marginRight:'3%', alignSelf:'center', color:'black'}}/>
                    <TextInput  style={styles.AlamatTextInput}
                                placeholder="Alamat Lengkap"
                                autoComplete="off"
                                autoCorrect={false}
                                autoCapitalize="none"
                                multiline = {true}
                                numberOfLines = {4}
                                placeholderTextColor = "black"
                                selectionColor="black"
                                onChangeText={(value)=>setAddress(value)}
                                />
                </View> 

                <View style={styles.formInput}>
                    <Icon type='FontAwesome5' name="map-pin" style={{fontSize:RFValue(20, 680), marginLeft:'5%', marginRight:'3%', alignSelf:'center', color:'black'}}/>
                    <TextInput  style={styles.UserTextInput}
                                placeholder="Kode Pos"
                                maxLength = {5}
                                keyboardType='number-pad'
                                placeholderTextColor = "black"
                                selectionColor="black"
                                onChangeText={(value)=> setPostal(value) + getPostal(value)}
                                />
                </View> 

                <Picker
                    note
                    mode="dropdown"
                    placeholder= {"Provinsi"}
                    iosIcon= {<Icon regular type="FontAwesome5" name="chevron-down" style={{ fontSize:20 }}/>}
                    placeholderStyle={styles.UserTextInput}
                    style={styles.formInput}
                    textStyle={styles.UserTextInput}
                    selectedValue = { selectedProvinsi }
                    onValueChange = { (value, index)  => setSelectedProvinsi(value) + getKota(index)}
                    >
                       <Picker.Item textStyle={styles.UserTextInput} label="Pilih Provinsi"  /> 
                        { provinsi.map(value => (
                            <Item key={value.id}
                                label={value.name}
                                value={value.name}
                            />
                        ))}
                </Picker>

                <Picker
                    note
                    mode="dropdown"
                    placeholder= {"Kota"}
                    iosIcon= {<Icon regular type="FontAwesome5" name="chevron-down" style={{ fontSize:20 }}/>}
                    placeholderStyle={styles.UserTextInput}
                    style={styles.formInput}
                    textStyle={styles.UserTextInput}
                    selectedValue = { selectedKota }
                    onValueChange = { (value, index)  => setSelectedKota (value) + getKecamatan(index)}
                    >
                        <Picker.Item textStyle={styles.UserTextInput} label="Pilih Kota"  /> 
                        { kota.map(value => (
                            <Item key={value.id}
                                label={value.name}
                                value={value.name}
                            />
                        ))}
                </Picker>

                <Picker
                    note
                    mode="dropdown"
                    placeholder= {"Kecamatan"}
                    iosIcon= {<Icon regular type="FontAwesome5" name="chevron-down" style={{ fontSize:20 }}/>}
                    placeholderStyle={styles.UserTextInput}
                    style={styles.formInput}
                    textStyle={styles.UserTextInput}
                    selectedValue = { selectedKecamatan }
                    onValueChange = { (value, index)  => setSelectedKecamatan (value) + getKelurahan(index)}
                    >
                        <Picker.Item textStyle={styles.UserTextInput} label="Pilih Kecamatan"  /> 
                        { kecamatan.map(value => (
                            <Item key={value.id}
                                label={value.name}
                                value={value.name}
                            />
                        ))}
                </Picker>

                <Picker
                    note
                    mode="dropdown"
                    placeholder= {"Kelurahan"}
                    iosIcon= {<Icon regular type="FontAwesome5" name="chevron-down" style={{ fontSize:20 }}/>}
                    placeholderStyle={styles.UserTextInput}
                    style={styles.formInput}
                    textStyle={styles.UserTextInput}
                    selectedValue = { selectedKelurahan }
                    onValueChange = { (value)  => setSelectedKelurahan (value)}
                    >
                        <Picker.Item textStyle={styles.UserTextInput} label="Pilih Kelurahan"  /> 
                        { kelurahan.map(value => (
                            <Item key={value.id}
                                label={value.name}
                                value={value.name}
                            />
                        ))}
                </Picker>

                <LinearGradient useAngle={true}
                                angle={136}
                                colors={['#D0C1C1' , '#F50303',]}
                                locations={[0,1]}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                style={styles.buttonSubmit}>    
                    <TouchableOpacity style={{ width:'100%'}} onPress={submitProcess}>
                        <Text style={styles.buttontextSubmit}>
                           Submit
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>   
            </Col>
            </ScrollView>

            <Modal
            style={{  }}
            visible={modalVisible}
            onTouchOutside={CancelModalPicker}
            swipeDirection={["up", "down"]}
            swipeThreshold={200}
            onSwipeOut={CancelModalPicker}
            modalAnimation={
                new SlideAnimation({
                slideFrom: "bottom",
                initialValue: 0,
                useNativeDriver: true,
                })
            }
            >
          <ModalContent style={{}}>
            <Title style={{ marginBottom: 20, }}>Tanggal Lahir</Title>
            <View>
              <CalendarPicker
                onDateChange={onDateChange}
                selectedDayColor="red"
                todayBackgroundColor="skyblue"
              />
            </View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: "8%",
              }}
            >
              <Text style={styles.UserTextInput }>
                Tanggal Lahir : {birthDate === "1970-01-01" ? "-" : birthDate}
              </Text>

            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: "10%",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: RFPercentage(12),
                  height: RFPercentage(5),
                  borderRadius: 20,
                  backgroundColor: "grey",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={CancelModalPicker}
              >
                <Text style={[styles.buttontextSubmit, {color: "black"}]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: RFPercentage(12),
                  height: RFPercentage(5),
                  borderRadius: 20,
                  backgroundColor: "red",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={SubmitDate}
              >
                <Text style={[styles.buttontextSubmit, { color: "black" }]}>
                  Select
                </Text>
              </TouchableOpacity>
            </View>
          </ModalContent>
        </Modal>
        </Container>
      );
}

const styles = StyleSheet.create ({

    container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor:'#DCECF6',
        justifyContent: 'center',
    },

    register: {
        width: RFPercentage(35),
        height: RFPercentage(8),
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#DCECF6',
        borderRadius: 22,
        marginVertical: '5%',
    },
    registerText: {
        fontFamily: 'Avenir Next',
        fontSize: RFValue(22, 680),
        color: 'black',
        textAlign: 'center'
    },

    formInput:{
        width: RFPercentage(46),
        height: RFPercentage(7),
        flexDirection:'row',
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'white',
        borderRadius: 22,
        marginVertical: '3%',
    },

    formInputAlamat:{
        width: RFPercentage(46),
        height: RFPercentage(15),
        flexDirection:'row',
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'white',
        borderRadius: 22,
        marginVertical: '4%',
    },

    UserTextInput: {
        width: RFPercentage(38),
        fontFamily: 'Avenir Next',
        fontSize: RFValue(16, 680),
        color: 'black',
    },

    AlamatTextInput: {
        width:'73%',
        fontFamily: 'Avenir Next',
        fontSize: RFValue(16, 680),
        color: 'black',
        alignSelf:'center'
    },


    buttonSubmit: {
        width: RFPercentage(35),
        height: RFPercentage(6),
        backgroundColor: 'black',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#DCECF6',
        alignSelf:'center',
        marginVertical:'10%',
        borderRadius: 22,
        // marginLeft:'50%'
    },

    
    buttontextSubmit: {
        fontFamily: 'Avenir Next',
        fontSize: RFValue(18, 680),
        color: 'black',
        textAlign: 'center',
        // marginRight:'40%'
    },

});

export default Form
