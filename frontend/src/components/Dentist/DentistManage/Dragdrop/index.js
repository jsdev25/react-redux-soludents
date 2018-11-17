import React, { Component } from "react";
import { Upload, Icon, message } from 'antd';

const Dragger = Upload.Dragger;
const props = {
    name: 'file',
    multiple: true,
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange(info) {
        const status = info.file.status;

        if (info.file.size > 10240000) {
            message.error('Maximun size 10MB!');
            return false;
        }

        if (info.file.name.slice(-4) === '.pdf' ||
            info.file.name.slice(-4) === '.png' ||
            info.file.name.slice(-4) === '.doc' ||
            info.file.name.slice(-5) === '.docx' ||
            info.file.name.slice(-5) === '.xlsx' ||
            info.file.name.slice(-5) === '.jpeg') {
        } else {
            message.error('wrong file extension');
            return false;
        }

        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', info.file.status)
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class Dragdrop extends Component {
    render() {
        return (
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
            </Dragger>
        )
    }
}

export default Dragdrop;
