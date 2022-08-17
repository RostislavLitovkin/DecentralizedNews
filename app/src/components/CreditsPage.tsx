import styled from "styled-components"

const Layout = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Text = styled('div')`
    color: white;
    font-size: 35px;
`

export const CreditsPage: React.FC = () => {
    return (
        <Layout>
            <Text>Created by Rostislav Litovkin</Text>
        </Layout>
    )
}