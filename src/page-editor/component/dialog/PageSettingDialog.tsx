import * as React from "react";
import {Checkbox, Form, Modal} from "antd";
import * as PropTypes from "prop-types";

export default function PageSettingDialog(props: any) {
    const page = props.pageList[props.choosePageIndex];

    return <Modal
        title="页面设置"
        visible={props.visible}
        okText="关闭"
        onOk={props.onOk}
        onCancel={props.onOk}
        cancelButtonProps={{hidden: true}}
        zIndex={100000}
    >
        <Form labelCol={{span: 6}} wrapperCol={{span: 16}}>
            <Form.Item label="是否可滚动">
                <Checkbox checked={page.pageSetting.isScrollPage} />
                <div className="dialog-form-item-tips">设置为不可滚动后，页面不会自动伸缩，并且页面高度所放元素会自动拉伸或者缩小</div>
            </Form.Item>
        </Form>

    </Modal>;
}

PageSettingDialog.propTypes = {
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    pageList: PropTypes.array,
    choosePageIndex: PropTypes.number
};