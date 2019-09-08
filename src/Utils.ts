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
        var textarea = document.createElement("textarea");
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