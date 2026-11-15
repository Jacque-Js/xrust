import { Navigate, Outlet, ScrollRestoration, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { MenuPage } from './pages/MenuPage'
import { DishPage } from './pages/DishPage'
import { Breakfasts } from './pages/Breakfasts'
import { About } from './pages/About'
import { Contacts } from './pages/Contacts'
import { Social } from './pages/Social'
import { QrPage } from './pages/QrPage'
import { Legal } from './pages/Legal'

function Layout() {
  return (
    <div className={`relative isolate mx-auto min-h-dvh max-w-[480px] overflow-x-clip bg-cream text-ink shadow-[0_0_80px_rgba(0,0,0,.35)]`}>
      {/* Переливающийся фон: тёплые пятна света, как от ламп в зале, медленно плывут под контентом */}
      <div aria-hidden className="aurora">
        <span />
      </div>
      <Outlet />
      <ScrollRestoration />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/menu', element: <MenuPage /> },
      { path: '/dish/:id', element: <DishPage /> },
      { path: '/breakfasts', element: <Breakfasts /> },
      { path: '/about', element: <About /> },
      { path: '/contacts', element: <Contacts /> },
      { path: '/social', element: <Social /> },
      { path: '/qr', element: <QrPage /> },
      { path: '/legal/:doc', element: <Legal /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
], { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/' })
