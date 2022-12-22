import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
// import { Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// components
//checking
//new changes
import PosterSubCat from "./components/categoryPages/Poster/PosterSubCat";
import SignagesSubCat from "./components/categoryPages/Signages/SignagesSubCat";
// import ProductSpec from './components/commonComponents/productSpecs/ProductSpec';
import DiyHomeOne from "./components/DIY/Components/DiyHome/DiyHome";
import SignIn from "./components/userAuthComp/SignIn";
import AboutUs from "./Pages/staticPages/AboutUs";
import CartPage from "./Pages/CartPage";
import Home from "./Pages/Home";
import Poster from "./Pages/poster";
import Signages from "./Pages/Signages";
import FloorGraphics from "./Pages/FloorGraphics";
import AssetMarkings from "./Pages/AssetMarkings";
import UserAuth from "./Pages/UserAuth";
import PosterSpec from "./components/commonComponents/productSpecs/PosterSpec";
import Specification from "./components/commonComponents/productSpecs/Specification";
import AssetSpec from "./components/commonComponents/productSpecs/AssetSpec";
import UserDashboard from "./components/userDashboard/UserDashboard";
import ThankYou from "./Pages/staticPages/ThankYou";
import Signoutconfirmation from "./Pages/staticPages/Signoutconfirmation";
import PlaceOrder from "./components/cartComponents/PlaceOrder";
import Error from "./Pages/staticPages/Error";
import Contact from "./Pages/staticPages/Contact.jsx";
import BulkOrder from "./Pages/staticPages/BulkOrder";
import Navbar from "./components/commonComponents/Navbar/Navbar";
import Footer from "./components/commonComponents/Footer/Footer";
import TermsCondition from "./Pages/staticPages/TermsCondition";
import PrivacyPolicy from "./Pages/staticPages/PrivacyPolicy";

import TrackYourOrder from "./components/TrackOrder/TrackYourOrder";
import Faqs from "./Pages/staticPages/Faqs.jsx";
import EditProfile from "./components/userDashboard/dashboardComponents/EditProfile";
import Loader from "./components/commonComponents/Loader/Loader";
import Loading from "./components/commonComponents/LoadingScreen/Loading";
import TrackOrder from "./components/TrackOrder/TrackOrder";
import Review from "./components/commonComponents/popUp/Review";
import Payment from "./components/cartComponents/Payment";
import SubCategory from "./components/categoryPages/SubCategory";
import SubCategoryItems from "./components/categoryPages/SubCategoryItems";
import PdfMaker from "./components/userDashboard/pdf/PdfMaker";
import ResourcesAndCampaigns from "./Pages/ResourcesAndCampaigns";
export const DesContext = React.createContext({});

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // return isAdmin?(<>
  //         <Admin/>
  //   </>):
  return (
    <div className="App">
      <Navbar setIsAdmin={setIsAdmin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<SubCategory />} />
        {/* for subcategory component */}
        <Route
          path="subcategory/:categoryName"
          element={<SubCategoryItems />}
        />

        {/* <Route path="/poster" element={<Poster />} /> */}
        {/* <Route path="/poster/postersubcategory" element={<PosterSubCat />} /> */}
        {/* <Route path="/signages" element={<Signages />} /> */}
        {/* <Route 
          path="/signages/signagessubcategory"
          element={<SignagesSubCat />}
        />*/}
        {/* <Route path="/floorgraphics" element={<FloorGraphics />} /> */}
        {/* <Route path="/assetmarkings" element={<AssetMarkings />} /> */}
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/cartpage/placeorder" element={<PlaceOrder />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<UserAuth />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/posterspecification/:productid"
          element={<PosterSpec />}
        />
        <Route path="/specification/:productid" element={<Specification />} />
        <Route path="/assetspecification/:productid" element={<AssetSpec />} />
        <Route path="/userdashboard/:id" element={<UserDashboard />} />

        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/signout" element={<Signoutconfirmation />} />
        <Route path="/diy" element={<DiyHomeOne />} />
        <Route path="/resources" element={<ResourcesAndCampaigns />} />
        <Route path="*" element={<Error />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bulkorder" element={<BulkOrder />} />
        <Route path="/terms" element={<TermsCondition />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />

        <Route path="/trackyourorder" element={<TrackYourOrder />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/trackorder" element={<TrackOrder />} />
        <Route path="/invoices" element={<PdfMaker />} />
        <Route path="/review" element={<Review />} />
        <Route path="/pay" element={<Payment />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
