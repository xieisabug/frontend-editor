export function getCommonStyle(props) {
    return {
        left: props.data.x + "px",
        top: props.data.y + "px",
        width: props.data.width + "px",
        height: props.data.height + "px",
        zIndex: props.data.z,
        border: `${props.data.borderWidth}px ${props.data.borderLineType} ${props.data.borderColor}`,
        background: props.data.background
    }
}