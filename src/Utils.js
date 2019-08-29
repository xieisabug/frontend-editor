export function getCommonStyle(props) {
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

export function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);
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