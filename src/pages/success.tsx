import { useEffect } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";

import { createStripe } from "@/lib/stripe";

import { ImageContainer, ItemsImages, OverflowItemsIndicator, SuccessContainer } from "@/styles/pages/success";

interface SuccessProps {
  customerName: string
  productUrlImages: string[],
  productTotalCount: number
}

export default function Success({ customerName, productUrlImages, productTotalCount }: SuccessProps) {

  const { clearCart } = useShoppingCart()

  const itemsOverflowed = productUrlImages.length > 3;

  useEffect(() => {
    clearCart()
  }, []) //eslint-disable-line

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <ItemsImages>
          {
            productUrlImages.slice(0, 3).map((imageUrl) => (
              <ImageContainer key={`${imageUrl}`}>
                <Image src={imageUrl} width={120} height={110} alt="" />
              </ImageContainer>
            ))
          }
          {itemsOverflowed && (
            <OverflowItemsIndicator>
              {`+${productTotalCount - 3}`}
            </OverflowItemsIndicator>
          )}
        </ItemsImages>

        <h1>Compra efetuada</h1>

        <p>Uhuul <strong>{customerName.toLowerCase()}</strong>, sua compra de {productTotalCount} {productTotalCount === 1 ? 'camiseta' : 'camisetas' } já está a caminho da sua casa. </p>

        <Link href="/" prefetch={false}>
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {

    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  
  const sessionId  = query.session_id as string

  const session = await createStripe(true).checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name

  const productUrlImages = session.line_items.data.map(item => {
    const product = item.price.product as Stripe.Product

    return product.images[0]
  })

  const productTotalCount = session.line_items.data.reduce(
    (prev, item) => {
      return prev += item.quantity
    },
  0)

  return {
    props: {
      customerName,
      productUrlImages,
      productTotalCount
    }
  }
}