import { useState } from 'react';
import { AppProps } from "next/app";
import { useRouter } from 'next/router';
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Handbag } from "phosphor-react";

import { CartModal } from "@/components/CartModal";

import logoImg from '@/assets/logo.svg'

import { globalStyles } from "../styles/global";
import { Container, Header, CartButton } from "@/styles/pages/app";

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  const [ cartModalIsOpen, setCartModalIsOpen ] = useState(false);
  const [ isOpen, setIsOpen ] = useState(false);

  function handleOpenCartModal() {
    setCartModalIsOpen(true);
    
    const time = setTimeout(() => {
      setIsOpen(true);
      clearTimeout(time);
    }, 50)
  }

  function handleCloseCartModal() {
    setIsOpen(false);

    const time = setTimeout(() => {
      setCartModalIsOpen(false);
      clearTimeout(time);
    }, 300)
  }

  const isSuccessPage = pathname.startsWith('/success');

  return (
    <Container>
      <Header className={isSuccessPage ? '-success-page' : ''}>
        <Image src={logoImg} alt=""/>

        {!isSuccessPage && (
          <Dialog.Root onOpenChange={(state) => !!state ? handleOpenCartModal() : handleCloseCartModal()} open={cartModalIsOpen}>
            <Dialog.Trigger asChild>
              <CartButton>
                <Handbag size={24} weight="bold" />
                <span>3</span>
              </CartButton>
            </Dialog.Trigger>

            <CartModal isOpen={isOpen} />
          </Dialog.Root>
        )}
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
