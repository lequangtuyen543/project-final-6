import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearAllCookies } from "../../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../../actions/login";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  clearAllCookies();

  useEffect(() => {
    dispatch(checkLogin(false));
    navigate("/login");
  }, []);

  return <></>;
}; 