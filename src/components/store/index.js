import { configureStore } from "@reduxjs/toolkit";
import AuthReduser from '../slice/auth'
import ArticleReduser from '../slice/article'
export default configureStore({
    reducer : {
        auth: AuthReduser,
        article:ArticleReduser
    },
    devTools: process.env.NODE_ENV !== 'production'
})