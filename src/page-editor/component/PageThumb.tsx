import * as React from 'react';
import classNames from "classnames";

export default class PageThumb extends React.Component<any, any> {
    render() {
        const {pages, currentPageIndex, changeCurrentPage} = this.props;
        return (
            <div className="page-editor-thumb">
                {pages.map((p: any, index: number) => {
                    return <div className={classNames({
                        "page-thumb-item": true,
                        "active": currentPageIndex === index
                    })} key={index} onClick={() => {changeCurrentPage(index)}}>{p.name}</div>
                })}

                <div onClick={this.props.addPage}>添加一页</div>
            </div>
        );
    };
}