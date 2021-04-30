import React from 'react';
import {Input} from 'antd';
import Uploader from "../uploader/Uploader";
import {DownloadOutlined} from "@ant-design/icons";

const {TextArea} = Input;

const InputTextArea = ({width, marginRight, title, cords, setCords, setTextAreaHeight, textAreaHeight, diff, calc, real, download, bigToString}) => {
    const style = {}

    if (width) {
        style.width = `${width}%`
    }
    if (marginRight) {
        style.marginRight = marginRight
    }


    return (
        <div className='InputTextArea' style={style}>
            <span>{title}</span>
            {calc && <Uploader calc/>}
            {real && <Uploader real/>}
            {diff && <DownloadOutlined style={{cursor: 'pointer', fontSize: 18, marginLeft: 15}} onClick={download}/>}
            {diff
                ?
                <TextArea
                    value={bigToString(cords)}
                    style={{height: textAreaHeight}}
                    onResize={(size) => {
                        setTextAreaHeight(size.height)
                    }}
                />
                :
                <TextArea
                    value={cords}
                    onChange={(e) => setCords(e.target.value)}
                    style={{height: textAreaHeight}}
                    onResize={(size) => {
                        setTextAreaHeight(size.height)
                    }}
                />
            }

        </div>
    )
}

export default InputTextArea