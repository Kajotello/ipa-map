import React from 'react'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import zoomPlugin from 'chartjs-plugin-zoom'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import dataset from './rsc/chart354.json'
import 'chartjs-adapter-moment'
import { getRelativePosition } from 'chart.js/helpers'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Title,
    Tooltip,
    Legend,
    zoomPlugin,
    {
        id: 'getRelativePosition',
        getRelativePosition,
    },
    {
        id: 'annotationLine',
        afterDraw: function (chart, easing, options) {
            const ctx = chart.ctx
            const topY = chart.scales['y'].top
            const bottomY = chart.scales['y'].bottom
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(options.position, topY)
            ctx.lineTo(options.position, bottomY)
            ctx.lineWidth = 3
            ctx.strokeStyle = '#cf34eb'
            ctx.stroke()
            ctx.restore()
        },
    }
)

let data = { datasets: [] }

for (let key in dataset) {
    //let color = `rgb(${parseInt(Math.random()*255)}, ${parseInt(Math.random()*255)}, ${parseInt(Math.random()*255)})`
    data.datasets.push({
        label: key,
        data: dataset[key],
        borderColor: 'rgb(0,0,0)',
        backgroundColor: 'rgb(0,0,0)',
    })
}

export function MyChart(props) {
    const [chartRef] = useState(React.createRef())

    const [options, setOptions] = useState({
        responsive: true,
        elements: {
            point: {
                radius: 0,
            },
        },
        animation: {
            duration: 0,
        },
        tooltips: {
            intersect: false,
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: 'Wykres ruchu',
            },
            annotationLine: {
                position: 0,
            },
            // zoom: {
            //   zoom: {
            //     wheel: {
            //       enabled: true,
            //     },
            //     pinch: {
            //       enabled: true
            //     },
            //     mode: 'xy',
            //   }
            // }
        },
        scales: {
            x: {
                type: 'time',
                min: '2020-11-11 00:00:00',
                max: '2020-11-11 23:59:59',
                time: {
                    parser: 'YYYY-MM-DD HH:mm:ss',
                    unit: 'hour',
                    displayFormats: {
                        hour: 'HH:mm',
                    },
                    tooltipFormat: 'D MMM YYYY - HH:mm:ss',
                },
            },
            y: {
                min: 0.0,
                max: 94.0,
            },
        },
    })

    useEffect(() => {
        if (chartRef.current !== null) {
            var chart = chartRef.current
            chart.update()
        }

        setOptions((prevOptions) => {
            prevOptions.plugins.annotationLine.position =
                (props.currentTime / (60 * 60 * 24)) * chart.chartArea.width +
                (chart.width - chart.chartArea.width) -
                3
            return prevOptions
        })
    }, [props.currentTime, chartRef])

    const onClick = (event) => {
        const canvasPosition = getRelativePosition(event, chartRef.current)
        const selectedTime =
            ((canvasPosition.x -
                (chartRef.current.width - chartRef.current.chartArea.width)) /
                chartRef.current.chartArea.width) *
            60 *
            60 *
            24
        props.goToTime(selectedTime)
    }
    return (
        <Box sx={{ ml: 2 }}>
            <Line
                redraw={true}
                options={options}
                data={data}
                ref={chartRef}
                onClick={onClick}
            />
        </Box>
    )
}
