import ButtonHeader from '@components/ButtonHeader'
import colors from '@utils/colors'
import FONTS from '@utils/fonts'
import { scaleHeight, scaleWidth } from '@utils/size'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Share,
  Alert,
  ImageBackground,
} from 'react-native'
import HTML from 'react-native-render-html'
import { StorageContext } from '@context/StorageContext'
import useServerFunctions from '@hooks/useServerFunctions'
import SvgShare from '@svgs/SvgShare'
import Config from 'react-native-config'
import WebView from 'react-native-webview'
import iframe from '@native-html/iframe-plugin'

function ArticleSingle({ navigation, route }) {
  const { GETrequest } = useServerFunctions()
  const { userOptions, labelLang } = useContext(StorageContext)

  const [article, setArticle] = useState({
    title: '',
    description: null,
    abstract: '',
    image_url: null,
  })

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${labelLang.ShareLink}: ${Config.BASE_URL}/articles/${
          route.params.country || userOptions.country_str
        }/${article.id}`,
        url: `${labelLang.ShareLink}: ${Config.BASE_URL}/articles/${
          route.params.country || userOptions.country_str
        }/${article.id}`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const { title, description, abstract, image_url } = article

  useEffect(() => {
    if (userOptions !== null) {
      const fetchArticle = (country, id) => {
        GETrequest(
          country,
          userOptions.language,
          `articles/${id}`,
          `firebase_token_id=${userOptions.id}`
        )
          .then(article => {
            setArticle(article)
            userOptions.country_str !== route.params.country &&
              !route.params.article &&
              Alert.alert(
                labelLang.Article.AlertTitle,
                labelLang.Article.AlertMessage
              )
          })
          .catch(err => console.log(err))
      }

      route.params.article
        ? setArticle(route.params.article)
        : fetchArticle(route.params.country, route.params.id)
    }
  }, [userOptions])

  if (userOptions === null) {
    return false
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgBg}
        imageStyle={styles.imgBg}
        source={{ uri: image_url }}
      >
        <View style={styles.header}>
          <View style={styles.btnView}>
            <ButtonHeader />
            <TouchableOpacity onPress={onShare} style={styles.svgNotification}>
              <SvgShare />
            </TouchableOpacity>
          </View>
          <View style={styles.eventHeaderContainer}>
            <Text style={styles.txtUserName}>{title}</Text>
            <Text style={styles.location}>{abstract}</Text>
          </View>
        </View>
      </ImageBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.eventContainer}
      >
        {description && (
          <HTML
            renderers={{ iframe }}
            source={{ html: description }}
            WebView={WebView}
            renderersProps={{
              iframe: {
                scalesPageToFit: true,
              },
            }}
            contentWidth={scaleWidth(345)}
          />
        )}
      </ScrollView>
    </View>
  )
}

export default ArticleSingle

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pageBackGround,
  },
  imgBg: {
    borderBottomLeftRadius: scaleWidth(24),
    borderBottomRightRadius: scaleWidth(24),
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  header: {
    paddingTop:
      Platform.OS === 'ios'
        ? getStatusBarHeight() + scaleHeight(5)
        : scaleHeight(5),
    paddingBottom: scaleHeight(16),
    backgroundColor: 'rgba(15,76,129,.7)',
    overflow: 'hidden',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventHeaderContainer: {
    marginTop: scaleHeight(20),
    marginHorizontal: scaleWidth(32),
  },
  infoContainer: {
    marginTop: scaleHeight(-5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtUserName: {
    fontFamily: FONTS.HIND.Bold,
    fontWeight: '600',
    fontSize: scaleHeight(24),
    lineHeight: scaleHeight(31),
    color: colors.white,
  },
  pin: {
    marginRight: scaleWidth(5),
    marginBottom: scaleHeight(3),
  },
  location: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(14),
    color: colors.white,
  },
  hour: {
    fontFamily: FONTS.HIND.SemiBold,
    color: colors.white,
    fontSize: scaleHeight(30),
  },
  svgNotification: {
    width: scaleWidth(50),
    height: scaleWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberNotification: {
    width: scaleWidth(8),
    height: scaleWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondRed,
    borderRadius: scaleWidth(4),
    position: 'absolute',
    top: 12,
    right: 17,
  },
  eventContainer: {
    padding: scaleWidth(15),
  },
  coverImage: {
    width: '100%',
    height: scaleHeight(200),
    borderRadius: scaleWidth(14),
  },
})
