import React, {useRef, useEffect} from "react"
import mapboxgl from "mapbox-gl"

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

export const layers = {
    sky: {
        id: "sky",
        type: "sky",
        paint: {
            "sky-type": "atmosphere",
            "sky-atmosphere-sun": [0.0, 90.0],
            "sky-atmosphere-sun-intensity": 15,
        },
    },
    hillshade: {
        id: "hillshade",
        type: "hillshade",
        source: "mapbox-dem",
        paint: {
            "hillshade-exaggeration": 1,
            "hillshade-highlight-color": "red"
        },
    }


}

export const ThreeMap = () => {
    const mapContainer = useRef()

    useEffect(() => {
        // https://docs.mapbox.com/mapbox-gl-js/api/map/
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/satellite-streets-v11",
            center: [-119.99959421984575, 38.619551620333496],
            zoom: 14,
            pitch: 60
        })
        map.on("load", () => {
            map.addSource("mapbox-dem", {
                type: "raster-dem",
                url: "mapbox://mapbox.mapbox-terrain-dem-v1",
                tileSize: 512,
                maxZoom: 16,
            })
            map.setTerrain({source: "mapbox-dem", exaggeration: 1.5})
            map.addLayer(
                layers.sky
            )
        })
    }, [])

    return (
        <div
            id="map"
            ref={mapContainer}
            style={{width: "75%", height: "75vh"}}
        />
    )
}