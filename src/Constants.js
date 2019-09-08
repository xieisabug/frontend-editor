export const WIDGET_TYPE = {
    BUTTON: 1,
    TEXT: 2,
    INPUT: 3,
    IMAGE: 4,
    CHECKBOX: 5,
    RADIO: 6,
    TEXTAREA: 7,
    GALLERY: 8
};

export const WIDGET_PROPERTY = {
    [WIDGET_TYPE.BUTTON]: {
        width: 80,
        height: 30,
        icon: "icon-button",
        tips: "按钮"
    },
    [WIDGET_TYPE.IMAGE]: {
        width: 150,
        height: 100,
        icon: "icon-image",
        tips: "图片"
    },
    [WIDGET_TYPE.INPUT]: {
        width: 150,
        height: 30,
        icon: "icon-input",
        tips: "输入框"
    },
    [WIDGET_TYPE.TEXT]: {
        width: 80,
        height: 30,
        icon: "icon-text",
        tips: "文字"
    },
    [WIDGET_TYPE.CHECKBOX]: {
        width: 80,
        height: 30,
        icon: "icon-checkbox",
        tips: "勾选框"
    },
    [WIDGET_TYPE.RADIO]: {
        width: 80,
        height: 30,
        icon: "icon-radio",
        tips: "单选框"
    },
    [WIDGET_TYPE.TEXTAREA]: {
        width: 250,
        height: 160,
        icon: "icon-textarea",
        tips: "段落输入"
    },
    [WIDGET_TYPE.GALLERY]: {
        width: 380,
        height: 200,
        icon: "icon-gallery",
        tips: "滚动图片"
    }
};

export const ADSORPTION_POWER = 5;

export const SERVER_HOST = "https://www.xiejingyang.com/mini-app-editor-api";