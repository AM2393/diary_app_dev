import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <div className="card-header">
        <NavBar />
      </div>
      <div style={bodyStyle()}>
        <Outlet />
      </div>
      <div className={"card-footer text-light"} style={footerStyle()}>
        © Amulanga Nimejeva
      </div>
    </>
  );
};

function bodyStyle() {
  return {
    overflow: "auto",
    padding: "16px",
    flex: "1",
    borderTop: "#1671cf 4px solid",
    borderBottom: "#1671cf 4px solid",
  };
}

function footerStyle() {
  return { padding: "8px", textAlign: "center", backgroundColor: "#153af4" };
}

export default Layout;
