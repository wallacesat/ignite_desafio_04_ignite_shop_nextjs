import * as Dialog from "@radix-ui/react-dialog";
import { styled } from "@stitches/react";

export const Overlay = styled(Dialog.Overlay, {
  position: "fixed",
  width: "100vw",
  height: "100vh",
  inset: 0,
  background: "transparent"
})

export const Content = styled(Dialog.Content, {
  position: "fixed",
  height: '100%',
  minWidth: 480,
  top: 0,
  right: 0,
  padding: '3rem',
  paddingTop: '4.5rem',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 9999,

  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
  background: '$gray800',

  transform: 'translateX(50%)',
  transition: 'all 0.3s ease-in-out',
  opacity: 0,

  '&.-is-open': {
    transform: 'translateX(0%)',
    opacity: 1,
    transition: 'all 0.3s ease-in-out',

  },

  '& > h2': {
    fontSize: '1.25rem',
    color: '$gray100',
    fontWeight: 'bold',
  }
})

export const CloseButton = styled(Dialog.Close, {
  position: "absolute",
  background: "transparent",
  border: 0,
  top: "1.5rem",
  right: "1.5rem",
  lineHeight: 0,
  cursor: "pointer",
  color: "$gray400",

  '&:hover': {
    color: '$gray300'
  }
})

export const OrderItems = styled('div', {
  marginTop: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.53125rem',
  overflowY: 'auto',
  padding: '1rem 0',
})

export const Item = styled('div', {
  display: 'flex',
  gap: '1.25rem',
  position: 'relative',
})

export const ImageContainer = styled('div', {
  width: 101,
  height: 93,
  borderRadius: 8,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
})

export const ItemDescription = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  
  '& > p': {
    fontSize: '1.125rem',
    color: '$gray300',
    lineHeight: '160%'
  },

  '& > span': {
    marginTop: '0.125rem',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '$gray100',
    lineHeight: '160%'
  },

  '& > button': {
    marginTop: 'auto',
    color: '$green500',
    background: 'transparent',
    border: 0,
    maxWidth: 'fit-content',
    cursor: 'pointer',
    fontWeight: 'bold',
    lineHeight: '160%',

    '&:hover': {
      color: '$green300',
    }
  }
})

export const ItemCount = styled('div', {
  position: 'absolute',
  width: 30,
  height: 30,
  borderRadius: '50%',
  backgroundColor: '$gray100',
  border: '3px solid $gray800',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  fontSize: '0.75rem',
  color: '$green500',
  fontWeight: 'bold',

  top: 30,
  left: 85
})

export const Summary = styled('div', {
  marginTop: 'auto',

  '& > button': {
    marginTop: '3.5625rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '1.25rem 0',
    backgroundColor: '$green500',
    borderRadius: 8,
    color: '$white',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    border: 0,
    cursor: 'pointer',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300'
    }

  }
})

export const SummaryTitle = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '0.4375rem',

  span: {
    '&:first-child': {
      color: '$gray100',
    },
    '&:last-child': {
      fontSize: '1.125rem',
      color: '$gray300'
    }
  }
})

export const SummaryValors = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  span: {
    fontSize: '1.125rem',
    color: '$gray100',
    fontWeight: 'bold',

    '&:last-child': {
      fontSize: '1.5rem'
    }
  }
})