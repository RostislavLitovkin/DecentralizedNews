import styled from 'styled-components'

const ErrorLabel = styled('div')`
    color: red;
    font-weight: 900;
    text-align: center;
    margin: auto;
`
export const ErrorPage: React.FC<{message: string}> = ({message}) => {
    return (
        <ErrorLabel>
            {message}
        </ErrorLabel>
    )
}