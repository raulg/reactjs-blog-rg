import React from 'react'
import { RichText } from 'prismic-reactjs'

const Text = ({ slice, prismicCtx }) => {
  return (
    <div className='post-part single container'>
      <div>
        {RichText.render(slice.primary.text, prismicCtx.linkResolver)}
      </div>
    </div>
  )
}

export default Text
