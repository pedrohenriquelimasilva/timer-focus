import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    a {
      height: 3rem;
      width: 3rem;

      display: flex;
      align-items: center;
      justify-content: center;

      border-top: 3px solid transparent; //metodo para colocar uma hover adequado no código
      border-bottom: 3px solid transparent;

      color: ${(props) => props.theme['gray-100']};

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }

      &.active {
        color: ${(props) => props.theme['green-500']};
      }
    }
  }
`
