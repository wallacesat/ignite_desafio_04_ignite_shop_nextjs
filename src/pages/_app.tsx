import { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'
import { ToastContainer } from 'react-toastify'

import { Header } from '@/components/Header'

import { globalStyles } from '../styles/global'
import { Container } from '@/styles/pages/app'

import 'react-toastify/dist/ReactToastify.css'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const envs = {
    stripe: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    successUrl: `${process.env.NEXT_PUBLIC_NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${process.env.NEXT_PUBLIC_NEXT_URL}/`,
  }

  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={envs.stripe}
      successUrl={envs.successUrl}
      cancelUrl={envs.cancelUrl}
      currency="BRL"
      allowedCountries={['BR']}
      billingAddressCollection={false}
      shouldPersist
      language="pt-BR"
      persistKey="@desafio_04_ignite_shop/v1.0"
    >
      <Container>
        <Header />

        <Component {...pageProps} />

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Container>
    </CartProvider>
  )
}
