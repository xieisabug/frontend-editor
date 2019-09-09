import {Button, Modal} from "antd";
import * as PropTypes from "prop-types";
import * as React from "react";
import {useState} from "react";
import {copyToClipboard} from "../../../Utils";
import {savePage, updatePage} from "../../page.service";

export default function GeneratePageDialog(props: any) {
    const [randomNumber, setRandomNumber] = useState(-1);

    let metaData = props.metaData.map((i: any) => { // 因为我是以380为页面宽度的，所以映射到小程序760rpx需要乘以2
        return Object.assign({}, i, {
            x: i.x,
            y: i.y,
            width: i.width,
            height: i.height,
            borderWidth: i.borderWidth
        })
    });

    function copy() { // 复制
        copyToClipboard(JSON.stringify(metaData, undefined, 4));
    }

    function savePageData() {
        if (randomNumber !== -1) {
            updatePage(randomNumber, props.metaData)
                .then(function(res) {
                    setRandomNumber(res.data);
                })
        } else {
            savePage(props.metaData)
                .then(function(res) {
                    setRandomNumber(res.data);
                })
        }
    }

    return <React.Fragment>
        <Modal
            title="生成页面"
            visible={props.mainDialogIsOpen}
            okText="完成"
            onOk={props.closeExportDialog}
            onCancel={props.closeExportDialog}
            cancelButtonProps={{hidden: true}}
            zIndex={100000}
            key={"model1"}
        >
            <p>生成页面有三个方式：</p>
            <div>
                <p>1.获取页面元数据自己处理。适用于想自己做页面解析或者某些没有支持的平台使用元数据进行自己支持的情况。</p>
                <div>
                    <Button onClick={props.openMetaDataDialog}>获取元数据</Button>
                </div>
            </div>
            <div>
                <p>2.在线预览。点击保存之后，获取随机码，扫码小程序输入随机码即可预览。（不定期清除随机码，不可长期使用）</p>
                <div>
                    <Button onClick={savePageData}>保存</Button>
                </div>
                <div hidden={randomNumber === -1}>
                    随机码：{randomNumber}
                </div>
            </div>
            <div>
                <p>3.下载通用处理文件使用元数据。适用于有后台且想要动态的返回元数据进行不同页面展示的情况。</p>
                <div>
                    <Button>获取通用文件</Button>
                    <Button>获取元数据</Button>
                </div>
            </div>
        </Modal>
        <Modal
            title="元数据"
            visible={props.metaDataDialogIsOpen}
            okText="完成"
            onOk={props.closeMetaDataDialog}
            onCancel={props.closeMetaDataDialog}
            cancelButtonProps={{hidden: true}}
            zIndex={100000}
            width={800}
            key={"model2"}
        >
            <div>
                <Button onClick={copy}>复制</Button>
            </div>
            <pre>
                {JSON.stringify(metaData, undefined, 4)}
            </pre>
        </Modal>
    </React.Fragment>;
}

GeneratePageDialog.propTypes = {
    mainDialogIsOpen: PropTypes.bool,
    closeExportDialog: PropTypes.func,
    openMetaDataDialog: PropTypes.func,
    closeMetaDataDialog: PropTypes.func,
    metaDataDialogIsOpen: PropTypes.bool,
    metaData: PropTypes.array,
};