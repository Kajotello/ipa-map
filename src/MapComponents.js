import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Popup, GeoJSON, Marker } from 'react-leaflet'
import './Map.css'
import data from './rsc/line354.json'
import trainIcon from './icon.png'
import L from 'leaflet'
import { Box } from '@mui/system'

const icon = L.icon({
    iconSize: [45, 45],
    popupAnchor: [2, -20],
    iconUrl: trainIcon,
})

const position = [52.785, 16.8]
// var dataStory = JSON.parse(JSON.stringify(data2))
// var dataStoryReversed = JSON.parse(JSON.stringify(data2.reverse()))

export function MapComponent(props) {
    //  const myData = simulationData['53102_3 WITOS'].coordinates;

    // const [prevPosition, setPrevPosition ] = useState(myData[0])
    // const [nextPosition, setNextPosition ] = useState(myData[1])

    return (
        <>
            <Box sx={{ ml: 2 }}>
                <MapContainer
                    center={position}
                    zoom={9}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON
                        data={data.features[0]}
                        color={'#218380'}
                    />
                    {props.trainsOnTrack.map((train) => (
                        <Marker
                            key={train.name}
                            icon={icon}
                            position={train.position}
                        >
                            <Popup>{train.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </Box>
        </>
    )
}
