import { useState } from "react"
import { Input, TextArea } from "./ui"
import ArticleForm from "./ArticleForm"
import ArticleService from "./service/article"
import { useDispatch } from "react-redux"
import { postArticleFailure, postArticleStart, postArticleSuccess } from "./slice/article"
import { useNavigate } from "react-router-dom"

const CreateArticle = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [body, setBody] = useState('');
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const formSubmit = async (e) => {
		e.preventDefault();
		const article = { title, description, body };
		dispatch(postArticleStart())
		try {
			const response = await ArticleService.postArticle(article);
			dispatch(postArticleSuccess())
			navigate('/')
		} catch (error) {
			dispatch(postArticleFailure())
		}
	}
	const formProps = { title, setTitle, description, setDescription, body, setBody, formSubmit };
	return (
		<div className='text-center'>
			<h1 className='fs-2'>Create article</h1>
			<div className='w-75 mx-auto'>
				<ArticleForm {...formProps} btnName='Create'/>
			</div>
		</div>
	)
}

export default CreateArticle