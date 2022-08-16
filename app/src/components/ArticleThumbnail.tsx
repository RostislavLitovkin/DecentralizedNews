import styled from "styled-components"

interface ArticleThumbnailProps {
    index: number
    title: string
    image: string
}

const Layout = styled('img')`
    object-fit: cover;
    max-width: 900px;
    width: 90vw;
    max-height: 600px;
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
        <a href={ "/Article/" + index } style={{textDecoration: "none"}}>
            <Layout src={image}>
                
            </Layout>
            <Title>{title}</Title>
            <br></br>
        </a>
    )
}