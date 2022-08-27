import styled from "styled-components"

interface ArticleThumbnailProps {
    index: number
    title: string
    image: string
}

const Layout = styled('div')`
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    max-width: 1200px;
    width: 90vw;
    max-height: 675px;
    height: 50.6vw;

    display: flex;
    align-items: flex-end;
`

const Title = styled('div')`
    font-size: min(60px, calc(80vw / 20));
    text-decoration: none !important;
    font-weight: 900;
    color: white;
    text-shadow: 0px 0px 8px #000;  
`
export const ArticleThumbnail: React.FC<ArticleThumbnailProps> = ({
    index,
    title,
    image,
}) => {
    return (
        <a href={ process.env.PUBLIC_URL.concat("/#/Article/") + index } style={{textDecoration: "none"}}>
            <Layout style={{ backgroundImage: `url(${image})` }}>
                <Title>{title}</Title>
            </Layout>
            
            <br></br>
        </a>
    )
}