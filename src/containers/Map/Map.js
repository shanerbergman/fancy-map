import React,{useState,useEffect} from "react"
import MapGL from 'react-map-gl';
import {MAP_BOX_TOKEN} from "../../../TOKEN"
const MAPBOX_TOKEN = MAP_BOX_TOKEN; 

const Map = () => {
    const [viewport, setViewport] = useState({
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14,
        bearing: 0,
        pitch: 0
      });

      return (
          <div>
<MapGL
          {...viewport}
          width="99vw"
          height="97vh"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={setViewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
          </div>
        
      )

}


export default Map