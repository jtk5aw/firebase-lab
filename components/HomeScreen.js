import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import MonthCalender from './MonthCalendar'
import CaroselView from './CaroselView'
import DayCalendar from './DayCalendar'
import MapScreen from './MapScreen'
import { LinearGradient } from 'expo-linear-gradient';
import moment from "moment";

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseApp from '../FirebaseWrapper.js'

import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler';

//Keep the data at the highest level and then 
//have it flow to lower sub components. 

//converted to functional component 
export default function HomeScreen(props) {
  var database = firebase.database()
  this.ref = database.ref('default')
  const dbh = firebase.firestore();
  const invitesRef = dbh.collection('invites');
  let docAllEvents = invitesRef.doc('all-events');

  //Screen really only has two states
  //Month and events 
  const [month, setMonth] = useState(new Date().getMonth());  
  var [events, setEvents] = useState([]);

  // let observer = docAllEvents.onSnapshot(function(snapshot) {
  //   console.log('in snapshot')
  //   test = {...snapshot.data()}
  //   console.log(test)
  //   // setEvents(
  //   //   snapshot.data().parseObject
  //   // )
  // });

    // .onSnapshot(docSnapshot => {
    //   console.log('Received doc snapshot', docSnapshot.data());
    //   setEvents(
    //     docSnapshot.data().parseObject
    //   )
    // }, err => {
    //   console.log('Encountered error');
    // });

  //Hook The fires on onmount and gets data 
  useEffect(() => {
      const fetchData = async () => {
        let response = await fetch(
          'https://www.cs.virginia.edu/~dgg6b/Mobile/ScrollLabJSON/cards.json'
        );
        let parseObject = await response.json();
        let parseObjectAfter = parseObject.map((event, index) => {
          event.id = index
          return event
        })
        docAllEvents.set({
          parseObject
        })
        docAllEvents.get().then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            setEvents(
              doc.data()
            )
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
      };
      // Calling the function
      fetchData();
    },[]);
    

  //Method That Filters Events
  //This methods returns the events for a specific month
  function eventsForMonth(events, month){    
    if(events.parseObject) {
      return events.parseObject.filter((event)=>{
        //Get Month check to see if matches
        eventDate = moment(event.date, "DD-MM-YYYY hh:mm:ss")
        return eventDate.month() === month 
            & event.accepted === true ? true : false
      })
    }
    return []
  }

  //Method For setting MonthState 
  function callBackForSettingMonth(monthID){
    //Remember these will get merged into a single object
    setMonth(monthID)
  }

  //Methods for accepting invitation
  function acceptInvitation(eventID){
    docAllEvents.set({
      'parseObject': events.parseObject.map(event => {
        if (event.id === eventID) event.accepted = true
        return event
      })
    })
    docAllEvents.get().then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        setEvents(
          doc.data()
        )
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  }

  //Methods for declining invitation
  function declineInvitation(eventID){
    docAllEvents.set({        
      'parseObject': events.parseObject.filter(event => {
        return event.id === eventID ? false : true
      })
    })
    docAllEvents.get().then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        setEvents(
          doc.data()
        )
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  }

  //Method that filters Events Pending
  function eventsPending(events){
    if(events.parseObject) {
      return events.parseObject.filter(event => {
          return event.accepted === undefined ? true : false
      })
    }
    return []
  }


  return (
    <View style={styles.container}>
        <View style={{height: 40, width: "100%"}}/>
        <LinearGradient
            colors={['#FFFFFF', '#D3DAEB', '#FFFFFF']}>
            <MonthCalender 
            selectedMonth = {month}
            monthData ={monthData}
            callBackOnPress = {callBackForSettingMonth}
            />
            <CaroselView 
                eventsData = {eventsPending(events)}
                acceptInvitationCallBack = {acceptInvitation} 
                declineInvitationCallBack = {declineInvitation}
                navigation= {props.navigation}
                />
            <DayCalendar eventsForMonth = {eventsForMonth(events, month)} month= {month}/>
        </LinearGradient>
    </View>
  );
}


//Month Data Ideally we would fetch this to allow for internationization
const monthData = [
        {
          label: "January"
        }, 
        {
          label: "Feburary"
        }, 
        {
          label: "March"
        }, 
        {
          label: "April"
        }, 
        {
          label: "May"
        }, 
        {
          label: "June"
        }, 
        {
          label: "July"
        }, 
        {
          label: "August"
        }, 
        {
          label: "Setember"
        }, 
        {
          label: "October"
        }, 
        {
          label: "November"
        }, 
        {
          label: "December"
        } 
    ]


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  }
});
