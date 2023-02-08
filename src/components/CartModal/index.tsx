import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'

import { CloseButton, Content, ImageContainer, Item, ItemDescription, OrderItems, Overlay, Summary, SummaryTitle, SummaryValors } from './styles'

interface CartModalProps {
  isOpen?: boolean
}

export function CartModal({ isOpen }: CartModalProps) {

  return (
    <Dialog.Portal>
      <Overlay />

      <Content className={isOpen ? '-is-open' : ''} >
        <Dialog.Title>Sacola de compras</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

          <OrderItems>
            <Item>
              <ImageContainer>

              </ImageContainer>

              <ItemDescription>
                <p>Camiseta Beyond the Limits</p>
                <span>R$ 79,90</span>
                <button>Remover</button>
              </ItemDescription>
            </Item>
            <Item>
              <ImageContainer>

              </ImageContainer>

              <ItemDescription>
                <p>Camiseta Beyond the Limits</p>
                <span>R$ 79,90</span>
                <button>Remover</button>
              </ItemDescription>
            </Item>
            <Item>
              <ImageContainer>

              </ImageContainer>

              <ItemDescription>
                <p>Camiseta Beyond the Limits</p>
                <span>R$ 79,90</span>
                <button>Remover</button>
              </ItemDescription>
            </Item>
          </OrderItems>

          <Summary>
            <SummaryTitle>
              <span>Quantidade</span>
              <span>3 itens</span>
            </SummaryTitle>
            <SummaryValors>
              <span>Valor total</span>
              <span>R$ 270,00</span>
            </SummaryValors>

            <button>Finalizar compra</button>
          </Summary>
      </Content>
    </Dialog.Portal>
  )
}
