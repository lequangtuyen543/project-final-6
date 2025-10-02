import { Outlet } from "react-router-dom"

export const Main = () => {
  return (
    <main className="main">
      <div className="container">
        <Outlet />
      </div>
    </main>
  )
}