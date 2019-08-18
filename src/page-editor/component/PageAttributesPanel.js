import * as React from 'react';

export default class PageAttributesPanel extends React.Component {
    render() {
        const { chooseComponentData } = this.props;
        return chooseComponentData ? (
            <div className="page-editor-attributes-panel">
                <div className="page-editor-attributes-panel-form-item">
                    <div className="page-editor-attributes-panel-form-label">x:</div>
                    <div className="page-editor-attributes-panel-form-content"><input className="page-editor-attributes-panel-form-input" value={chooseComponentData.x} /></div>
                </div>
                <div className="page-editor-attributes-panel-form-item">
                    <div className="page-editor-attributes-panel-form-label">y:</div>
                    <div className="page-editor-attributes-panel-form-content"><input className="page-editor-attributes-panel-form-input" value={chooseComponentData.y} /></div>
                </div>
                <div className="page-editor-attributes-panel-form-item">
                    <div className="page-editor-attributes-panel-form-label">宽度:</div>
                    <div className="page-editor-attributes-panel-form-content"><input className="page-editor-attributes-panel-form-input" value={chooseComponentData.width} /></div>
                </div>
                <div className="page-editor-attributes-panel-form-item">
                    <div className="page-editor-attributes-panel-form-label">高度:</div>
                    <div className="page-editor-attributes-panel-form-content"><input className="page-editor-attributes-panel-form-input" value={chooseComponentData.height} /></div>
                </div>
            </div>
        ): <div className="page-editor-attributes-panel no-choose-component">未选定组件</div>;
    };
}