import { useState } from 'react'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { useShoppingCart } from 'use-shopping-cart'
import * as Dialog from '@radix-ui/react-dialog'

import { formatToBRLCurrencyPrice } from '@/utils/formatters'

import {
  CloseButton,
  Content,
  ImageContainer,
  Item,
  ItemCount,
  ItemDescription,
  OrderItems,
  Overlay,
  Summary,
  SummaryTitle,
  SummaryValors
} from './styles'

interface CartModalProps {
  isOpen?: boolean
}

type RedirectCheckoutStatus = 'idle' | 'redirecting' | 'redirect-error' | 'missing-items'

export function CartModal({ isOpen }: CartModalProps) {

  const {
    cartDetails,
    cartCount,
    formattedTotalPrice,
    redirectToCheckout,
    removeItem
  } = useShoppingCart()

  const [status, setStatus] = useState<RedirectCheckoutStatus>('idle')

  const cartItems = Object.keys(cartDetails).map(key => {
    return {
      name: cartDetails[key].name,
      imageUrl: cartDetails[key].image,
      price: cartDetails[key].price,
      id: cartDetails[key].id,
      quantity: cartDetails[key].quantity
    }
  })

  async function handleRedirectToCheckout() {

    if (cartCount > 0) {
      setStatus('redirecting')
      try {
        const result = await redirectToCheckout()
        if (result?.error) {
          console.error(result)
          setStatus('redirect-error')
        }
      } catch (error) {
        console.error(error)
        setStatus('redirect-error')
      }
    } else {
      setStatus('missing-items')
    }
  }

  function handleRemoveItemFromCart(itemId: string) {
    removeItem(itemId)
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content className={isOpen ? '-is-open' : ''} >
        <Dialog.Title>Sacola de compras</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

          <OrderItems>
            {
              cartItems.map(cartItem => (
                <Item key={cartItem.id}>
                  <ImageContainer>
                    <Image src={cartItem.imageUrl} width={95} height={95} alt=""/>
                  </ImageContainer>

                  <ItemDescription>
                    <p>{cartItem.name}</p>
                    <span>{formatToBRLCurrencyPrice(cartItem.price)}</span>
                    <button onClick={() => handleRemoveItemFromCart(cartItem.id)}>Remover</button>
                  </ItemDescription>

                  <ItemCount>
                    {`${cartItem.quantity}x`}
                  </ItemCount>
                </Item>
              ))
            }
          </OrderItems>

          <Summary>
            <SummaryTitle>
              <span>Quantidade</span>
              <span>{cartCount} {`ite${cartCount === 1 ? 'm' : 'ns' }`}</span>
            </SummaryTitle>
            <SummaryValors>
              <span>Valor total</span>
              <span>{formattedTotalPrice}</span>
            </SummaryValors>

            <button disabled={cartCount < 1 || status === 'redirecting'} onClick={handleRedirectToCheckout}>Finalizar compra</button>
          </Summary>
      </Content>
    </Dialog.Portal>
  )
}
