import './App.css'
import InputCords from "../inputCords/InputCords";
import React, { useState} from "react";
import Chart from "../chart/Chart";
import {Modal, Button, Card} from "antd";
import {useSelector} from "react-redux";

function App() {
    const gridStyle = {
        width: '50%',
        cursor:'pointer',
        textAlign: 'center',
    }
    const [chart, setChart] = useState(false)
    const {standardDeviation} = useSelector(state => state.alg)
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
        });
    }

    return (
        <div className="container">
            <div className='App'>
                <InputCords />
                <Button onClick={() => setChart(!chart)} className='navbar__fixed'>Показать график</Button>
                <Modal
                    title="График отклонения"
                    centered
                    visible={chart}
                    onOk={() => setChart(false)}
                    onCancel={() => setChart(false)}
                    width={'100%'}
                    footer={null}
                >
                    <Chart/>
                </Modal>
                <div style={{marginTop: 40}}>
                    <Card title={<div style={{textAlign: 'center'}}>Алгоритмы</div>}>
                        <Card.Grid style={gridStyle}>Метод k-средних</Card.Grid>
                        <Card.Grid style={gridStyle} onClick={onStandardDeviation}>Среднеквадратическое отклонение</Card.Grid>
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default App;
