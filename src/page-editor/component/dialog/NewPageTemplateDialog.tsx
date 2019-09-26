import {Modal} from "antd";
import * as React from "react";
import * as PropTypes from "prop-types";

import iconEmptyPage from "../../../icon-empty-page.svg";
import iconTabPage from "../../../icon-tab-page.svg";

export default function NewPageTemplateDialog(props: any) {
    let addEmptyPage = function() {
        props.addPage(0);
        props.closeDialog();
    };
    let addTabPage = function() {
        props.addPage(1);
        props.closeDialog();
    };

    return <Modal
        title="新增页面"
        visible={props.open}
        cancelText={"取消"}
        onCancel={props.closeDialog}
        okButtonProps={{hidden: true}}
        zIndex={100000}
    >
        <div className={"page-template-list"}>
            <div className={"page-template-item"} onClick={addEmptyPage}>
                <img className={"page-template-item-img"} alt={""} src={iconEmptyPage} />
                <div>空页面</div>
            </div>

            <div className={"page-template-item"} onClick={addTabPage}>
                <img className={"page-template-item-img"} alt={""} src={iconTabPage} />
                <div>Tab页面</div>
            </div>
        </div>

    </Modal>
}

NewPageTemplateDialog.propTypes = {
    open: PropTypes.bool,
    closeDialog: PropTypes.func,
    addPage: PropTypes.func
};