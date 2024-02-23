import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import { SearchProvider } from "./contexts/search";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccountActivate from "./pages/auth/AccountActivate";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AccessAccount from "./pages/auth/AccessAccount";
import AdCreate from "./pages/user/ad/AdCreate";
import PrivateRoute from "./routes/PrivateRoute";
import AdDetails from "./pages/user/ad/AdDetails";
import BuyAds from "./pages/BuyAds";
import RentAds from "./pages/RentAds";
import AdView from "./pages/AdView";
import Settings from "./pages/user/Settings";
import Wishlist from "./pages/user/Wishlist";
import EnquiredProperties from "./pages/user/EnquiredProperties";
import MyAds from "./pages/user/MyAds";
import AdEdit from "./pages/user/ad/AdEdit";
import Agent from "./pages/Agent";
import FallbackAgents from "./pages/fallback/FallbackAgents";
import PageNotFound from "./pages/PageNotFound";
import AuthRoute from "./routes/AuthRoute";

const Agents = lazy(() => import("./pages/Agents"));

function App() {
  return (
    <Router>
      <Toaster />
      <AuthProvider>
        <SearchProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<AuthRoute />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route
              path="/auth/account-activate/:token"
              element={<AccountActivate />}
            />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/auth/access-account/:token"
              element={<AccessAccount />}
            />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="ad/post" exact element={<AdCreate />} />
              <Route path="ad/post/details" element={<AdDetails />} />
              <Route path="user/my-ads" element={<MyAds />} />
              <Route path="user/ad/edit/:slug" element={<AdEdit />} />
              <Route path="user/saved-listings" element={<Wishlist />} />
              <Route
                path="user/enquired-properties"
                element={<EnquiredProperties />}
              />
              <Route path="user/settings" element={<Settings />} />
            </Route>
            <Route path="/ads/buy" element={<BuyAds />} />
            <Route path="/ads/rent" element={<RentAds />} />
            <Route path="/ad/:slug" element={<AdView />} />
            <Route
              path="/agents"
              element={
                <Suspense fallback={<FallbackAgents />}>
                  <Agents />
                </Suspense>
              }
            />
            <Route path="/agent/:username" element={<Agent />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
