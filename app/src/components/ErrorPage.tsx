import styled from 'styled-components'

const ErrorLabel = styled('div')`
    color: red;
    font-weight: 900;
`
export const ErrorPage: React.FC = () => {
    return (
        <ErrorLabel>
            This is supposed to show a new page with an Error
        </ErrorLabel>
    )
}