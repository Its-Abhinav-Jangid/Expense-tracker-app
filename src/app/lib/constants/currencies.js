const currencies = [
  { code: "USD", symbol: "$", countryCode: "US" }, // United States Dollar
  { code: "EUR", symbol: "€", countryCode: "EU" }, // Euro (European Union)
  { code: "JPY", symbol: "¥", countryCode: "JP" }, // Japanese Yen
  { code: "GBP", symbol: "£", countryCode: "GB" }, // British Pound Sterling
  { code: "AUD", symbol: "$", countryCode: "AU" }, // Australian Dollar
  { code: "CAD", symbol: "$", countryCode: "CA" }, // Canadian Dollar
  { code: "CHF", symbol: "₣", countryCode: "CH" }, // Swiss Franc
  { code: "CNY", symbol: "¥", countryCode: "CN" }, // Chinese Yuan
  { code: "INR", symbol: "₹", countryCode: "IN" }, // Indian Rupee
  { code: "MXN", symbol: "$", countryCode: "MX" }, // Mexican Peso
  { code: "SGD", symbol: "$", countryCode: "SG" }, // Singapore Dollar
  { code: "NZD", symbol: "$", countryCode: "NZ" }, // New Zealand Dollar
  { code: "HKD", symbol: "$", countryCode: "HK" }, // Hong Kong Dollar
  { code: "KRW", symbol: "₩", countryCode: "KR" }, // South Korean Won
  { code: "SEK", symbol: "kr", countryCode: "SE" }, // Swedish Krona
  { code: "NOK", symbol: "kr", countryCode: "NO" }, // Norwegian Krone
  { code: "TRY", symbol: "₺", countryCode: "TR" }, // Turkish Lira
  { code: "RUB", symbol: "₽", countryCode: "RU" }, // Russian Ruble
  { code: "BRL", symbol: "R$", countryCode: "BR" }, // Brazilian Real
  { code: "ZAR", symbol: "R", countryCode: "ZA" }, // South African Rand
  { code: "DKK", symbol: "kr", countryCode: "DK" }, // Danish Krone
  { code: "PLN", symbol: "zł", countryCode: "PL" }, // Polish Złoty
  { code: "THB", symbol: "฿", countryCode: "TH" }, // Thai Baht
  { code: "IDR", symbol: "Rp", countryCode: "ID" }, // Indonesian Rupiah
  { code: "HUF", symbol: "Ft", countryCode: "HU" }, // Hungarian Forint
  { code: "CZK", symbol: "Kč", countryCode: "CZ" }, // Czech Koruna
  { code: "ILS", symbol: "₪", countryCode: "IL" }, // Israeli New Shekel
  { code: "CLP", symbol: "$", countryCode: "CL" }, // Chilean Peso
  { code: "PHP", symbol: "₱", countryCode: "PH" }, // Philippine Peso
  { code: "AED", symbol: "د.إ", countryCode: "AE" }, // UAE Dirham
];
export const currencyMap = {};
for (const currency of currencies) {
  currencyMap[currency.code] = {
    symbol: currency.symbol,
    countryCode: currency.countryCode,
  };
}

export default currencies;
