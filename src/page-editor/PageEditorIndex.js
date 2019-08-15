import React from 'react';
import Toolbar from "./component/Toolbar"
import PageThumb from "./component/PageThumb";
import PageEditor from "./component/PageEditor";
import PageAttributesPanel from "./component/PageAttributesPanel";

import "./style/page-editor.css"

class PageEditorIndex extends React.Component {

    render() {
        return (
            <div className="page-editor">
                <Toolbar />
                <div className="page-editor-center-container">
                    <PageThumb />
                    <PageEditor />
                    <PageAttributesPanel />
                </div>
            </div>
        );
    }

}

export default PageEditorIndex;
