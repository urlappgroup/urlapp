import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from './components/common/Header.jsx'
import Footer from './components/common/Footer.jsx'
import ListPageLayout from './components/listPage/ListPageLayout.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListPageLayout />} />
          <Route path="listPage" element={<ListPageLayout />} />
          <Route path="*" element={<ListPageLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
 

 