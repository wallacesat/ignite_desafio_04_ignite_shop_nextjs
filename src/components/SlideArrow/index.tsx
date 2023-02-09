import { MouseEvent } from 'react'
import { CaretRight } from 'phosphor-react'

import { ArrowLeftButton, ArrowRightButton } from './styles'

interface SlideArrowProps {
  left?: boolean
  disabled?: boolean
  onClick?: (event: MouseEvent) => void
}

export function SlideArrow({ left, disabled, onClick }: SlideArrowProps) {
  return left ? (
    <ArrowLeftButton>
      <CaretRight
        size={48}
        onClick={onClick}
        className={disabled ? '--disabled' : ''}
      />
    </ArrowLeftButton>
  ) : (
    <ArrowRightButton>
      <CaretRight
        size={48}
        onClick={onClick}
        className={disabled ? '--disabled' : ''}
      />
    </ArrowRightButton>
  )
}
