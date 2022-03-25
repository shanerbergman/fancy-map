export const AIRPORTS = {
    toc: {},
  
    source: {
      id: "airports",
      type: "vector",
      tiles: [
        "https://shanebergmantileserver.com/airports3/{z}/{x}/{y}.pbf",
      ],
      maxzoom: 10,
    },
  
    layer: {
      id: "airports",
      type: "circle",
      source: "airports",
      "source-layer": "airports",
      interactive: true,
      layout: {
        visibility: "visible",
      },
      paint: {
        "circle-color": "red",
        "circle-opacity": 1,
        "circle-radius": ["interpolate", ["linear"], ["zoom"],
        5, 1,
        10, 5,
        15, 10,
        ]
      },
      metadata: {
        label: "Parcel",
        popup: true,
        filterKey: "PARCEL"
      },
    },
  };