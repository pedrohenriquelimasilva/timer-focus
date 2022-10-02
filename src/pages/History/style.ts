import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    min-width: 600px;
    width: 100%;
    border-collapse: collapse;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      line-height: 1.6;
      font-size: 0.875rem;

      &:first-child {
        padding-left: 1.5rem;
        border-top-left-radius: 8px;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      color: ${(props) => props.theme['gray-300']};
      background: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      line-height: 1.6;
      font-size: 0.875rem;
      padding: 1rem;

      &:first-child {
        padding-left: 1.5rem;
        width: 50%;
      }

      &:last-child {
        border-top-right-radius: 8px;
      }
    }
  }
`

const StatusColor = {
  yellow: 'yellow-500',
  red: 'red-500',
  green: 'green-500',
} as const

interface StatusProps {
  statusColor: keyof typeof StatusColor
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;

    border-radius: 50%;
    background: ${(props) => props.theme[StatusColor[props.statusColor]]};
  }
`
