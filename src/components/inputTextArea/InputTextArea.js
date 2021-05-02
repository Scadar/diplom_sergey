import React from 'react';
import {Button, Dropdown, Input, Menu} from 'antd';
import Uploader from "../uploader/Uploader";
import CsvDownloader from 'react-csv-downloader'
const {TextArea} = Input;

const InputTextArea = ({width, marginRight, title, cords, setCords, setTextAreaHeight, textAreaHeight, diff, calc, real, download, bigToString, csvData}) => {
    const style = {}

    if (width) {
        style.width = `${width}%`
    }
    if (marginRight) {
        style.marginRight = marginRight
    }
    const columns = [{
        id: 'x',
        displayName: 'X'
    }, {
        id: 'y',
        displayName: 'Y'
    }, {
        id: 'z',
        displayName: 'Z'
    }];
    const menu = (
        <Menu>
            <Menu.Item key="0" onClick={download}>
                <span >
                    TXT
                </span>
            </Menu.Item>
            <Menu.Item key="1">
                <CsvDownloader
                    filename="Отклонение"
                    separator=";"
                    columns={columns}
                    datas={csvData}>
                    EXCEL
                </CsvDownloader>
            </Menu.Item>
        </Menu>
    )

    return (
        <div className='InputTextArea' style={style}>
            <span style={{fontSize: 17, fontWeight: 400}}>{title}</span>
            {diff
                ?
                <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <TextArea
                        value={bigToString(cords)}
                        style={{height: textAreaHeight}}
                        onResize={(size) => {
                            setTextAreaHeight(size.height)
                        }}
                    />
                    {diff && (
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button style={{marginTop: 15}}>
                                Сохранить
                            </Button>
                        </Dropdown>
                    )}
                </div>
                :
                <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <TextArea
                        value={cords}
                        onChange={(e) => setCords(e.target.value)}
                        style={{height: textAreaHeight, marginBottom: 15}}
                        onResize={(size) => {
                            setTextAreaHeight(size.height)
                        }}
                    />
                    {calc && <Uploader calc/>}
                    {real && <Uploader real/>}
                </div>

            }

        </div>
    )
}

export default InputTextArea