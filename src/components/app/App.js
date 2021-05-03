import './App.css'
import InputCords from "../inputCords/InputCords";
import React, { useState} from "react";
import Chart from "../chart/Chart";
import {Modal, Button} from "antd";
import Algorithms from "../algorithms/Algorithms";

function App() {

    const [chart, setChart] = useState(false)



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
                <Algorithms />
            </div>
        </div>
    )
}

export default App;
