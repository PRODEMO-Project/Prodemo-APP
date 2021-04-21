import React, { useEffect, useRef, useState, useContext } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import useSurveyFunctions from '@hooks/useSurveyFunctions'
import { SpringScrollView } from '@youngtailors/react-native-spring-scrollview'
import { NormalHeader } from '@youngtailors/react-native-spring-scrollview/NormalHeader'
import { NormalFooter } from '@youngtailors/react-native-spring-scrollview/NormalFooter'
import colors from '@utils/colors'
import { scaleHeight, scaleWidth } from '@utils/size'
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'
import FONTS from '@utils/fonts'
import { StorageContext } from '@context/StorageContext'
import ROUTES from '@utils/routes'
import SurveyPreview from '@components/SurveyPreview'
import SvgLoaderRect from '@svgs/Loaders/SvgLoaderRect'
import { LoginContext } from '@context/LoginContext'
import fonts from '@utils/fonts'

function SurveyList({ navigation }) {
  const [pageCount, setPageCount] = useState(1)
  const { loggedUser } = useContext(LoginContext)
  const { labelLang, userOptions } = useContext(StorageContext)
  const scrollView = useRef(null)
  const { getSurveys } = useSurveyFunctions()
  const [surveyList, setSurveyList] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const list = await getSurveys(pageCount)
        pageCount === 1
          ? setSurveyList(list)
          : setSurveyList(prev => {
              const newArr = [...prev]
              for (let el of list) {
                newArr.push(el)
              }
              return newArr
            })
        list && scrollView.current.endLoading()
      } catch (error) {
        console.log(error)
      }
    })()
  }, [pageCount, userOptions, loggedUser])

  return (
    <SpringScrollView
      ref={scrollView}
      refreshHeader={NormalHeader}
      onRefresh={async () => {
        try {
          const list = await getSurveys()
          setSurveyList(list)
          list && scrollView.current.endRefresh()
        } catch (error) {
          console.log(error)
        }
      }}
      loadingFooter={NormalFooter}
      onLoading={async () => {
        try {
          setPageCount(prev => prev + 1)
        } catch (error) {
          console.log(error)
        }
      }}
      showsVerticalScrollIndicator={false}
      contentStyle={styles.container}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate(ROUTES.AddSurvey)}
        style={styles.surveyContainer}
      >
        <Text numberOfLines={1} style={[styles.txtTitle, { color: 'white' }]}>
          {labelLang.Menu.AddSurvey}
        </Text>
      </TouchableOpacity>
      {surveyList?.length !== 0 ? (
        surveyList?.map((survey, index) => (
          <TouchableOpacity
            activeOpacity={0.75}
            key={index}
            onPress={() =>
              navigation.navigate(ROUTES.SurveySingle, {
                survey: survey,
                update: setSurveyList,
              })
            }
          >
            <SurveyPreview survey={survey} />
          </TouchableOpacity>
        ))
      ) : (
        <>
          <SvgLoaderRect
            style={styles.ghost}
            width={scaleWidth(343)}
            height={scaleHeight(80)}
          />
          <SvgLoaderRect
            style={styles.ghost}
            width={scaleWidth(343)}
            height={scaleHeight(80)}
          />
        </>
      )}
    </SpringScrollView>
  )
}

export default SurveyList

const styles = StyleSheet.create({
  surveyContainer: {
    height: scaleWidth(60),
    width: scaleWidth(343),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
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
  ghost: {
    marginBottom: scaleWidth(14),
    borderRadius: scaleWidth(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    elevation: 3,
  },
  container: {
    alignItems: 'center',
    paddingTop:
      Platform.OS === 'ios'
        ? getStatusBarHeight() + scaleHeight(150)
        : scaleHeight(150),
  },
})
