import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapGL from "react-map-gl";
import { setMapStyle } from "../../actions";
import { MAP_BOX_TOKEN } from "../../../TOKEN";
import { AIRPORTS } from "../../layers/airports";
import { DARK } from "../MapStyles/Dark/Dark";
import DeckGL, { IconLayer } from "deck.gl";
import * as d3 from "d3";
import destinationPoint from "../../utilities/destinationPoint";
//import Airplane from "./airplane-icon.jpg";
const MAPBOX_TOKEN = MAP_BOX_TOKEN;
const initialViewState= {
  latitude: 37.8,
  longitude: -122.4,
  zoom: 1,
  bearing: 0,
  pitch: 0,
}
const Map = () => {
  const dispatch = useDispatch();
  const mapStyle = useSelector((state) => state.mapStyle);
  const [airplanes, setAirplanes] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 1,
    bearing: 0,
    pitch: 0,
  });

  let currentFrame = null;
  let timer = null;
  let fetchEverySeconds = 500;
  let framesPerFetch = fetchEverySeconds * 30; // 60fps, 10 second intervals

  const onLoad = () => {
    const style = Object.assign({}, mapStyle);
    style.sources["airports"] = AIRPORTS.source;
    style.layers.push(AIRPORTS.layer);
    dispatch(setMapStyle(style));
  };

  const startAnimation = () => {
    if (timer) {
      timer.stop();
    }
    currentFrame = 0;
    timer = d3.timer(animationFrame);
  };

  const animationFrame = () => {
    //let { airplanes } = this.state;
    let newPlanes = airplanes;
    newPlanes = newPlanes.map((d) => {
      const [longitude, latitude] = d.interpolatePos(
        currentFrame / framesPerFetch
      );
      return {
        ...d,
        longitude,
        latitude,
      };
    });
    currentFrame += 1;
    setAirplanes(newPlanes);
    //this.setState({ airplanes });
  };

  const fetchAirplanes = () => {
    /*&d3.json("https://opensky-network.org/api/states/all")
    .then(({ states }) => {
      setAirplanes(
        states.map((d) => ({
          callsign: d[1],
          longitude: d[5],
          latitude: d[6],
          velocity: d[9],
          altitude: d[13],
          origin_country: d[2],
          true_track: -d[10],
          interpolatePos: d3.geoInterpolate(
            [d[5], d[6]],
            destinationPoint(d[5], d[6], d[9] * fetchEverySeconds, d[10])
          ),
        }))
      )
      console.log("states",states)
      debugger
    }
     
    )*/
  };

  useEffect(() => {
    const style = JSON.parse(JSON.stringify(DARK));
    dispatch(setMapStyle(style));
    fetchAirplanes();
  }, []);

  useEffect(() => {
    if (airplanes) {
      startAnimation();
      setTimeout(fetchAirplanes(), fetchEverySeconds * 1000);
    }
  }, [airplanes]);

  const layers = [
    new IconLayer({
        id: "airplanes",
        data: airplanes,
        pickable: false,
        iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
        iconMapping: {
          marker: {
                x: 0,
                y: 0,
                width: 512,
                height: 512
            }
        },
        sizeScale: 20,
        getPosition: d => [d.longitude, d.latitude],
        getIcon: d => "airplane",
        getAngle: d => 45 + (d.true_track * 180) / Math.PI
    })
];


 
  return (
    <div>
      {mapStyle && (
       
          <MapGL
            {...viewport}
            width="99vw"
            height="97vh"
            mapStyle={mapStyle}
            onLoad={onLoad}
            onViewportChange={setViewport}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
       
      )}
    </div>
  );
};

export default Map;
