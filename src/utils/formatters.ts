export function formatToStripePrice(price: string) {
  return Number(price.replace(',', '.').replace(/\D/g, ''))
}

export function formatToBRLCurrencyPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price / 100)
}
