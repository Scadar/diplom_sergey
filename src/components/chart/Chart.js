import React, {useRef} from 'react';
import {Line} from '@ant-design/charts';
import './Chart.css'
import {useSelector} from "react-redux";
import {Button} from "antd";
const Chart = () => {
    const {diffCords} = useSelector(state => state.cords)
    const downloadRef = useRef();
    const getData = () => {
        let xIndex = 0
        let yIndex = 0
        let zIndex = 0
        const result = []
        for (let i = 0; i < diffCords.length; i++) {
            const number = parseFloat(diffCords[i].toFixed())
            if ((i + 1) % 3 === 1) {
                result.push({
                    index: xIndex,
                    value: number,
                    type: 'X'
                })
                xIndex++
            } else if ((i + 1) % 3 === 2) {
                result.push({
                    index: yIndex,
                    value: number,
                    type: 'Y'
                })
                yIndex++
            } else if ((i + 1) % 3 === 0) {
                result.push({
                    index: zIndex,
                    value: number,
                    type: 'Z'
                })
                zIndex++
            }
        }
        return result
    }

    const downloadImage = () => {
        downloadRef.current?.downloadImage();
    }

    let config = {
        data: getData(),
        xField: 'index',
        yField: 'value',
        seriesField: 'type',
        yAxis: {
            label: {
                formatter: function formatter(v) {
                    return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
                        return ''.concat(s, ',');
                    });
                },
            },
        },
        color: ['#1979C9', '#D62A0D', '#FAA219'],
    };
    return (
        <div className='Chart'>
            <Button onClick={downloadImage} style={{marginBottom: 10}}>Скачать график</Button>
            <Line {...config} chartRef={downloadRef}/>
        </div>
    )
}

export default Chart;