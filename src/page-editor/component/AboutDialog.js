import {Modal} from "antd";
import * as PropTypes from "prop-types";
import React from "react";

export function AboutDialog(props) {
    return <Modal
        title="关于"
        visible={props.visible}
        okText="关闭"
        onOk={props.onOk}
        onCancel={props.onOk}
        cancelButtonProps={{hidden: true}}
        zIndex={100000}
    >
        <p>使用react开发的小程序编辑器。</p>
        <p>目的是为了解决原型转代码这多余的一步，由客户或者产品发起的界面设计转到程序员的代码本可以自动完成。</p>
        <p>同样解决了各个普通的界面，却需要不停的去写新的小程序界面，使用元数据生成界面之后，可以远程获取元数据生成不同的界面，从而不需要重新上线。</p>
        <p><a href="http://www.xiejingyang.com" target="_blank" rel="noopener noreferrer">我的博客</a></p>
    </Modal>;
}

AboutDialog.propTypes = {
    visible: PropTypes.bool,
    onOk: PropTypes.func
};