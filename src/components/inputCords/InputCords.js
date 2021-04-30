import './InputCords.css';
import InputTextArea from "../inputTextArea/InputTextArea";
import {useEffect, useState} from "react";

const InputCords = (
    {
        calculatedCords, setCalculatedCords,
        realCords, setRealCords,
        diffCords, setDiffCords
    }) => {

    const [textAreaHeight, setTextAreaHeight] = useState(400)
    useEffect(() => {
        if (calculatedCords.length === realCords.length) {
            const arr = []
            for (let i = 0; i < calculatedCords.length; i++) {
                arr.push((calculatedCords[i].minus(realCords[i])))
            }
            setDiffCords(arr)
        }
    }, [calculatedCords, realCords, setDiffCords])

    return (
        <div className="InputCords_inputs">
            <InputTextArea
                width={25}
                marginRight={30}
                title='Рассчитаные координаты'
                setCords={setCalculatedCords}
                textAreaHeight={textAreaHeight}
                setTextAreaHeight={setTextAreaHeight}
            />
            <InputTextArea
                width={25}
                marginRight={30}
                title='Реальные координаты'
                setCords={setRealCords}
                textAreaHeight={textAreaHeight}
                setTextAreaHeight={setTextAreaHeight}
            />
            <InputTextArea
                width={25}
                title='Отклонение'
                cords={diffCords}
                textAreaHeight={textAreaHeight}
                setTextAreaHeight={setTextAreaHeight}
            />
        </div>
    );
};

export default InputCords;