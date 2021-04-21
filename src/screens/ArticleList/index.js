import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react'
import { View, FlatList, Text, BackHandler, StyleSheet } from 'react-native'
import colors from '@utils/colors'
import keyExtractor from '@utils/keyExtractor'
import { scaleHeight, scaleWidth } from '@utils/size'
import ArticleItem from '@screens/ArticleList/components/ArticleItem'
import ArticleListItem from '@screens/ArticleList/components/ArticleListItem'
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'
import ROUTES from '@utils/routes'
import useServerFunctions from '@hooks/useServerFunctions'
import { StorageContext } from '@context/StorageContext'
import { SpringScrollView } from '@youngtailors/react-native-spring-scrollview'
import { NormalHeader } from '@youngtailors/react-native-spring-scrollview/NormalHeader'
import { NormalFooter } from '@youngtailors/react-native-spring-scrollview/NormalFooter'

const ArticleList = ({ navigation }) => {
  const [pageCount, setPageCount] = useState(1)
  const scrollView = useRef(null)
  const { userOptions, labelLang, setActiveTab } = useContext(StorageContext)
  const { GETrequest } = useServerFunctions()
  const [firstArticles, setFirstArticles] = useState([])
  const [lastArticles, setLastArticles] = useState([])

  const fetchArticles = async page => {
    const response = await GETrequest(
      userOptions.country_str,
      userOptions.language,
      'articles',
      `page=${page}`
    )
    return response
  }

  useEffect(() => {
    ;(async () => {
      try {
        const data = await fetchArticles(pageCount)
        setLastArticles(prev => {
          const newArr = [...prev]
          for (let el of data) {
            newArr.push(el)
          }
          return newArr
        })
        scrollView?.current.endLoading()
      } catch (error) {
        console.log(error)
      }
    })()
  }, [pageCount])

  useEffect(() => {
    const backAction = () => {
      navigation.goBack()
    }
    BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction)
    }
  }, [])

  const onNewsDetails = useCallback(
    item => {
      navigation.navigate(ROUTES.ArticleSingle, { article: item })
    },
    [navigation]
  )

  const renderArticleItem = ({ item }) => {
    const { image_url, title, abstract, date } = item
    return (
      <ArticleItem
        img={image_url}
        title={title}
        description={abstract}
        date={date}
        onPress={() => onNewsDetails(item)}
      />
    )
  }

  const renderArticleListItem = ({ item }) => {
    return <ArticleListItem onPress={() => onNewsDetails(item)} item={item} />
  }

  const listHeaderComponent = () => {
    return (
      <FlatList
        contentContainerStyle={styles.contentContainerFlatList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={firstArticles}
        renderItem={renderArticleItem}
        keyExtractor={keyExtractor}
      />
    )
  }

  if (lastArticles.length === 0 && firstArticles.length === 0) {
    return <Text style={styles.noEvents}>{labelLang.Article.NoArticles}</Text>
  } else {
    return (
      <SpringScrollView
        ref={scrollView}
        refreshHeader={NormalHeader}
        onRefresh={() => {
          setTimeout(() => {
            scrollView.current.endRefresh()
          }, 1000)
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
        style={styles.container}
        contentStyle={styles.contentContainer}
      >
        {lastArticles.map((item, index) => (
          <ArticleListItem
            key={index}
            onPress={() => onNewsDetails(item)}
            item={item}
          />
        ))}
      </SpringScrollView>
    )
  }
}

export default ArticleList

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop:
      Platform.OS === 'ios'
        ? getStatusBarHeight() + scaleHeight(70)
        : scaleHeight(70),
  },
  container: {},
  noEvents: {
    fontSize: scaleWidth(16),
    color: colors.black,
    textAlign: 'center',
  },
  contentContainerFlatList: {
    flex: 1,
    paddingLeft: scaleWidth(24),
    paddingTop: Platform.OS === 'ios' ? scaleHeight(20) : scaleHeight(10),
  },
  contentContainerStyle: {
    flex: 1,
    paddingBottom: getBottomSpace() + scaleHeight(24),
  },
})
