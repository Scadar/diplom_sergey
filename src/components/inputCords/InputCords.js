import './InputCords.css';
import InputTextArea from "../inputTextArea/InputTextArea";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setCalculatedCords,
    setDiffCords,
    setRealCords,
    setStringCalculatedCords,
    setStringDiffCords,
    setStringRealCords
} from "../../store/cords/cords";
import {Button} from "antd";
import Big from "big.js";

const InputCords = () => {

    const {stringCalculatedCords, stringRealCords, diffCords} = useSelector(state => state.cords)
    const dispatch = useDispatch()

    const [textAreaHeight, setTextAreaHeight] = useState(400)

    const getBigArrFromText = (text) => {
        const stringArr = text.split(/\s+/)
        let bigArr = []
        if (stringArr.length % 3 === 0) {
            bigArr = stringArr.map(value => {
                const replaceString = value.replace(',', '.')
                return new Big(replaceString)
            })
        }

        if (bigArr.length % 3 !== 0) {
            console.log('error')
        } else {
            return bigArr
        }
    }

    const getDiffArr = (calcArr, realArr) => {
        if (calcArr.length === realArr.length) {
            const arr = []
            for (let i = 0; i < calcArr.length; i++) {
                arr.push((calcArr[i].minus(realArr[i])))
            }
            return arr
        }
        return []
    }

    const onCalculate = () => {
        if (stringCalculatedCords && stringRealCords) {
            const calcArr = getBigArrFromText(stringCalculatedCords)
            const realArr = getBigArrFromText(stringRealCords)
            dispatch(setCalculatedCords(calcArr))
            dispatch(setRealCords(realArr))
            dispatch(setDiffCords(getDiffArr(calcArr, realArr)))
        }
    }

    const download = () => {
        const element = document.createElement("a");
        const file = new Blob([bigToString(diffCords)], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "Отклонение.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }


    const addSpaces = (value) => {
        const space = 13
        const size = value.toString().length
        const diff = space - size
        if (diff < 1) {
            return ' '
        }
        let result = ''
        for (let i = 0; i < diff; i++) {
            result = result + String.fromCharCode(32)
        }
        return result + '\t'
    }
    const bigToString = (cords) => {
        if(!cords){
            return null
        }
        let result = ''
        for (let i = 0; i < cords.length; i++) {
            if (i > 0 && (i) % 3 === 0) {
                result = result + '\n'
            }
            result = result + cords[i] + addSpaces(cords[i])
        }
        return result
    }

    return (
        <>
            <div className="InputCords_inputs">
                <InputTextArea
                    width={25}
                    marginRight={30}
                    title='Рассчитаные координаты'
                    setCords={(value) => dispatch(setStringCalculatedCords(value))}
                    cords={stringCalculatedCords}
                    textAreaHeight={textAreaHeight}
                    setTextAreaHeight={setTextAreaHeight}
                    calc
                />
                <InputTextArea
                    width={25}
                    marginRight={30}
                    title='Реальные координаты'
                    setCords={(value) => dispatch(setStringRealCords(value))}
                    cords={stringRealCords}
                    textAreaHeight={textAreaHeight}
                    setTextAreaHeight={setTextAreaHeight}
                    real
                />
                <InputTextArea
                    width={25}
                    title='Отклонение'
                    setCords={(value) => dispatch(setStringDiffCords(value))}
                    cords={diffCords}
                    textAreaHeight={textAreaHeight}
                    setTextAreaHeight={setTextAreaHeight}
                    diff
                    download={download}
                    bigToString={bigToString}
                />
            </div>
            <div style={{display: "flex", justifyContent: 'center', marginTop: 20}}>

                <Button onClick={onCalculate}>Расчет</Button>
            </div>
        </>

    );
};

export default InputCords;