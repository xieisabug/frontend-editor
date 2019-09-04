import {Form, Input, Modal, Select} from "antd";
import * as PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {WIDGET_TYPE} from "../../Constants";

const { Option } = Select;

export function ButtonEventBindDialog(props) {
    const [eventType, setEventType] = useState(props.data ? props.data.eventType: -1);
    const [postFieldList, setPostFieldList] = useState(props.data ? props.data.postFieldList: []);
    const [postUrl, setPostUrl] = useState(props.data ? props.data.postUrl: "");
    const [code, setCode] = useState(props.data ? props.data.code: "");

    let formItemLayout = {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 16
        },
    };
    function onOk() {
        props.onOk({
            eventType,
            postFieldList,
            postUrl,
            code
        });
    }

    useEffect(() => {
        setEventType(props.data ? props.data.eventType: -1);
        setPostFieldList(props.data ? props.data.postFieldList: []);
        setPostUrl(props.data ? props.data.postUrl: "");
        setCode(props.data ? props.data.code: "");
    }, [props.data]);

    function getEventTypeComponent() {
        switch (eventType) {
            case 1:
                let dataComponentName = props.widgetList.filter(i => i.type === WIDGET_TYPE.INPUT || i.type === WIDGET_TYPE.CHECKBOX).map(i => i.name);
                return [
                    <p>只支持post方式提交</p>,
                    <Form.Item label="提交地址">
                        <Input value={postUrl} onChange={event => setPostUrl(event.target.value)} />
                    </Form.Item>,
                    <Form.Item label="提交字段">
                        <Select mode={"multiple"} value={postFieldList} onChange={setPostFieldList} dropdownStyle={{zIndex: 100001}}>
                            <Option value={-1}>无</Option>
                            {dataComponentName.map(i => <Option value={i}>{i}</Option>)}
                        </Select>
                    </Form.Item>
                ];
            case 2:
                return [
                    <p>此方法需要谨慎使用，必须有编程经验，否则很容易出错</p>,
                    <pre>{"function(widgetList) {"}</pre>,
                    <Input.TextArea value={code} onChange={event => setCode(event.target.value)} />,
                    <pre>{"}"}</pre>
                ];
            default:
                return null;
        }
    }

    return <Modal
        title="按钮事件绑定"
        visible={props.visible}
        okText="确定"
        cancelText="取消"
        onOk={onOk}
        onCancel={props.onCancel}
        cancelButtonProps={{hidden: true}}
        zIndex={100000}
    >
        <Form {...formItemLayout}>
            <Form.Item label="事件类型">
                <Select value={eventType} onChange={setEventType} dropdownStyle={{zIndex: 100001}}>
                    <Option value={-1}>无</Option>
                    <Option value={1}>提交数据</Option>
                    <Option value={2}>自定义</Option>
                </Select>
            </Form.Item>
            {getEventTypeComponent()}
        </Form>
    </Modal>;
}

ButtonEventBindDialog.propTypes = {
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    data: PropTypes.object
};