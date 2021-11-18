import React, { useState, useEffect, useRef } from "react";
import Geocode from "react-geocode";

export const Geocoder = () => {
  const [place, setPlace] = useState<string>("");
  const [word, setWord] = useState<any>({
    latitude: null,
    longitude: null,
  });
  const [lat, setLat] = useState<number>(0)
  const [lng, setLng] = useState<number>(0)


  const GeoData = () => {
    Geocode.setApiKey("AIzaSyDqIaKCNpzJ-svGUEpO0354pil78uEI9O0");

    console.log(Geocode);
    Geocode
    .fromAddress(place)
    .then(
      (response: any) => {
        const { lat, lng } = response.results[0].geometry.location ;
        setLat(lat)
        setLng(lng)
        console.log(lat, lng);
      },
      (error:any) => {
        console.error(error);
      }
      
    );
    

  };




  return (
    <div>
      <h1>Geocoding</h1>
      <input
        type="text"
        onChange={(e) => {
          setPlace(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          GeoData();
        }}
      >
        search
      </button>

      <div>latitude : {lat}</div>
      <div>longitude : {lng}</div>
    </div>
  );
};
