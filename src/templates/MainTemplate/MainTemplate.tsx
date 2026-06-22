import { Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/header/Header";

const MainTemplate = () => {
  return (
    <div className="h-screen flex flex-col mt-0">
      <Header />
      <main className="m-3 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainTemplate;