import './App.css'
import { MapComponent } from './MapComponents'
import { MyChart } from './Chart'
import { createTheme, Grid, ThemeProvider } from '@mui/material'
import { TrainsOnRoute } from './TrainsOnRoute'
import { useRef, useState } from 'react'
import { ToolBar } from './Toolbar'
import simulationData from './rsc/simulation354.json'

function App() {
    const [stepSize, setStep] = useState(50)
    const stepRef = useRef(stepSize)
    stepRef.current = stepSize
    const [trainsOnTrack, setTrainsOnTrack] = useState({})
    const [currentTime, setTime] = useState(15300)
    const timeRef = useRef(currentTime)
    timeRef.current = currentTime
    const [clock, setClock] = useState(0)

    const theme = createTheme({
        palette: {
            type: 'light',
            primary: {
                main: '#FFBC42',
            },
            secondary: {
                main: '#ffffff',
            },
        },
        breakpoints: {
            values: {
                xxs: 0,
                xs: 450,
                sm: 600,
                md: 1000,
                lg: 1200,
                xl: 1536,
                xxl: 1900,
            },
        },
    })

    function handleStopClick() {
        if (clock) {
            clearTimeout(clock)
            setClock(0)
            return
        }
        upadteClock()
    }

    function upadteClock() {
        // if(!isNaN(stepRef.current))
        if (timeRef.current + parseInt(stepRef.current) > 86400) setTime(0)
        else setTime(timeRef.current + parseInt(stepRef.current))
        // else setTime(timeRef.current+50)
        const clock = setTimeout(() => {
            upadteClock()
        }, 1)
        setClock(clock)
        setTrainsOnTrack((prevTrains) => {
            let newTrainsOnTrack = JSON.parse(JSON.stringify(prevTrains))
            for (var train in newTrainsOnTrack) {
                let cursor = parseInt(
                    timeRef.current - newTrainsOnTrack[train].startTime
                )
                if (cursor > newTrainsOnTrack[train].coordinates.length - 30) {
                    delete newTrainsOnTrack[train]
                } else {
                    newTrainsOnTrack[train].position =
                        newTrainsOnTrack[train].coordinates[cursor]
                    newTrainsOnTrack[train].linePosition =
                        newTrainsOnTrack[train].linePositions[cursor]
                }
            }
            for (var key in simulationData) {
                //console.log(newTime - simulationData[key].start_time)
                if (
                    timeRef.current - simulationData[key].start_time > 0 &&
                    timeRef.current - simulationData[key].start_time <
                        simulationData[key].coordinates.length
                ) {
                    //if((simulationData[key].start_time) === newTime && ){
                    if (!(key in newTrainsOnTrack)) {
                        let cursor = parseInt(
                            timeRef.current - simulationData[key].start_time
                        )
                        console.log(cursor)
                        newTrainsOnTrack[key] = {
                            coordinates: simulationData[key].coordinates,
                            linePositions: simulationData[key].line_position,
                            position: simulationData[key].coordinates[cursor],
                            linePosition:
                                simulationData[key].line_position[cursor],
                            name: simulationData[key].name,
                            startTime: simulationData[key].start_time,
                        }
                    }
                }
            }
            return newTrainsOnTrack
        })
        return
    }

    // function handleResetClick() {
    //     setTime(0)
    //     setTrainsOnTrack({})
    // }

    function goToTime(selectedTime) {
        setTrainsOnTrack({})
        setTime(selectedTime)
    }

    return (
        <ThemeProvider theme={theme}>
            <ToolBar
                currentTime={currentTime}
                isRunning={clock ? true : false}
                actionOnStopClick={handleStopClick}
            ></ToolBar>
            <Grid
                container
                spacing={1}
            >
                <Grid
                    item
                    xs={6}
                >
                    <MapComponent
                        trainsOnTrack={Object.values(trainsOnTrack)}
                    ></MapComponent>
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <Grid container>
                        <Grid
                            item
                            xs={12}
                        >
                            <MyChart
                                currentTime={currentTime}
                                goToTime={goToTime}
                            ></MyChart>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <TrainsOnRoute
                                trainsOnTrack={Object.values(trainsOnTrack)}
                                setStep={setStep}
                                currentStep={stepSize}
                            ></TrainsOnRoute>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default App
