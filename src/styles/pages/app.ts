import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '&.-success-page': {
    justifyContent: 'center',
  }
})

export const CartButton = styled('button', {
  background: '$gray800',
  border: 0,
  padding: '0.75rem',
  borderRadius: 6,
  cursor: 'pointer',
  position: 'relative',

  '& > svg': {
    color: '$gray400'
  },

  '&:hover': {
    opacity: 0.6
  },

  '& > span': {
    width: 27,
    height: 27,
    borderRadius: '50%',
    background: '$green500',
    border: '3px solid $gray900',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    fontSize: '0.875rem',
    fontWeight: 'bold',
    color: '$white',

    position: 'absolute',
    top: '-25%',
    right: '-25%'
  }
})