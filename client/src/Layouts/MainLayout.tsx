import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";

const MainLayout = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <section>
        <Outlet></Outlet>
      </section>
      <footer>I am footer</footer>
    </div>
  );
};

export default MainLayout;
