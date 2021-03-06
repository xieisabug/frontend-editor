import {WidgetBase} from "./page-editor/component/widget/WidgetBase";
import React from "react";

export function getCommonStyle(props: any) {
    return {
        left: props.data.x + "px",
        top: props.data.y + "px",
        width: props.data.width + "px",
        height: props.data.height + "px",
        zIndex: props.data.z,
        border: `${props.data.borderWidth}px ${props.data.borderLineType} ${props.data.borderColor}`,
        background: props.data.backgroundTransparent ? "transparent" : props.data.background
    }
}

export function copyToClipboard(text: string) {
    if ((window as any).clipboardData && (window as any).clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return (window as any).clipboardData.setData("Text", text);
    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        let textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

export class IdGenerator {
    idKey: number;
    static instance: any;

    constructor(idKey = 0) {
        this.idKey = idKey;
    }

    static init() {
        if (!IdGenerator.instance) {
            IdGenerator.instance = new IdGenerator();
        }
        return IdGenerator.instance;
    }

    getKey() {
        return this.idKey++;
    }
}

export class ZIndexGenerator {
    zKey: number;
    static instance: any;

    constructor(zKey = 0) {
        this.zKey = zKey;
    }

    static init() {
        if (!ZIndexGenerator.instance) {
            ZIndexGenerator.instance = new ZIndexGenerator();
        }
        return ZIndexGenerator.instance;
    }

    getKey() {
        return this.zKey++;
    }
}

export class DataKeyGenerator {
    dataKey: number;
    static instance: any;

    constructor(dataKey = 0) {
        this.dataKey = dataKey;
    }

    static init() {
        if (!DataKeyGenerator.instance) {
            DataKeyGenerator.instance = new DataKeyGenerator();
        }
        return DataKeyGenerator.instance;
    }

    getKey() {
        return this.dataKey++;
    }
}

export class WidgetFactory {
    static widgetList: Array<WidgetBase> = [];
    static widgetMap: { [s: number]: WidgetBase;} = {};

    static register(type: number, typeClass: { new (): WidgetBase; }) {
        this.widgetMap[type] = new typeClass();
    }

    static handleInitData(type: number, data: any) {
        const widget = this.widgetMap[type];
        widget.handleInitData(data);
        return widget;
    }

    static properties(type: number) {
        return this.widgetMap[type].getProperty();
    }

    static render(type: number, props: any) {
        if (props.isSelect) {
            return [<div className="widget-select" style={{left: props.data.x - 6, top: props.data.y - 6, width: props.data.width, height: props.data.height}}>
            </div>, this.widgetMap[type].render(props)];
        } else {
            return this.widgetMap[type].render(props)
        }
    }

    static editPanel(data: any, methodCollection: any) {
        return this.widgetMap[data.type].getEditPanel(data, methodCollection);
    }

    static theme(data: any, changeFunction: Function) {
        if (this.widgetMap[data.type].getThemeList) {
            let themeList = this.widgetMap[data.type].getThemeList!();
            if (themeList) {
                return themeList.map(t => {
                    let newData = Object.assign({}, data, t);
                    return <div style={{position: "relative", margin: "20px 0", height: newData.height + "px"}} onClick={() => changeFunction(newData)}>
                        {this.widgetMap[data.type].render({
                            data: newData
                        })}
                    </div>;
                })
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}