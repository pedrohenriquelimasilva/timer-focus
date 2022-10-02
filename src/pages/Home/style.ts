import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    gap: 3.5rem;
    flex-direction: column;
    align-items: center;
  }
`

const ButtonSubmitted = styled.button`
  width: 100%;
  padding: 1rem;

  border: 0;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  color: ${(props) => props.theme['gray-100']};
  font-weight: bold;

  cursor: pointer;
  transition: background-color 0.1s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartButtonSubmitted = styled(ButtonSubmitted)`
  background: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`

export const StopButtonSubmitted = styled(ButtonSubmitted)`
  background: ${(props) => props.theme['red-500']};

  &:hover {
    background: ${(props) => props.theme['red-700']};
  }
`
