import colors from '@utils/colors'
import FONTS from '@utils/fonts'
import { scaleHeight, scaleWidth } from '@utils/size'
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { PieChart } from 'react-native-svg-charts'

function SurveyResults(props) {
  const [currentAnswer, setCurrentAnswer] = useState(null)
  const { results } = props
  const [pieData, setPieData] = useState(null)

  function randDarkColor() {
    var lum = -0.25
    var hex = String(
      '#' + Math.random().toString(16).slice(2, 8).toUpperCase()
    ).replace(/[^0-9a-f]/gi, '')
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    var rgb = '#',
      c,
      i
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16)
      c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16)
      rgb += ('00' + c).substr(c.length)
    }
    return rgb
  }

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7
    )

  useEffect(() => {
    setPieData(
      results.map((data, index) => {
        let color = randDarkColor(randomColor())
        return {
          value: data.value,
          svg: {
            fill: color,
            onPress: () => setCurrentAnswer({ key: data.key, color: color }),
          },
          key: `pie-${index}`,
        }
      })
    )
  }, [])

  return (
    <View>
      {pieData && <PieChart style={styles.resultView} data={pieData} />}
      <Text
        style={[styles.answerText, { backgroundColor: currentAnswer?.color }]}
      >
        {currentAnswer?.key}
      </Text>
    </View>
  )
}

export default SurveyResults

const styles = StyleSheet.create({
  resultView: {
    height: scaleHeight(200),
    marginVertical: scaleHeight(20),
    marginBottom: scaleHeight(40),
  },
  answerText: {
    padding: scaleWidth(16),
    paddingVertical: scaleWidth(14),
    borderRadius: scaleWidth(16),
    overflow: 'hidden',
    color: colors.white,
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleWidth(13),
    lineHeight: scaleWidth(20),
  },
})
