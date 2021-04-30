import './App.css'
import InputCords from "../inputCords/InputCords";
import {useState} from "react";
import Chart from "../chart/Chart";

function App() {
    const [calculatedCords, setCalculatedCords] = useState([])
    const [realCords, setRealCords] = useState([])
    const [diffCords, setDiffCords] = useState([])

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
                <Chart realCords={realCords} diffCords={diffCords} calculatedCords={calculatedCords} />
            </div>
        </div>
    )
}

export default App;
