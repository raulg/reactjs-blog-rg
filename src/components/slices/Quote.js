import React from 'react'
import { RichText } from 'prismic-reactjs'

const Quote = ({ slice }) => {
  return (
    <div className='post-part single container'>
      <span className='block-quotation'>
        {RichText.asText(slice.primary.quote)}
      </span>
    </div>
  )
}

export default Quote
