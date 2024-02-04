import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLoginPage from './Pages/Auth/AdminLogin';
import DashboardPage from './Pages/Dashboard';
import ForgetPasswordPage from './Pages/Auth/forgetpassword';
import PasswordPage from './Pages/Auth/password';
import RolePage from './Pages/Auth/role';
import UserManagementModule from './Components/UserManagementModule';
import MerchantDetails from './Components/MerchantDetails';
import AllDocuments from './Components/AllDocuments';
import CreateNewMerchantAccount from './Components/CreateNewMerchantAccount';
import Layout from './Containers/Layout';
import PrivateRoutes from './Routes/PrivateRoutes';
import UserManagementContainer from './Containers/UserManagement';
import LoginPage from './Pages/Auth/Login';
import CreateInfluencerPage from './Pages/Influencer/Create';
import InfluencerRecordPage from './Pages/Influencer/Records';
import Activity from './Components/InfluencerRecord/Activity';
import History from './Components/InfluencerRecord/History';
import CreateNewCampaignPage from './Pages/Campaign/Create';
import CampaignRecordPage from './Pages/Campaign/Records';
import CampaignDetailsPage from './Pages/Campaign/Details';
import WithdrawRequestPage from './Pages/Payment/WithdrawRequest';
import ManagePaymentPage from './Pages/Payment/Manage';
import SupportManagePage from './Pages/Support/Manage';
import SettingPage from './Pages/Settings/index';
import ReportingMonitorPage from './Pages/Reporting/Monitor';
import ReportingCampaignPage from './Pages/Reporting/Campaign';
import ReportingTransactionPage from './Pages/Reporting/Payment';
import PublicRoutes from './Routes/PublicRoutes';
import UpdateCampaignPage from './Pages/Campaign/Update';
import { pdfjs } from 'react-pdf';
import AdminNewLogin from './Components/AdminNewLogin';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<PublicRoutes />}>
                    <Route exact path="/login" element={<LoginPage />}></Route>
                    <Route
                        exact
                        path="/admin/login"
                        element={<AdminNewLogin />}
                    ></Route>
                    <Route
                        exact
                        path="/forget/password"
                        element={<ForgetPasswordPage />}
                    />
                    <Route
                        exact
                        path="/merchant/reset-password"
                        element={<PasswordPage />}
                    />
                    <Route exact path="/role" element={<RolePage />} />
                </Route>
                <Route element={<PrivateRoutes />}>
                    <Route
                        exact
                        path="/"
                        element={<UserManagementModule />}
                    ></Route>
                    <Route
                        exact
                        path="/user-management-module"
                        element={<UserManagementModule />}
                    />
                    <Route
                        exact
                        path="/merchant-details/:merchantId/:update?"
                        element={<MerchantDetails />}
                    />
                    <Route
                        exact
                        path="/all-documents"
                        element={<AllDocuments />}
                    />
                    <Route
                        exact
                        path="/create-merchant-account"
                        element={<CreateNewMerchantAccount />}
                    />
                    <Route
                        exact
                        path="/waitlist-users"
                        element={<UserManagementContainer />}
                    />
                    <Route
                        exact
                        path="/create-influencer-account"
                        element={<CreateInfluencerPage />}
                    />
                    <Route
                        exact
                        path="/influencer-records"
                        element={<InfluencerRecordPage />}
                    />
                    <Route
                        exact
                        path="/influencer-records-activity/:influencerId"
                        element={<Activity />}
                    />
                    <Route
                        exact
                        path="/influencer-records-history/:influencerId"
                        element={<History />}
                    />
                    <Route
                        exact
                        path="/create-new-campaign"
                        element={<CreateNewCampaignPage />}
                    />
                    <Route
                        exact
                        path="/campaign-records"
                        element={<CampaignRecordPage />}
                    />
                    <Route
                        exact
                        path="/campaign-details/:campaignId"
                        element={<CampaignDetailsPage />}
                    />
                    <Route
                        exact
                        path="/campaign-update/:campaignId"
                        element={<UpdateCampaignPage />}
                    />
                    <Route
                        exact
                        path="/manage-payments"
                        element={<ManagePaymentPage />}
                    />
                    <Route
                        exact
                        path="/payment-withdraw-requests"
                        element={<WithdrawRequestPage />}
                    />
                    <Route
                        exact
                        path="/support-manage"
                        element={<SupportManagePage />}
                    />
                    <Route
                        exact
                        path="/reporting-campaigns"
                        element={<ReportingCampaignPage />}
                    />
                    <Route
                        exact
                        path="/reporting-monitor"
                        element={<ReportingMonitorPage />}
                    />
                    <Route
                        exact
                        path="/reporting-transactions"
                        element={<ReportingTransactionPage />}
                    />
                    <Route exact path="/settings" element={<SettingPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
