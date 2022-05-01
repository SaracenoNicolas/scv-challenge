export const FormatCurrency = (value) => {
  const formattedNumber = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value)
  return `AR ${formattedNumber}`
}