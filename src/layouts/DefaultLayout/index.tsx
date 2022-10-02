import { Header } from '../../components/Header'
import { Outlet } from 'react-router-dom' // elemnento que vai ser substituiudo por um passado na hr
import { LayoutConteiner } from './style'

export function DefaultLayout() {
  return (
    <LayoutConteiner>
      <Header />
      <Outlet />
    </LayoutConteiner>
  )
}
