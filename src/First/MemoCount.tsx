import React, { ReactText } from 'react'

type Props = {
  count:any
  setStart:any
}

const MemoCount:React.FC<Props>  = ({count, setStart})=> {
  return (
    <>
        <button
          onClick={() => {
            setStart((prev:any) => !prev);
          }}
        >
          start!!!!
        </button>
        <h5>{count}</h5>
      </>
  )
}

export default React.memo(MemoCount)