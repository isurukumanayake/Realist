import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import logo from "../assets/bg.jpg";
import "./ImageGallery.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Box, Grid, Typography } from "@mui/material";
import MapCard from "../components/cards/MapCard";
import AdCard from "../components/cards/AdCard";
import ContactSeller from "../components/forms/ContactSeller";
import AdDetails from "../components/cards/AdDetails";
import CommonLayout from "../layouts/CommonLayout";
import ShimmerAd from "../components/shimmer/ShimmerAd";

dayjs.extend(relativeTime);

const AdView = () => {
  const { slug } = useParams();

  const [ad, setAd] = useState({});
  const [related, setRelated] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAd();
  }, [slug]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(
        document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
      );
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullScreenChange
      );
    };
  }, []);

  const fetchAd = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/ad/${slug}`);
      setAd(data.ad);
      setRelated(data.related);
      generatePhotos(data.ad.photos);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      navigate("/404");
    }
  };

  const generatePhotos = async (adPhotos) => {
    if (adPhotos && adPhotos.length > 0) {
      let arr = [];
      adPhotos.map((photo) => {
        arr.push({
          original: photo.Location,
          thumbnail: photo.Location,
        });
      });

      setPhotos(arr);
    } else {
      setPhotos([
        {
          original: logo,
          thumbnail: logo,
        },
      ]);
    }
  };

  return (
    <CommonLayout>
      <Box sx={{ padding: "60px 90px" }}>
        {loading ? (
          <ShimmerAd />
        ) : (
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "80%", marginRight: "20px" }}>
              <Box>
                <ImageGallery
                  items={photos}
                  showPlayButton={false}
                  showFullscreenButton={true}
                  showBullets={true}
                  showIndex={true}
                  thumbnailPosition={isFullScreen ? "bottom" : "right"}
                  disableThumbnailScroll={true}
                />
              </Box>

              <AdDetails ad={ad} />

              <MapCard ad={ad} />

              <Box>
                <Typography variant="h5" sx={{ fontWeight: 500 }}>
                  {ad?.title}
                </Typography>
                <Typography
                  variant="body1"
                  mt={1}
                  color="#454545"
                  sx={{ textAlign: "justify", whiteSpace: "pre-line" }}
                >
                  {ad?.description}
                </Typography>
              </Box>

              {related.length > 0 && (
                <Box mt={4}>
                  <Typography variant="h5" sx={{ fontWeight: 500 }} mb={2}>
                    Similar Properties
                  </Typography>
                  <Grid container spacing={5}>
                    {related.map((ad, index) => (
                      <Grid item key={index}>
                        <AdCard ad={ad} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>
            <Box sx={{ width: "20%" }}>
              <ContactSeller ad={ad} />
            </Box>
          </Box>
        )}
      </Box>
    </CommonLayout>
  );
};

export default AdView;
