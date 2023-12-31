import React, { HTMLProps } from 'react'

export const cnmFormPrefix = 'cnm-form'

const CnMForm = (props: HTMLProps<HTMLFormElement>) => {
  return <form {...props} id={`${cnmFormPrefix}-${props.id}`} />
}

export default CnMForm
