import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../pages/Home/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white/90 dark:bg-neutral/60 bg-opacity-60  backdrop-blur-sm  fixed w-full shadow-xl z-30">
        <Navbar></Navbar>
      </header>
      <section className="flex-grow-1">
        <Outlet></Outlet>
      </section>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;
