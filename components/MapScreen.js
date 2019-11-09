import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Text, View, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import moment from "moment";
import back from '../assets/icons/icons8-back-64.png'

export default function MapScreen(props){
    let imageBase =
    'https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/Images/';

    function formatDate(date) {
        return date.format('dddd Do MMMM - h:mm a')
    }

    const id =  props.navigation.getParam('id', -1);
    const pic = props.navigation.getParam('pic', '1.png');
    const name = props.navigation.getParam('name', 'Fake Name')
    const date = props.navigation.getParam('date', new Date())

    return (
    <View style={styles.container}>
        <TouchableOpacity onPress = {() => props.navigation.goBack()}>
            <Text>Go Back</Text>
        </TouchableOpacity>
        <View style={styles.topSection}>
        <Image
            style={styles.profileImage}
            source={{ uri: imageBase + pic }}
        />
        <TouchableWithoutFeedback onPress = {() => props.navigation.navigate('Map')}>
            <View style={styles.textSection}>
            <Text>{name}</Text>
            <Text>{formatDate(moment(date, "DD-MM-YYYY hh:mm:ss"))}</Text>
            </View>
        </TouchableWithoutFeedback>
        </View>
        <View style={styles.buttomSection}>
        <TouchableOpacity
            // onPress={() => props.declineInvitationCallBack(id)}
            style={styles.buttonStyle}>
            <Text
            style={{
                fontFamily: 'Helvetica',
                fontSize: 14,
                color: '#FF3B3B',
            }}>
            X Decline
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            // onPress={() => props.acceptInvitationCallBack(id)}
            style={styles.buttonStyle}>
            <Text
            style={{
                fontFamily: 'Helvetica',
                fontSize: 14,
                color: '#38D459',
            }}>
            ✓ Accept
            </Text>
        </TouchableOpacity>
        </View>
        <MapView style={styles.mapStyle} 
                initialRegion={{
                    latitude: 38.0356,
                    longitude: -78.5034,
                    latitudeDelta: 0.0050,
                    longitudeDelta: 0.0050,
                  }}>
            <Marker coordinate={{
                            latitude: 38.0341, 
                            longitude: -78.4994
                    }}
                    title={'Desination'}></Marker>
            <Marker coordinate={{
                            latitude: 38.0346,
                            longitude: -78.5045
                    }}
                    title={'Start'}>
                    </Marker>
        </MapView>
    </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        shadowColor: 'grey',
        height: 250,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        marginTop: 50,
        marginRight: 10,
        marginLeft: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        margin: 10,
    },
    topSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: 50,
    },
    buttonStyle: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttomSection: {
        flexDirection: 'row',
        borderTopColor: '#D8D8D8',
        borderTopWidth: 1,
        height: 52,
        width: '100%',
    },
    mapStyle: {
        position: 'absolute',
        top: 300,
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').height - 400,
    },
});