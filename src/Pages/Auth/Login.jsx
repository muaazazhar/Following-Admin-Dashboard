import MerhantLogin from "../../Components/MerhantLogin";
import AdminNewLogin from "../../Components/AdminNewLogin";

function LoginPage() {
  const location = window.location;

  // Check if the current URL is http://localhost:3001/login
  const merchantLogin = (location.pathname === '/login' && location.hostname === 'merchant.d2jc70p6846pt8.amplifyapp.com') || (location.port === '3001');
  return (
     merchantLogin?<MerhantLogin /> :
  <AdminNewLogin />
  );
}

export default LoginPage;
