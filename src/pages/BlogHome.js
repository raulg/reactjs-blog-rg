import React, { useEffect, useState, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { RichText } from 'prismic-reactjs'
import { Predicates } from 'prismic-javascript'
import NotFound from './NotFound'
import { Loader, Footer, BlogPosts } from '../components'
import { client } from '../prismic-configuration'

const BlogHome = () => {
  const [loading, setLoading] = useState(true)
  const [home, setHomeData] = useState(null)
  const [posts, setPostsData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await client.getSingle('blog_home')
      if (result) {
        window.PrismicToolbar.setupEditButton()
        setHomeData(result)
      } else {
        console.warn('Blog Home document not found. Make sure it exists in your Prismic repository')
      }
      setLoading(false)
    }

    const fetchPosts = async () => {
      const result = await client.query(Predicates.at('document.type', 'post'), { orderings: '[my.post.date desc]' })
      if (result) {
        setPostsData(result)
      } else {
        console.warn('Blog posts not found. Make sure they exist in your Prismic repository')
      }
    }

    fetchPosts()
    fetchData()
  }, [])

  const blogHomeHead = () => {
    // Using the queried blog_home document data, we render the top section
    const avatar = { backgroundImage: 'url(' + home.data.image.url + ')' }
    return (
      <div className='home'>
        <div className='blog-avatar' style={avatar} />
        <h1 className='blog-title'>{RichText.asText(home.data.headline)}</h1>
        <p className='blog-description'>{RichText.asText(home.data.description)}</p>
      </div>
    )
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Fragment>
      {
        home ? (
          <div>
            <Helmet>
              <title>{RichText.asText(home.data.headline)}</title>
            </Helmet>
            {blogHomeHead()}
            <BlogPosts posts={posts.results} />
            <Footer />
          </div>

        ) : <NotFound />
      }
    </Fragment>
  )
}

export default BlogHome
