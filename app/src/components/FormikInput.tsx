import { Input, InputProps } from 'formik-antd'
import styled from 'styled-components'

export interface ExtraInputProps {
  label?: string
  errorMessage?: string
}
export const Label = styled('div')`
  margin-bottom: 8px;
  margin-top: 24px;
  color: white;
  font-weight: 500;
`
export const Error = styled('div')`
  margin-top: 8px;
  margin-top: 8px;
  color: red;
`

export type FormikInputProps = InputProps & ExtraInputProps

export const FormikInput: React.FC<FormikInputProps> = ({
  name,
  label,
  errorMessage,
  type,
  disabled,
}) => (
  <>
    <Label style={{ width: '100%' }}>{label}</Label>
        <Input style={{ width: '100%' }} disabled={disabled} name={name} type={type} status={errorMessage ? 'error' : ''} />
    <Error style={{ width: '100%' }}>{errorMessage}</Error>
  </>
)
