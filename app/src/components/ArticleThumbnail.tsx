import styled from "styled-components"

interface ArticleThumbnailProps {
    index: number
    title: string
    image: string
}

const Layout = styled('img')`
    object-fit: cover;
    max-width: 1200px;
    width: 90vw;
    max-height: 800px;
    height: 60vw;
`

const Title = styled('div')`
    font-size: 70px;
    text-decoration: none !important;
    font-weight: 900;
    color: white;
`
export const ArticleThumbnail: React.FC<ArticleThumbnailProps> = ({
    index,
    title,
    image,
}) => {
    return (
        <a href={ process.env.PUBLIC_URL.concat("/#/Article/") + index } style={{textDecoration: "none"}}>
            <Layout src={image}>
                
            </Layout>
            <Title>{title}</Title>
            <br></br>
        </a>
    )
}