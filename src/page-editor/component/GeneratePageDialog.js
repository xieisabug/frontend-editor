import {Button, Modal} from "antd";
import * as PropTypes from "prop-types";
import React from "react";
import {copyToClipboard} from "../../Utils";

export default function GeneratePageDialog(props) {
    let metaData = props.metaData.map(i => { // 因为我是以380为页面宽度的，所以映射到小程序760rpx需要乘以2
        return Object.assign({}, i, {
            x: i.x * 2,
            y: i.y * 2,
            width: i.width * 2,
            height: i.height * 2,
            borderWidth: i.borderWidth * 2
        })
    });

    function copy() { // 复制
        copyToClipboard(JSON.stringify(metaData, undefined, 4));
    }

    console.log(metaData)

    return [
        <Modal
            title="生成页面"
            visible={props.mainDialogIsOpen}
            okText="完成"
            onOk={props.closeExportDialog}
            onCancel={props.closeExportDialog}
            cancelButtonProps={{hidden: true}}
            zIndex={100000}
        >
            <p>生成页面有三个方式：</p>
            <div>
                <p>1.获取页面元数据自己处理。适用于想自己做页面解析或者某些没有支持的平台使用元数据进行自己支持的情况。</p>
                <div>
                    <Button onClick={props.openMetaDataDialog}>获取元数据</Button>
                </div>
            </div>
            <div>
                <p>2.直接下载页面文件。适用于生成文件自己编写逻辑层或者页面为纯展示页面的情况。</p>
                <div>
                    <Button>下载</Button>
                </div>
            </div>
            <div>
                <p>3.下载通用处理文件使用元数据。适用于有后台且想要动态的返回元数据进行不同页面展示的情况。</p>
                <div>
                    <Button>获取通用文件</Button>
                    <Button>获取元数据</Button>
                </div>
            </div>
        </Modal>,
        <Modal
            title="元数据"
            visible={props.metaDataDialogIsOpen}
            okText="完成"
            onOk={props.closeMetaDataDialog}
            onCancel={props.closeMetaDataDialog}
            cancelButtonProps={{hidden: true}}
            zIndex={100000}
            width={800}
        >
            <div>
                <Button onClick={copy}>复制</Button>
            </div>
            <pre>
                {JSON.stringify(metaData, undefined, 4)}
            </pre>
        </Modal>
    ];
}

GeneratePageDialog.propTypes = {
    mainDialogIsOpen: PropTypes.bool,
    closeExportDialog: PropTypes.func,
    openMetaDataDialog: PropTypes.func,
    closeMetaDataDialog: PropTypes.func,
    metaDataDialogIsOpen: PropTypes.bool,
    metaData: PropTypes.array,
};