import React, { useState } from "react";
import { CommonPopup } from "../components/commonComponents/popUp/PopUp";
import diyPopup from "../images/popups/diyPopup.svg";

const ResourcesAndCampaigns = () => {
  const [popup, setPopup] = useState(true);
  return (
    <div style={{height:"75vh"}}>
      <CommonPopup
        image={diyPopup}
        popup={popup}
        setMyPopup={setPopup}
        heading="Coming soon...!"
        desc="Feature will be available soon....."
        secondBtn={true}
      />
    </div>
  );
};

export default ResourcesAndCampaigns;
