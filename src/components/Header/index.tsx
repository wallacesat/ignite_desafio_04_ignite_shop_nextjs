import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Handbag } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { useShoppingCart } from 'use-shopping-cart'

import { CartModal } from '../CartModal'

import logoImg from '@/assets/logo.svg'

import { HeaderCartButton, HeaderContainer } from './styles'

export function Header() {
  const { pathname } = useRouter()

  const [cartModalIsOpen, setCartModalIsOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const { cartCount } = useShoppingCart()

  function handleOpenCartModal() {
    setCartModalIsOpen(true)

    const time = setTimeout(() => {
      setIsOpen(true)
      clearTimeout(time)
    }, 50)
  }

  function handleCloseCartModal() {
    setIsOpen(false)

    const time = setTimeout(() => {
      setCartModalIsOpen(false)
      clearTimeout(time)
    }, 300)
  }

  const isSuccessPage = pathname.startsWith('/success')

  return (
    <HeaderContainer className={isSuccessPage ? '-success-page' : ''}>
      <Image src={logoImg} alt="" />

      {!isSuccessPage && (
        <Dialog.Root
          onOpenChange={(state) =>
            state ? handleOpenCartModal() : handleCloseCartModal()
          }
          open={cartModalIsOpen}
        >
          <Dialog.Trigger asChild>
            <HeaderCartButton>
              <Handbag size={24} weight="bold" />
              {!!cartCount && <span>{cartCount}</span>}
            </HeaderCartButton>
          </Dialog.Trigger>

          <CartModal isOpen={isOpen} />
        </Dialog.Root>
      )}
    </HeaderContainer>
  )
}
