import React from 'react';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {useDispatch} from "react-redux";
import {setStringCalculatedCords, setStringRealCords} from "../../store/cords/cords";

const Uploader = ({calc = false, real = false}) => {
    const dispatch = useDispatch()
    const props = {
        beforeUpload: file => {
            if (file.type !== 'text/plain') {
                message.error(`${file.name} is not a txt file`);
            } else {
                let reader = new FileReader()
                reader.onload = function() {
                    if(calc) {
                        dispatch(setStringCalculatedCords(reader.result))
                    }
                    if(real){
                        dispatch(setStringRealCords(reader.result))
                    }
                }
                reader.readAsText(file)
            }
            return file.type === 'text/plain' ? true : Upload.LIST_IGNORE;
        },
        maxCount: 1,
        showUploadList: false
    };
    return (
        <Upload {...props} >
            <UploadOutlined style={{cursor: 'pointer', fontSize: 18, marginLeft: 15}}/>
        </Upload>
    );
};

export default Uploader;