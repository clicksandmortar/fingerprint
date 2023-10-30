import { CSSProperties } from 'react'

export type ModalSize = 'small' | 'medium' | 'large' | 'full'
export type ButtonPosition = 'left' | 'center' | 'right'

export type TriggerConfig = {
  modal?: {
    size?: ModalSize
    textShadow?: boolean
    textColor?: string
    buttonPosition?: ButtonPosition
  }
  banner?: {}
  youtube?: {}
  inverseFlow?: {}
}

export const getModalStylesBySize = (size: ModalSize): CSSProperties => {
  switch (size) {
    case 'small': {
      return { width: '90%', maxWidth: 400, minHeight: 300 }
    }
    case 'medium': {
      return { width: '90%', maxWidth: 800, minHeight: 400 }
    }
    case 'large': {
      return { width: '90%', maxWidth: 1200, minHeight: 400 }
    }
    case 'full': {
      return { width: '100vw', height: '100vh' }
    }
  }
}

export const getModalButtonStylesBySize = (size: ModalSize): CSSProperties => {
  // TODO: think if we can make it better :)
  switch (size) {
    case 'small': {
      return {
        fontSize: '1.3rem',
        padding: '0.3rem 1rem'
      }
    }
    case 'medium': {
      return {
        fontSize: '1.3rem',
        padding: '0.3rem 1rem'
      }
    }
    case 'large': {
      return {
        fontSize: '1.3rem',
        padding: '0.3rem 1rem'
      }
    }
    case 'full': {
      return {
        fontSize: '1.5rem',
        padding: '0.5rem 1.2rem'
      }
    }
  }
}

export const getModalButtonFlexPosition = (
  position: ButtonPosition
): CSSProperties => {
  switch (position) {
    case 'left':
      return { justifyContent: 'flex-start' }
    case 'right':
      return { justifyContent: 'flex-end' }
    case 'center':
      return { justifyContent: 'center' }
  }
}
