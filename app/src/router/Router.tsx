import { BrowserRouter, Routes as BaseRoutes, Route } from 'react-router-dom'
import { ArticlePage } from '../components/ArticlePage'
import { ErrorPage } from '../components/ErrorPage'
import { MainPage } from '../components/MainPage'
import { NewArticlePage } from '../components/NewArticlePage'

export const Router: React.FC = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <BaseRoutes>
                <Route path="/" element={<MainPage />} />
                <Route path="/Error" element={<ErrorPage />} />
                <Route path="/NewArticle" element={<NewArticlePage />} />
                <Route path="/Article/:index" element={<ArticlePage />} />
            </BaseRoutes>
        </BrowserRouter>
    )
}