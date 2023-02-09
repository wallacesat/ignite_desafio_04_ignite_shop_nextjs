import { useState } from 'react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

import { useShoppingCart } from 'use-shopping-cart'
import { useKeenSlider } from 'keen-slider/react'
import { Handbag } from 'phosphor-react'
import Stripe from 'stripe'

import { SlideArrow } from '@/components/SlideArrow'

import { createStripe } from '@/lib/stripe'
import {
  formatToBRLCurrencyPrice,
  formatToStripePrice,
} from '@/utils/formatters'

import { HomeContainer, Product, ProductContent } from '@/styles/pages/home'

import 'keen-slider/keen-slider.min.css'

export type ProductType = {
  id: string
  name: string
  imageUrl: string
  price: string
  defaultPriceId: string
}

interface HomeProps {
  products: ProductType[]
}

export default function Home({ products }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(2)
  const [loaded, setLoaded] = useState(false)

  const { addItem } = useShoppingCart()

  const [sliderRef, instanceRef] = useKeenSlider({
    rtl: true,
    initial: 2,
    drag: false,
    slides: {
      perView: 2.5,
      spacing: 48,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  function handleAddItemToCart(product: ProductType) {
    addItem({
      id: product.defaultPriceId,
      name: product.name,
      price: formatToStripePrice(product.price),
      currency: 'BRL',
      image: product.imageUrl,
    })
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {loaded && instanceRef.current && (
          <SlideArrow
            left
            disabled={
              currentSlide ===
              instanceRef.current.track.details.slides.length - 2
            }
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
          />
        )}

        {products.map((product) => (
          <Product key={product.id} className="keen-slider__slide">
            <Link href={`/product/${product.id}`} prefetch={false}>
              <ProductContent>
                <Image src={product.imageUrl} alt="" width={520} height={480} />
              </ProductContent>
            </Link>

            <footer>
              <Link href={`/product/${product.id}`} prefetch={false}>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </Link>

              <button onClick={() => handleAddItemToCart(product)}>
                <Handbag size={32} weight="bold" />
              </button>
            </footer>
          </Product>
        ))}

        {loaded && instanceRef.current && (
          <SlideArrow
            disabled={currentSlide === 0}
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
          />
        )}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await createStripe().products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: formatToBRLCurrencyPrice(price.unit_amount),
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  }
}
