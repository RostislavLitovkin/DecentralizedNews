import { BrowserRouter, Routes as BaseRoutes, Route } from 'react-router-dom'
import { ArticlePage } from '../components/ArticlePage'
import { ErrorPage } from '../components/ErrorPage'
import { MainPage } from '../components/MainPage'

export const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <BaseRoutes>
                <Route path="/" element={<MainPage />} />
                <Route path="/Error" element={<ErrorPage />} />
                <Route path="/Article/:pubkey" element={<ArticlePage />} />
            </BaseRoutes>
        </BrowserRouter>
    )
}