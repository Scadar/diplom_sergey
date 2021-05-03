import React, {useEffect, useState} from 'react';
import {Card, Modal} from "antd";
import {useSelector} from "react-redux";
import Plot from 'react-plotly.js';
import kmeans from 'node-kmeans'
import {usePrevious} from "../../hooks/usePrev";


const Algorithms = () => {

    const {standardDeviation} = useSelector(state => state.alg)
    const {diffCords} = useSelector(state => state.cords)
    const [graphData, setGraphData] = useState([])

    const prevDiffCords = usePrevious(diffCords)

    const gridStyle = {
        width: '50%',
        cursor:'pointer',
        textAlign: 'center',
    }

    useEffect(() => {
        if(diffCords && diffCords.length > 0 && (JSON.stringify(diffCords) !== JSON.stringify(prevDiffCords))){
            const getKMeansData = (arr) => {
                const result = []
                let point = []
                for (let i = 0; i < arr.length; i++) {
                    if ((i + 1) % 3 === 1) {
                        point.push(arr[i].toFixed())
                    }
                    if ((i + 1) % 3 === 2) {
                        point.push(arr[i].toFixed())
                    }
                    if ((i + 1) % 3 === 0) {
                        point.push(arr[i].toFixed())
                        result.push(point)
                        point = []
                    }
                }
                return result
            }
            console.log("useEffect")
            let graph1
            let graph2
            kmeans.clusterize(getKMeansData(diffCords), {k: 2}, (err, res) => {
                if (err) {
                    console.error(err);
                }
                else {
                    graph1 = {
                        x: getPointFromArr(res[0].cluster, 'x'),
                        y: getPointFromArr(res[0].cluster, 'y'),
                        z: getPointFromArr(res[0].cluster, 'z'),
                        mode: 'markers',
                        type: 'scatter3d',
                        marker: {
                            color: 'rgb(46,16,175)',
                            size: 4
                        }
                    }
                    graph2 = {
                        x: getPointFromArr(res[1].cluster, 'x'),
                        y: getPointFromArr(res[1].cluster, 'y'),
                        z: getPointFromArr(res[1].cluster, 'z'),
                        mode: 'markers',
                        type: 'scatter3d',
                        marker: {
                            color: 'rgb(182,19,19)',
                            size: 4
                        }
                    }
                    setGraphData([graph1, graph2])
                }
            })
        }
    }, [diffCords, graphData, prevDiffCords])

    const onStandardDeviation = () => {
        Modal.info({
            title: 'Среднеквадратическое отклонение',
            content: (
                <div style={{marginTop: 30}}>
                    <p>X: {standardDeviation.x.toFixed()}</p>
                    <p>Y: {standardDeviation.y.toFixed()}</p>
                    <p>Z: {standardDeviation.z.toFixed()}</p>
                </div>
            )
        })
    }



    const getPointFromArr = (arr, point) => {
        const arrX = []
        const arrY = []
        const arrZ = []

        for (let i = 0; i < arr.length; i++) {
            arrX.push(arr[i][0])
            arrY.push(arr[i][1])
            arrZ.push(arr[i][2])
        }
        if(point === 'x'){
            return arrX
        }
        if (point === 'y') {
            return arrY
        }
        if(point === 'z') {
            return arrZ
        }
    }

    const kMeans = () => {
        Modal.info({
            title: 'K средних',
            content: (
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Plot
                        data={graphData}
                        layout={{
                            width: 900,
                            height: 600,
                            title: `K-means`
                        }}
                    />
                </div>

            ),
            width: '100%'
        })
    }

    return (
        <div style={{marginTop: 40}}>
            <Card title={<div style={{textAlign: 'center'}}>Алгоритмы</div>}>
                <Card.Grid style={gridStyle} onClick={kMeans}>Метод k-средних</Card.Grid>
                <Card.Grid style={gridStyle} onClick={onStandardDeviation}>Среднеквадратическое отклонение</Card.Grid>
            </Card>
        </div>
    );
};

export default Algorithms;