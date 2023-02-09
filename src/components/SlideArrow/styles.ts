import { styled } from '@/styles'

export const ArrowButtonBase = styled('div', {
  position: 'absolute',
  zIndex: 20,
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background:
    'linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',

  '& > svg': {
    color: '$gray300',
    cursor: 'pointer',
    display: 'initial',

    '&:hover': {
      color: '$white',
    },

    '&.--disabled': {
      display: 'none',
    },
  },
})

export const ArrowLeftButton = styled(ArrowButtonBase, {
  transform: 'matrix(-1, 0, 0, 1, 0, 0)',
  top: 0,
  left: 0,
})

export const ArrowRightButton = styled(ArrowButtonBase, {
  top: 0,
  right: 0,
})
