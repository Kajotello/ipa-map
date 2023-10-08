import { Grid, Typography, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css'
import TrainIcon from '@mui/icons-material/Train'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Fab from '@mui/material/Fab'

export function MyClock(props) {
    return (
        <Grid
            container
            sx={{ alignItems: 'center', justifyContent: 'center' }}
        >
            <Grid
                item
                xs={1}
            >
                <Box sx={{ mt: 2, mb: 2, ml: 0 }}>
                    <Clock
                        value={new Date(props.currentTime * 1000 - 3600000)}
                        renderNumbers={false}
                        size={90}
                        renderSecondHand={false}
                    ></Clock>
                </Box>
            </Grid>
            <Grid
                item
                xs={6}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                >
                    <Typography
                        color="secondary"
                        fontSize={60}
                        fontWeight="Bold"
                        sx={{ textAlign: 'center', mt: 2, mr: 3 }}
                    >
                        {Math.floor(props.currentTime / 3600)
                            .toString()
                            .padStart(2, '0')}
                        :
                        {Math.floor(
                            props.currentTime / 60 -
                                Math.floor(props.currentTime / 3600) * 60
                        )
                            .toString()
                            .padStart(2, '0')}
                        :
                        {Math.floor(props.currentTime % 60)
                            .toString()
                            .padStart(2, '0')}{' '}
                    </Typography>
                    {props.isRunning ? (
                        <Fab
                            aria-label="upload picture"
                            sx={{
                                bgcolor: '#f72525',
                                '&:hover': { bgcolor: '#f72525' },
                            }}
                            component="label"
                            onClick={props.actionOnStopClick}
                        >
                            <PauseIcon sx={{ fontSize: 30 }} />
                        </Fab>
                    ) : (
                        <Fab
                            aria-label="upload picture"
                            component="label"
                            sx={{
                                bgcolor: '#02ad41',
                                '&:hover': { bgcolor: '#00bd45' },
                            }}
                            onClick={props.actionOnStopClick}
                        >
                            <PlayArrowIcon sx={{ fontSize: 30 }} />
                        </Fab>
                    )}
                </Stack>
            </Grid>
            <Grid
                item
                xs={0.2}
            >
                <TrainIcon
                    color="secondary"
                    sx={{ fontSize: 50 }}
                />
            </Grid>
            <Grid
                item
                xs={2}
            >
                <Typography
                    fontSize={16}
                    color="secondary"
                    fontWeight="Bold"
                    sx={{ ml: 5 }}
                >
                    Linia kolejowa nr 354 <br /> Pozńań PoD - Piła Główna <br />{' '}
                    Długość: 92,538 km
                </Typography>
            </Grid>
        </Grid>
    )
    //temmporary 3600000 because of bad
}
