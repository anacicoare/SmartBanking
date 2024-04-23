import Header from "../components/header/Header";
import ScrollToTop from "react-scroll-to-top";
import { IconArrowUp } from "@tabler/icons-react";
import Head from 'next/head';
import NewSidebar from "@/contents/components/sidebar/NewSidebar";

const Layout = (props) => {
  const closeSidebar = (e) => {
    e?.preventDefault();
    let body = document.querySelector("body");
    //If open -> closed
    if (body.classList.contains("sidebar-open")) {
      body.classList.remove("sidebar-open");
      body.classList.add("sidebar-closed");
      body.classList.add("sidebar-collapse");
    }
  }
  return (
    <>
      <Head>
        <title>{props?.title ? props?.title : ""}</title>
      </Head>
      <div className="flex">
          <NewSidebar />
          <Header />

        {/*<div className={`content-wrapper ${props?.bgClass}`}>*/}
        {/*  /!* <Breadcrumb /> *!/*/}
        {/*  /!* <div style={{ paddingTop: "30px" }}></div> *!/*/}
        {/*  /!*<section className="content px-3 !pt-6">{props?.children}</section>*!/*/}
        {/*</div>*/}
        {/* //<Footer /> */}
        {/*<div id="sidebar-overlay" onClick={(e) => closeSidebar(e)}></div>*/}
      </div>
    </>
  );
};

export default Layout;
