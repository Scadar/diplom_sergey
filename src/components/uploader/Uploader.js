import React from 'react';
import {Upload, message, Button} from 'antd';
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
                        dispatch(setStringCalculatedCords(reader.result.trim()))
                    }
                    if(real){
                        dispatch(setStringRealCords(reader.result.trim()))
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
            <Button>Загрузить</Button>
        </Upload>
    );
};

export default Uploader;