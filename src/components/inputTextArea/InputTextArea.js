import React, {useEffect, useState} from 'react';
import {Input} from 'antd';
import Big from 'big.js';

const {TextArea} = Input;

const InputTextArea = ({width, marginRight, title, cords, setCords, setTextAreaHeight, textAreaHeight}) => {
    const [value, setValue] = useState('')
    const style = {}

    if (width) {
        style.width = `${width}%`
    }
    if (marginRight) {
        style.marginRight = marginRight
    }

    useEffect(() => {
        if (value) {
            const stringArr = value.split(/\s+/)
            let floatArr = []
            if (stringArr.length % 3 === 0) {
                floatArr = stringArr.map(value => {
                    const replaceString = value.replace(',', '.')
                    return new Big(replaceString)
                })
            }

            if (floatArr.length % 3 !== 0) {
                console.log('error')
            } else {
                setCords(floatArr)
            }
        }

    }, [value, setCords])

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
        <div className='InputTextArea' style={style}>
            <span>{title}</span>
            {cords
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
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
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