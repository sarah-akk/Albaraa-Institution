import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/index.tsx';
import Header from '../components/Header/index.tsx';

const Home = () => {
  return (
    <div className="flex  overflow-y-hidden home-scroll">
      <div className="flex flex-row-reverse w-full h-screen">
        <Sidebar />
        <div className="flex-1 overflow-y-auto ">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Home;
