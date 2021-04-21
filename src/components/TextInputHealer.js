import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { scaleHeight, scaleWidth } from '@utils/size'
import colors from '@utils/colors'
import FONTS from '@utils/fonts'

const TextInputHealer = props => {
  const {
    style,
    secure,
    editable,
    value,
    returnKeyType,
    onChangeText,
    onSubmitEditing,
    blurOnSubmit,
    inputRef,
    svg,
    placeholder,
    component,
    inputStyle,
    multiline,
  } = props
  const [changeText, setChangeText] = useState(value)
  return (
    <View style={[styles.textInputHealer, style]}>
      {svg ? <Text style={styles.svg}>{svg}</Text> : null}
      {component ? (
        component
      ) : (
        <>
          <TextInput
            multiline={multiline}
            ref={inputRef}
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            secureTextEntry={secure}
            placeholderTextColor={colors.dimGray}
            editable={editable}
            returnKeyType={returnKeyType}
            onChangeText={text => {
              setChangeText(text)
              onChangeText(text)
            }}
            value={changeText}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={blurOnSubmit}
          />
          {/*{changeText !== '' ? <SvgCheck style={styles.svgCheck} /> : null}*/}
        </>
      )}
    </View>
  )
}

export default TextInputHealer

const styles = ScaledSheet.create({
  textInputHealer: {
    width: scaleWidth(295),
    height: scaleHeight(48),
    backgroundColor: colors.frame,
    borderRadius: scaleHeight(24),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  svg: {
    marginHorizontal: scaleWidth(16),
    marginBottom: scaleWidth(4),
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(14),
    color: colors.semiBlack,
  },
  svgCheck: {
    marginRight: scaleWidth(16),
  },
})
