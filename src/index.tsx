import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension"

import './index.css';

import PageEditorIndex from './page-editor/PageEditorIndex';
import * as serviceWorker from './serviceWorker';
import rootReducer from "./reducer";
import {DataKeyGenerator, IdGenerator, WidgetFactory, ZIndexGenerator} from "./Utils";
import {WIDGET_TYPE} from "./Constants";
import {WidgetButtonClass} from "./page-editor/component/widget/WidgetButton";
import {WidgetCheckboxClass} from "./page-editor/component/widget/WidgetCheckbox";
import {WidgetGalleryClass} from "./page-editor/component/widget/WidgetGallery";
import {WidgetImageClass} from "./page-editor/component/widget/WidgetImage";
import {WidgetInputClass} from "./page-editor/component/widget/WidgetInput";
import {WidgetRadioClass} from "./page-editor/component/widget/WidgetRadio";
import {WidgetTextClass} from "./page-editor/component/widget/WidgetText";
import {WidgetTabClass} from "./page-editor/component/widget/WidgetTab";
import {WidgetRectClass} from "./page-editor/component/widget/WidgetRect";
import {WidgetCircleClass} from "./page-editor/component/widget/WidgetCircle";
import {WidgetDishClass} from "./page-editor/component/widget/WidgetDish";

IdGenerator.init();
ZIndexGenerator.init();
DataKeyGenerator.init();

WidgetFactory.register(WIDGET_TYPE.BUTTON, WidgetButtonClass);
WidgetFactory.register(WIDGET_TYPE.CHECKBOX, WidgetCheckboxClass);
WidgetFactory.register(WIDGET_TYPE.GALLERY, WidgetGalleryClass);
WidgetFactory.register(WIDGET_TYPE.IMAGE, WidgetImageClass);
WidgetFactory.register(WIDGET_TYPE.INPUT, WidgetInputClass);
WidgetFactory.register(WIDGET_TYPE.RADIO, WidgetRadioClass);
WidgetFactory.register(WIDGET_TYPE.TEXT, WidgetTextClass);
WidgetFactory.register(WIDGET_TYPE.TAB, WidgetTabClass);
WidgetFactory.register(WIDGET_TYPE.RECT, WidgetRectClass);
WidgetFactory.register(WIDGET_TYPE.CIRCLE, WidgetCircleClass);
WidgetFactory.register(WIDGET_TYPE.DISH, WidgetDishClass);

function configureStore() {
    return createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    );
}

ReactDOM.render(
    <Provider store={configureStore()}>
        <PageEditorIndex/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
