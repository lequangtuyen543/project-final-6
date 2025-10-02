import "./LayoutDefault.scss";
import { useSelector } from "react-redux";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { Header } from "./Header";

function LayoutDefault() {
  const authen = useSelector((state) => state.authenReducer);

  return (
    <>
      <div className="layout-default">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default LayoutDefault;