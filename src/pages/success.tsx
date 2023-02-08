import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";

import { ImageContainer, ItemsImages, OverflowItemsIndicator, SuccessContainer } from "@/styles/pages/success";

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {

  const list = Array.from(new Array(10));
  const itemsOverflowed = list.length > 3;

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <ItemsImages>
          {
            list.slice(0, 3).map((l, index) => (
              <ImageContainer key={`${product.imageUrl}_${index}`}>
                <Image src={product.imageUrl} width={120} height={110} alt="" />
              </ImageContainer>
            ))
          }
          {itemsOverflowed && (
            <OverflowItemsIndicator>
              {`+${list.length - 3}`}
            </OverflowItemsIndicator>
          )}
        </ItemsImages>

        <h1>Compra efetuada</h1>

        <p>Uhuul <strong>{customerName.toLowerCase()}</strong>, sua compra de 3 camisetas já está a caminho da sua casa. </p>

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

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name
  const product = session.line_items.data[0].price.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}