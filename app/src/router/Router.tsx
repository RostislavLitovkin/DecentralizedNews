import { Route, HashRouter, Routes } from 'react-router-dom'
import { ArticlePage } from '../components/ArticlePage'
import { MainPage } from '../components/MainPage'
import { NewArticlePage } from '../components/NewArticlePage'

export const Router: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/NewArticle" element={<NewArticlePage />} />
                <Route path="/Article/:index" element={<ArticlePage />} />
            </Routes>
        </HashRouter>
    )
}