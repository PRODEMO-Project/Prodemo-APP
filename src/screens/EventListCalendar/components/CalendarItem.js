import React, { useState, useEffect, useContext } from "react"
import { Platform } from "react-native"
import { scaleHeight, scaleWidth } from "@utils/size"
import colors from "@utils/colors"
import FONTS from "@utils/fonts"
import { Calendar, LocaleConfig } from "react-native-calendars"
import moment from "moment"
import { ScaledSheet } from "react-native-size-matters"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { StorageContext } from "@context/StorageContext"

const CalendarItem = props => {
  const { labelLang } = useContext(StorageContext)
  const { onDayPress, markedDays, isLoading, onMonthChange } = props
  const date = moment().format("YYYY-MM-DD")
  const [dateSelect, setDateSelect] = useState(date)
  const [markedDay, setMarkedDay] = useState({})

  useEffect(() => {
    setMarkedDay({
      [dateSelect]: { selected: true },
      ...markedDays,
    })
  }, [])

  useEffect(() => {
    setMarkedDay({
      ...markedDays,
      [dateSelect]: {
        ...markedDays[dateSelect],
        selected: true,
        dotColor: "blue",
      },
    })
    onDayPress(dateSelect)
  }, [dateSelect, markedDays])

  const handleMonthChange = ({ month, dateString, year }) => {
    onMonthChange(month)
    const daysInMonth = moment()
      .year(year)
      .month(month - 1)
      .daysInMonth()
    let date = Number(dateSelect.split("-")[2])
    date = date > daysInMonth ? daysInMonth : date

    setDateSelect(
      moment()
        .year(year)
        .month(month - 1)
        .date(date)
        .format("YYYY-MM-DD")
    )
  }

  LocaleConfig.locales.en = labelLang.Events.LocaleConfig
  LocaleConfig.defaultLocale = "en"

  return (
    <Calendar
      displayLoadingIndicator={isLoading}
      style={styles.calendarView}
      firstDay={1}
      startFromMonday={true}
      current={date}
      markedDates={markedDay}
      onDayPress={dateChose => setDateSelect(dateChose.dateString)}
      onMonthChange={handleMonthChange}
      theme={{
        arrowColor: "#FFF",
        "stylesheet.calendar.header": {
          week: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: scaleWidth(16),
            marginTop: scaleHeight(24),
            marginBottom: scaleHeight(14),
          },
          dayHeader: {
            color: colors.white,
            fontFamily: FONTS.HIND.Regular,
            fontWeight: "600",
            fontSize: scaleHeight(14),
            textAlign: "center",
          },
        },
        dotColor: "#fff",
        selectedDayBackgroundColor: colors.white,
        calendarBackground: colors.bluePrimary,
        textDayFontFamily: FONTS.HIND.Regular,
        textDayFontSize: scaleHeight(12),
        textMonthFontFamily: FONTS.HIND.Regular,
        textMonthFontWeight: "500",
        textMonthFontSize: scaleHeight(18),
        textDayHeaderFontFamily: FONTS.HIND.Regular,
        textDayHeaderFontSize: scaleHeight(12),
        monthTextColor: colors.white,
        dayTextColor: colors.white,
        todayTextColor: colors.white,
        textDisabledColor: "#D5D5D5",
        selectedDayTextColor: colors.bluePrimary,
      }}
    />
  )
}

export default CalendarItem

const styles = ScaledSheet.create({
  calendarView: {
    width: scaleWidth(343),
    marginTop:
      Platform.OS === "ios"
        ? getStatusBarHeight() + scaleHeight(65)
        : scaleHeight(80),
    borderRadius: scaleWidth(16),
    overflow: "hidden",
    marginBottom: scaleHeight(16),
    paddingTop: scaleHeight(10),
    paddingBottom: scaleHeight(20),
  },
})
