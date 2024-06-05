import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Header from './components/common/Header.jsx'
// import {Footer} from './components/common/Footer.jsx'
import Footer from './components/common/Footer.jsx'
import ListPageLayout from './components/listPage/ListPageLayout.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListPageLayout />} />
          <Route path="about" element={<About />} />
          <Route path="listPage" element={<ListPageLayout />} />
          <Route path="dashboard" element={<Dashboard />} />
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

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}