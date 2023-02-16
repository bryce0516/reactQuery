import React from 'react'
import { store } from '../Second/useSubject'

type Props = {}

const Third = (props: Props) => {
  return (
    <button onClick={() => {
      store.setNumber(1)
    }}>
      thridSetNumber      
    </button>

    
  )
}

export default Third
