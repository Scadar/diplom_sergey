import './App.css'
import InputCords from "../inputCords/InputCords";
import { useState} from "react";
import Chart from "../chart/Chart";
import {Button} from "antd";

function App() {
    const [calculatedCords, setCalculatedCords] = useState([])
    const [realCords, setRealCords] = useState([])
    const [diffCords, setDiffCords] = useState([])

    const [chart, setChart] = useState(false)
    return (
        <div className="container">
            <div className='App'>
                <InputCords
                    calculatedCords={calculatedCords}
                    setCalculatedCords={setCalculatedCords}
                    realCords={realCords}
                    setRealCords={setRealCords}
                    diffCords={diffCords}
                    setDiffCords={setDiffCords}
                />
                <Button onClick={() => setChart(!chart)}>{chart ? <span>Скрыть график</span> : <span>Показать график</span>}</Button>
                {chart && <Chart/>}
            </div>
        </div>
    )
}

export default App;
