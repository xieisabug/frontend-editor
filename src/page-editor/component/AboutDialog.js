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
        <p>使用react开发的小程序编辑器。如果您有以下诉求，可以尝试看看此项目。</p>
        <p>1.为了<strong>解决原型转代码</strong>这多余的一步，由客户或者产品发起的界面设计转到程序员的代码可以自动完成。</p>
        <p>2.各个普通的界面，却<strong>不想不停的去写简单又枯燥的界面</strong>，使用元数据生成界面之后，可以远程获取元数据生成不同的界面，从而不需要重新上线。</p>
        <p>3.<strong>不想花重复精力去编写各个平台小程序</strong>或者H5界面，使用此工具后可以全部兼容。</p>
        <p>4.公司有类似的需求或者您有框架，想要<strong>接入可视化编辑界面</strong>或者<strong>学习相关技术</strong>。</p>
        <p>5.仅仅想要使用本工具<strong>制作界面</strong>。</p>
        <p><a href="http://www.xiejingyang.com" target="_blank" rel="noopener noreferrer">我的博客</a></p>
        <p>QQ: 136419808</p>
    </Modal>;
}

AboutDialog.propTypes = {
    visible: PropTypes.bool,
    onOk: PropTypes.func
};