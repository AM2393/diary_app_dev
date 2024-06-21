import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "./UserContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import Icon from "@mdi/react";
import { mdiCheckboxMarkedCircleAutoOutline, mdiLogout } from "@mdi/js";
import Button from "react-bootstrap/esm/Button";

function NavBar() {
  const { userList, loggedInUser, handlerMap } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" style={componentStyle()}>
      <Container>
        <Navbar.Brand>
          <Button style={brandStyle()} onClick={() => navigate("/")}>
            <Icon path={mdiCheckboxMarkedCircleAutoOutline} size={1} color={"#f9d960"} />
            TOAMUDO
          </Button>
        </Navbar.Brand>
        <Nav>
          <NavDropdown
            title={loggedInUser ? loggedInUser.name : "Přihlášení uživatele"}
            drop={"start"}
            style={{backgroundColor: "#f18f44", borderRadius: '8px'}}
          >
            {getUserMenuList({ userList, loggedInUser, handlerMap })}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

function componentStyle() {
  return { backgroundColor: "#153af4" };
}

function brandStyle() {
  return {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#f9d960",
    border: "1px solid #f9d960"
  };
}

function getUserMenuList({ userList, loggedInUser, handlerMap }) {
  // temporary solution to enable login/logout
  const userMenuItemList = userList.map((user) => (
    <NavDropdown.Item key={user.id} onClick={() => handlerMap.login(user.id)}>
      {user.name}
    </NavDropdown.Item>
  ));

  if (loggedInUser) {
    userMenuItemList.push(<NavDropdown.Divider key={"divider"} />);
    userMenuItemList.push(
      <NavDropdown.Item
        key={"logout"}
        onClick={() => handlerMap.logout()}
        style={{ color: "red" }}
      >
        <Icon path={mdiLogout} size={0.8} color={"red"} /> {"Odhlas se"}
      </NavDropdown.Item>
    );
  }

  return userMenuItemList;
}

export default NavBar;
