import { Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export function TrainsOnRoute(props) {
    return (
        <Grid container>
            <Grid item>
                <Typography sx={{ ml: 3, mt: 3 }}>
                    Pociągi na trasie:
                </Typography>
                <TableContainer
                    component={Paper}
                    sx={{ width: 500, ml: 3, mt: 1 }}
                >
                    <Table
                        sx={{ minWidth: 300 }}
                        aria-label="simple table"
                    >
                        <TableHead>
                            <TableRow sx={{ display: 'flex' }}>
                                <TableCell style={{ width: 100 }}>
                                    <b>Pociąg</b>
                                </TableCell>
                                <TableCell
                                    style={{ width: 300 }}
                                    align="left"
                                >
                                    <b>Położenie</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.trainsOnTrack.map((train) => (
                                <TableRow
                                    key={train.name}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                        display: 'flex',
                                    }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        style={{ width: 100 }}
                                    >
                                        {train.name}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        style={{ width: 300 }}
                                    >
                                        {train.linePosition}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item>
                <TextField
                    sx={{ ml: 5, mt: 5 }}
                    label="Szybkość"
                    onChange={(e) => {
                        if (e.target.value) {
                            props.setStep(parseInt(e.target.value))
                        }
                    }}
                    value={props.currentStep}
                >
                    Prędkość
                </TextField>
            </Grid>
            <Grid item>
                <Typography sx={{ mt: 5, ml: 5 }}>
                    Wykonano na podstawie danych ze strony{' '}
                    <a href="http://ipa.lovethosetrains.com/">
                        http://ipa.lovethosetrains.com/
                    </a>
                </Typography>
            </Grid>
        </Grid>
    )
}
