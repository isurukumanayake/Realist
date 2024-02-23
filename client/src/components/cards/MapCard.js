import React from "react";
import GoogleMapReact from "google-map-react";
import { IoLocationSharp } from "react-icons/io5";

const MapCard = ({ ad }) => {
  const defaultProps = {
    center: {
      lat: ad.location?.coordinates[1],
      lng: ad.location?.coordinates[0],
    },
    zoom: 11,
  };

  return (
    <>
      {ad?.location?.coordinates?.length && (
        <div style={{ height: "300px", width: "620px", marginBottom: "30px" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <div
              lat={ad?.location?.coordinates[1]}
              lng={ad?.location?.coordinates[0]}
            >
              <IoLocationSharp color="red" style={{ fontSize: "20px" }} />
            </div>
          </GoogleMapReact>
        </div>
      )}
    </>
  );
};

export default MapCard;
