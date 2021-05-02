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
import {Button, Divider, message} from "antd";
import Big from "big.js";
import {arrCordsToXYZ} from "../../utils/arrCordsToXYZ";
import {setStandardDeviation} from "../../store/alg/alg";

const InputCords = () => {

    const {stringCalculatedCords, stringRealCords, diffCords: arr} = useSelector(state => state.cords)
    const dispatch = useDispatch()

    const [textAreaHeight, setTextAreaHeight] = useState(400)

    const getBigArrFromText = (text, errorText) => {
        const stringArr = text.split(/\s+/)
        let isError = false
        let bigArr = []
        if (stringArr.length % 3 === 0) {
            bigArr = stringArr.map(value => {
                const replaceString = value.replace(',', '.')
                if (!replaceString) {
                    isError = true
                    return new Big(0)
                }
                return new Big(replaceString)
            })
        }

        if (isError) {
            message.error(errorText)
            return []
        }

        return bigArr
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
            const calcArr = getBigArrFromText(stringCalculatedCords, 'Ошибка ввода рассчитанных координат')
            const realArr = getBigArrFromText(stringRealCords, 'Ошибка ввода реальных координат')
            if (calcArr.length !== realArr.length) {
                message.error('Кол-во рассчитанных и реальных координат должно быть одинаковым')
                return
            }
            if (calcArr.length % 3 !== 0) {
                message.error('Неверные рассчитанные координаты')
                return
            }
            if (realArr.length % 3 !== 0) {
                message.error('Неверные реальные координаты')
                return
            }
            dispatch(setCalculatedCords(calcArr))
            dispatch(setRealCords(realArr))
            const tempDiffArr = getDiffArr(calcArr, realArr)
            dispatch(setDiffCords(tempDiffArr))
            standardDeviation(tempDiffArr)
        } else {
            message.error('Заполните координаты')
        }
    }

    const download = () => {
        const element = document.createElement("a");
        const file = new Blob([bigToString(arr)], {type: 'text/plain'});
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
        if (!cords) {
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
    const getCsvData = () => {
        return arrCordsToXYZ(arr)
    }

    const getDeviation = (arr, middle) => {
        let result = new Big(0)
        for (let i = 0; i < arr.length; i++) {
            let value = arr[i].minus(middle)
            value = value.pow(2)
            result = result.plus(value)
        }
        return result.div(arr.length).sqrt()
    }

    const standardDeviation = (arr) => {
        if(arr && arr.length !== 0){
            let sumX = new Big(0)
            let sumY = new Big(0)
            let sumZ = new Big(0)
            const arrX = []
            const arrY = []
            const arrZ = []

            for (let i = 0; i < arr.length; i++) {
                if ((i + 1) % 3 === 1) {
                    sumX = sumX.plus(arr[i])
                    arrX.push(arr[i])
                }
                if ((i + 1) % 3 === 2) {
                    sumY = sumY.plus(arr[i])
                    arrY.push(arr[i])
                }
                if ((i + 1) % 3 === 0) {
                    sumZ = sumZ.plus(arr[i])
                    arrZ.push(arr[i])
                }
            }

            let middleX = sumX.div(arrX.length)
            let middleY = sumY.div(arrY.length)
            let middleZ = sumZ.div(arrZ.length)

            dispatch(setStandardDeviation({
                x: getDeviation(arrX, middleX),
                y: getDeviation(arrY, middleY),
                z: getDeviation(arrZ, middleZ)
            }))
        }
    }
    return (
        <>
            <div className="InputCords_inputs">
                <InputTextArea
                    width={25}
                    marginRight={30}
                    title='Рассчитанные координаты'
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
                    cords={arr}
                    textAreaHeight={textAreaHeight}
                    setTextAreaHeight={setTextAreaHeight}
                    diff
                    download={download}
                    bigToString={bigToString}
                    csvData={getCsvData()}
                />
            </div>
            <Divider style={{borderColor: '#e2e2e2', marginTop: 30}}>
                <Button type={'primary'} onClick={onCalculate} size={'large'}>Расчет</Button>
            </Divider>
        </>

    );
};

export default InputCords;