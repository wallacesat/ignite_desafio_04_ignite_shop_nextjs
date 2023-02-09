import { MouseEvent, useState } from 'react';
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

import { useKeenSlider } from 'keen-slider/react'
import { Handbag } from 'phosphor-react'
import Stripe from 'stripe'

import { SlideArrow } from '@/components/SlideArrow';

import { stripe } from '@/lib/stripe'

import { HomeContainer, Product } from '@/styles/pages/home'

import 'keen-slider/keen-slider.min.css'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(2)
  const [loaded, setLoaded] = useState(false)

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

  function handleAddItemToCart(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {loaded && instanceRef.current && (<SlideArrow
          left
          disabled={currentSlide === instanceRef.current.track.details.slides.length - 2}
          onClick={
            (e: any) => e.stopPropagation() || instanceRef.current?.next()
          }
        />)}

        {
          products.map(product => (
            <Link key={product.id} href={`/product/${product.id}`} className="keen-slider__slide" prefetch={false}>
              <Product>
                <Image
                  src={product.imageUrl}
                  alt=""
                  width={520}
                  height={480}
                />
                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>

                  <button onClick={handleAddItemToCart}>
                    <Handbag size={32} weight="bold" />
                  </button>
                </footer>
              </Product>
            </Link>
          ))
        }
        
        {loaded && instanceRef.current && (<SlideArrow
          disabled={currentSlide === 0}
          onClick={
            (e: any) => e.stopPropagation() || instanceRef.current?.prev()
          }
        />)}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100),
    }

  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 horas
  }
}