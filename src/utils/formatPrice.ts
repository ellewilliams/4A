export const formatPrice = (amount: any, currency: string): string => {
  let price = (amount / 100).toFixed(2)
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
    minimumSignificantDigits: 1,
  })

  return numberFormat.format(parseInt(price))
}
