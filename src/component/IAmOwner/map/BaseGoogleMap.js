import React, { useEffect, useMemo } from "react";
import { useState, useCallback } from "react";
import {
  GoogleMap,
  MarkerF,
  MarkerClustererF,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Box } from "@mui/material";
import { _baseMAP } from "../../../../consts";
import mapImage from "../../../../public/Images/mapIcon.svg";

const GoogleMapOptions = {
  tilt: 0,
  zoomControl: false,
  streetViewControl: false,
  disableDefaultUI: true,
  gestureHandling: "greedy",
};

const BaseMap = ({ height, width, markersData }) => {
  const [map, setMap] = React.useState(null);
  const [isInteracted, setIsInteracted] = React.useState(false);
  const [defaultZoom] = useState(12);
  const [mapZoom, setMapZoom] = useState(map?.getZoom());
  const [geocoder, setGeocoder] = useState(null);

  console.log({ markersData });

  // const handleOnLoad = (map) => {
  //   const geocoder = new window.google.maps.Geocoder();
  //   const bounds = new google.maps.LatLngBounds();
  //   markers.forEach(({ position }) => bounds.extend(position));
  //   map.fitBounds(bounds);
  //   setMap(map);
  //   setGeocoder(geocoder);
  // };

  const onLoad = useCallback(
    (map) => {
      const geocoder = new window.google.maps.Geocoder();
      const bounds = new window.google.maps.LatLngBounds(center);

      map.fitBounds(bounds);

      setMap(map);
      setGeocoder(geocoder);
    },
    [center]
  );

  //for_zoom
  const onInterract = useCallback(() => {
    if (!isInteracted) {
      setIsInteracted(true);
    }
  }, [isInteracted]);

  useEffect(() => {
    if (!isInteracted && mapZoom) {
      map?.setZoom(defaultZoom);
    }
  }, [isInteracted, defaultZoom, map, mapZoom]);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const [activeMarker, setActiveMarker] = React.useState(null);

  const [center, setCenter] = useState(() => {
    // if (innerValue?.geometry?.location) return innerValue?.geometry?.location;
    return {
      lat: +markersData?.properties?.data[0]?.address?.latitude || -23.5702073,
      lng: +markersData?.properties?.data[0]?.address?.longitude || -46.6591174,
    };
  });

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <GoogleMap
      onLoad={onLoad}
      mapContainerStyle={{ height: height, width: width }}
      options={GoogleMapOptions}
      defaultCenter={center}
      center={center}
      onZoomChanged={() => {
        setMapZoom(() => map?.getZoom() || defaultZoom);
      }}
      onResize={onInterract}
      onDragStart={onInterract}
    >
      {/* <MarkerF position={{ lat: 53, lng: 9 }} />
      <MarkerClustererF>
        {(clusterer) => (
          <>
            {markers.map((marker) => (
              <MarkerF
                key={marker.id}
                position={marker.position}
                clusterer={clusterer}
              />
            ))}
          </>
        )}
      </MarkerClustererF> */}
      {markersData?.properties?.data?.map(({ address, id }) => (
        <MarkerF
          key={id}
          position={{ lat: +address?.latitude, lng: +address?.longitude }}
          onClick={() => handleActiveMarker(id)}
          icon={{
            url: mapImage.src, // Ensure the path is resolved correctly
            scaledSize: new window.google.maps.Size(100, 100), // Adjust size as needed
          }}
          // icon={{
          //   // path: google.maps.SymbolPath.CIRCLE,
          //   url: require("../../../../public/Images/mapIcon.svg"),
          //   fillColor: "#EB00FF",
          //   scale: 7,
          // }}
        >
          {/* {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <Box sx={{ mx: 2, my: 1 }}>{name}</Box>
            </InfoWindow>
          ) : null} */}
        </MarkerF>
      ))}
    </GoogleMap>
  );
};

const Map = React.memo(BaseMap);

const BaseGoogleMap = ({ height, width, markersData }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: _baseMAP,
  });

  return isLoaded ? (
    <Map width={"100%"} height={height || "100%"} markersData={markersData} />
  ) : null;
};

export default BaseGoogleMap;
