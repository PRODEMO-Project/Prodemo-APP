import EventPreview from '@components/EventPreview'
import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native'
import CalendarItem from './components/CalendarItem'
import moment from 'moment'
import ROUTES from '@utils/routes'
import { scaleHeight } from '@utils/size'
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'
import { StorageContext } from '@context/StorageContext'
import useServerFunctions from '@hooks/useServerFunctions'

function EventListCalendar({ navigation }) {
  const { GETrequest } = useServerFunctions()
  const { notificationStatus, userOptions } = useContext(StorageContext)
  const blankEvent = [
    {
      title: '',
      description: '',
      address: '',
    },
  ]

  const [isCalLoading, setIsCalLoading] = useState(true)
  const [markedDays, setMarkedDays] = useState({})
  const [monthEvents, setMonthEvents] = useState([])
  const [selectedEvents, setSelectedEvents] = useState(blankEvent)

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
      .then(data => {
        setMonthEvents(data)
        data.map(event => {
          let date = moment(event.date).format('YYYY-MM-DD')
          setMarkedDays(prev => ({
            ...prev,
            [date]: { marked: true },
          }))
        })
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getEvents()
  }, [notificationStatus])

  useEffect(() => {
    setMarkedDays({})
    getEvents()
  }, [userOptions])

  const onDayPress = data => {
    const events = monthEvents.filter(
      event => moment(event.date).format('YYYY-MM-DD') === data
    )
    if (events.length !== 0) {
      setSelectedEvents(events)
    } else {
      setSelectedEvents(blankEvent)
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.mainContainer}
    >
      <CalendarItem
        onDayPress={onDayPress}
        markedDays={markedDays}
        onMonthChange={() => {}}
      />
      {selectedEvents.map((event, index) => (
        <TouchableOpacity
          key={index}
          style={styles.eventPreview}
          onPress={() => {
            event.title !== '' &&
              navigation.navigate(ROUTES.EventSingle, { event: event })
          }}
        >
          <EventPreview event={event} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  eventPreview: {
    paddingBottom: scaleHeight(16),
  },
  mainContainer: {
    alignItems: 'center',
    paddingBottom: getBottomSpace(),
    paddingTop:
      Platform.OS === 'ios'
        ? getStatusBarHeight() + scaleHeight(70)
        : scaleHeight(90),
  },
})

export default EventListCalendar
