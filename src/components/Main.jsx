import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loader } from './ui'
import ArticleService from './service/article'
import { getArticleStart, getArticleSuccess } from './slice/article'

const Main = () => {
  const { articles, isLoading } = useSelector(state => state.article)
  const { loggedIn, user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const getArticles = async () => {
    dispatch(getArticleStart())
    try {
      const response = await ArticleService.getArticles()
      console.log(response);
      dispatch(getArticleSuccess(response.articles))
    } catch (error) {
      console.log(error);
    }
  }
  const deleteArticle = async (slug) => {
    try {
      await ArticleService.deleteArticle(slug)
      getArticles();
    } catch (error) {
      console.log(error);
    }
  }
  const editArticle = async (slug) => {
    try {
      await ArticleService.editArticle(slug)
      getArticles()
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    getArticles()
  }, [])
  return (
    <div >
      {/* {isLoading && <Loader />} */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

        {articles.map(item => (
          <div className="col" key={item.title}>
            <div className="card h-100" >
              <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect></svg>

              <div className="card-body">
                <p className="card-text fw-bold " >{item.title}</p>
                <p className="card-text  " >{item.description}</p>
              </div>
              <div className="d-flex justify-content-between card-footer align-items-center">
                <div className="btn-group">

                  <button onClick={() => navigate(`/article/${item.slug}`)} type="button" className="btn btn-sm btn-outline-success">View</button>
                  {loggedIn && user.username === item.author.username && (
                    <>
                      <button onClick={() => navigate(`/edit-article/${item.slug}`)} type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                      <button onClick={() => deleteArticle(item.slug)} type="button" className="btn btn-sm btn-outline-danger">Delete</button>
                    </>
                  )}
                </div>
                <small className="text-muted fw-bold text-capitalize">{item.author.username}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Main