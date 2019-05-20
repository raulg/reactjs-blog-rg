import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { RichText } from 'prismic-reactjs'
import { Helmet } from 'react-helmet'
import NotFound from './NotFound'
import { SliceZone } from '../components/slices'
import { Loader, Footer } from '../components'
import { client } from '../prismic-configuration'

const Post = ({ match: { params: { uid } } }) => {
  const [post, setPostData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const result = await client.getByUID('post', uid)
      setLoading(false)
      if (result) {
        window.PrismicToolbar.setupEditButton()
        return setPostData(result)
      } else {
        console.warn('Post document. Make sure it exists in your Prismic repository')
      }
    }
    fetchData()
  }, [uid])

  if (loading) {
    return <Loader />
  }

  return (
    <Fragment>
      {
        post ? (
          <div className='main'>
            <Helmet>
              <title>{post.data.title.length !== 0 ? RichText.asText(post.data.title) : 'Untitled'}</title>
            </Helmet>
            <div className='outer-container'>
              <div className='back'>
                <Link to='/'>back to list</Link>
              </div>
              {/* Render the edit button */}
              <h1 data-wio-id={post.id}>
                {post.data.title.length !== 0 ? RichText.asText(post.data.title) : 'Untitled'}
              </h1>
            </div>
            {/* Go through the slices of the post and render the appropiate one */}
            <SliceZone slices={post.data.body} />
            <Footer />
          </div>
        ) : <NotFound />
      }
    </Fragment>
  )
}

export default Post
