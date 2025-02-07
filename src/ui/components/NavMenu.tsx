import { Navbar } from "flowbite-react";
import { useContext } from "react";
import {
  Link,
  useLinkClickHandler,
  useLocation,
  useNavigate,
} from "react-router";
import { AuthContext } from "../../auth";

export const NavMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const marvelClickHandler = useLinkClickHandler("/marvel");
  const dcClickHandler = useLinkClickHandler("/dc");
  const searchClickHandler = useLinkClickHandler("/search");
  const {user, logout} = useContext(AuthContext);


  const onLogout = () => {
    logout();
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
      <Navbar>
        <span className=" text-xl font-semibold dark:text-white">
          <Link to="/">{user?.name}</Link>
        </span> 
        <Navbar.Toggle />
       
        <Navbar.Collapse>
            
            <Navbar.Link className="cursor-pointer" onClick={marvelClickHandler} active={location.pathname === "/marvel"}>
              Marvel
            </Navbar.Link>

            <Navbar.Link className="cursor-pointer" onClick={dcClickHandler}  active={location.pathname === "/dc"}>DC</Navbar.Link>
            <Navbar.Link className="cursor-pointer" onClick={searchClickHandler}  active={location.pathname === "/search"}>Search</Navbar.Link>


          <Navbar.Link className="cursor-pointer" onClick={onLogout} >
            <span className="text-red-500">Logout</span>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
