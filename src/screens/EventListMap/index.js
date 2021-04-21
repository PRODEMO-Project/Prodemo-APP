import { scaleHeight, scaleWidth } from '@utils/size'
import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapView from 'react-native-map-clustering'
import { countryCoords } from '@utils/data'
import getStorageData from '@utils/storage'
import EventPreview from '@components/EventPreview'
import SvgLocation from '@svgs/SvgLocation'
import ROUTES from '@utils/routes'
import useServerFunctions from '@hooks/useServerFunctions'
import { StorageContext } from '@context/StorageContext'

function EventListMap({ navigation }) {
  const { GETrequest } = useServerFunctions()
  const { userOptions, notificationStatus } = useContext(StorageContext)
  const _map = useRef()
  const [mapEvents, setMapEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 12.5,
    longitudeDelta: 0,
  })

  const getEvents = () => {
    const fetchEvents = async () => {
      const response = await GETrequest(
        userOptions.country_str,
        userOptions.language,
        'events'
      )
      return response
    }
    fetchEvents()
      .then(data => setMapEvents(data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getStorageData()
      .then(data => {
        let coords = countryCoords.find(el => el.country === data.country)
        console.log(coords)
        setRegion({
          latitude: Number(coords.latitude),
          longitude: Number(coords.longitude),
          latitudeDelta: 12.5,
          longitudeDelta: 0,
        })
        setSelectedEvent(null)
        renderMap()
        getEvents()
      })
      .catch(err => console.log(err))
  }, [userOptions])

  useEffect(() => {
    getEvents()
  }, [notificationStatus, userOptions])

  const animateToRegion2 = (e, id) => {
    setSelectedEvent(mapEvents.find(event => event.id === id))
  }

  useEffect(() => {
    Platform.OS === 'ios' && _map?.current?.animateToRegion(region, 0.1)
  }, [region])

  const renderMap = () => {
    if (Platform.OS === 'ios') {
      return (
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={_map}
          style={styles.map}
          loadingEnabled={true}
          showsPointsOfInterest={false}
          showsBuildings={false}
          showsIndoors={false}
          showsIndoorLevelPicker={false}
          initialRegion={region}
        >
          {mapEvents.map((event, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: Number(event.latitude),
                longitude: Number(event.longitude),
              }}
              onPress={e => animateToRegion2(e, event.id)}
            >
              <SvgLocation height={30} width={30} />
            </Marker>
          ))}
        </MapView>
      )
    } else {
      return (
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={_map}
          style={styles.map}
          loadingEnabled={true}
          showsPointsOfInterest={false}
          showsBuildings={false}
          showsIndoors={false}
          showsIndoorLevelPicker={false}
          region={region}
          onRegionChangeComplete={region => {
            setRegion(region)
          }}
        >
          {mapEvents.map((event, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: Number(event.latitude),
                longitude: Number(event.longitude),
              }}
              onPress={e => animateToRegion2(e, event.id)}
            >
              <SvgLocation height={30} width={30} />
            </Marker>
          ))}
        </MapView>
      )
    }
  }

  if (region.latitude === 0) {
    return false
  }

  return (
    <View style={styles.mainContainer}>
      {renderMap()}
      {selectedEvent && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ROUTES.EventSingle, { event: selectedEvent })
          }}
          style={styles.event}
        >
          <EventPreview style={styles.container} event={selectedEvent} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: scaleWidth(375),
    height: '100%',
  },
  event: {
    position: 'absolute',
    bottom: scaleHeight(40),
    left: scaleWidth(20),
    bottom: scaleHeight(25),
  },
  container: {
    width: scaleWidth(280),
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default EventListMap
