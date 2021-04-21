import React, { useContext, useEffect, useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import useCreateEvent from '@hooks/useCreateEvent'
import { scaleHeight, scaleWidth } from '@utils/size'
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'
import EventPreview from '@components/EventPreview'
import ROUTES from '@utils/routes'
import { StorageContext } from '@context/StorageContext'
import { SpringScrollView } from '@youngtailors/react-native-spring-scrollview'
import { NormalHeader } from '@youngtailors/react-native-spring-scrollview/NormalHeader'
import Modal from 'react-native-modal'
import colors from '@utils/colors'
import fonts from '@utils/fonts'

function EventListUser({ navigation, route }) {
  const { userOptions, labelLang } = useContext(StorageContext)
  const [visible, setVisible] = useState(false)
  const [modalText, setModalText] = useState('')
  const scrollView = useRef(null)
  const { getUserEvents } = useCreateEvent()

  const [userEvents, setUserEvents] = useState([])

  const openCloseModal = (textModal = null) => {
    textModal && setModalText(textModal)
    setVisible(visible ? false : true)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const events = await getUserEvents()
        setUserEvents(events)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [userOptions])

  useEffect(() => {
    console.log(route?.params?.new_event)
    route?.params?.new_event &&
      setUserEvents(prev => {
        let new_array = [...prev]
        new_array.unshift(route.params.new_event)
        return new_array
      })
  }, [route.params])

  return (
    <>
      <SpringScrollView
        ref={scrollView}
        refreshHeader={NormalHeader}
        onRefresh={async () => {
          try {
            const events = await getUserEvents()
            setUserEvents(events)
            events && scrollView.current.endRefresh()
          } catch (error) {
            console.log(error)
          }
        }}
        showsVerticalScrollIndicator={false}
        contentStyle={styles.mainContainer}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate(ROUTES.AddEvent)}
          style={styles.surveyContainer}
        >
          <Text numberOfLines={1} style={[styles.txtTitle, { color: 'white' }]}>
            {labelLang.Menu.AddEvent}
          </Text>
        </TouchableOpacity>
        {userEvents.map((event, index) => {
          if (event.approved) {
            return (
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
            )
          } else if (event.approved === false) {
            return (
              <TouchableOpacity
                key={index}
                style={styles.eventPreview}
                onPress={() =>
                  openCloseModal(event.approved_or_rejected_message)
                }
              >
                <EventPreview event={event} disabled />
              </TouchableOpacity>
            )
          } else {
            return (
              <EventPreview
                style={styles.eventPreview}
                key={index}
                event={event}
                disabled
              />
            )
          }
        })}
      </SpringScrollView>
      <Modal
        animationIn='fadeIn'
        animationOut='fadeOut'
        isVisible={visible}
        backdropOpacity={0.35}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        onBackdropPress={() => openCloseModal()}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalMessage}>{modalText}</Text>
        </View>
      </Modal>
    </>
  )
}

export default EventListUser

const styles = StyleSheet.create({
  surveyContainer: {
    height: scaleWidth(60),
    width: scaleWidth(343),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bluePrimary,
    borderRadius: scaleWidth(16),
    marginBottom: scaleHeight(17),
  },
  txtTitle: {
    fontFamily: fonts.HIND.SemiBold,
    fontWeight: '500',
    fontSize: scaleHeight(20),
    color: colors.oldBurgundy,
    marginTop: scaleHeight(2.5),
  },
  modalContainer: {
    width: scaleWidth(250),
    alignSelf: 'center',
  },
  modalMessage: {
    backgroundColor: colors.pageBackGround,
    borderRadius: 7.5,
    padding: scaleWidth(10),
    marginBottom: scaleHeight(10),
  },
  eventPreview: {
    marginBottom: scaleHeight(16),
  },
  mainContainer: {
    alignItems: 'center',
    paddingBottom: getBottomSpace(),
    paddingTop:
      Platform.OS === 'ios'
        ? getStatusBarHeight() + scaleHeight(150)
        : scaleHeight(150),
  },
})
