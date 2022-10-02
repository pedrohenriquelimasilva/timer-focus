import styled from 'styled-components'

export const CountDownContainer = styled.div`
  font-size: 10rem;
  line-height: 8rem;
  font-family: 'Roboto Mono', monospace;
  color: ${(props) => props.theme['gray-100']};
  display: flex;
  gap: 1rem;

  span {
    padding: 2.5rem 1rem;
    background-color: ${(props) => props.theme['gray-700']};
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  color: ${(props) => props.theme['green-500']};
  padding: 2rem 0rem;
  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`
