import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const RoutesManagers = (props) => {
  const { isPublic, isAuth, Component, redirectPatch } = props;
  const logged = useSelector(state => state.auth.userLogin);
  // Nếu đã đăng nhập thì không được phép dừng tại trang này.
  if(logged) {
    // Không được vào trang đăng ký và đăng nhập
    return isAuth ? <Navigate to="/"/> : <Component/>;
  }
  // Trang này không thể được vào nếu chưa đăng nhập
  if(!isPublic) {
    // Nếu đã đăng nhập cho ở lại, chưa thì ra trang đăng ký
    return logged ? <Component/> : <Navigate to={redirectPatch}/>;
  }
  return <Component/>
};
export default RoutesManagers;
