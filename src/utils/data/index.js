const COUNTRIES = [
  {
    img: require("@assets/MainPage/italyFlag.png"),
    country: "italy",
    country_str: "it",
  },
  {
    img: require("@assets/MainPage/portugalFlag.png"),
    country: "portugal",
    country_str: "pt",
  },
  {
    img: require("@assets/MainPage/belgiumFlag.png"),
    country: "belgium",
    country_str: "be",
  },
]

const LANGUAGES = {
  en: "English",
  it: "Italiano",
  fr: "Français",
  pt: "Português",
  de: "Deutsche",
  ro: "Română",
  bg: "Bulgară",
  pl: "Polskie",
  es: "Español",
}

const countryCoords = [
  {
    country: "italy",
    latitude: 41.902782,
    longitude: 12.496366,
  },
  {
    country: "portugal",
    latitude: 39.758249,
    longitude: -8.065134,
  },
  {
    country: "belgium",
    latitude: 50.719405,
    longitude: 4.662293,
  },
]

export { countryCoords, COUNTRIES, LANGUAGES }
