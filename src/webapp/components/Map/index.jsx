﻿import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import styles from './index.scss';
import Globe,{GlobeOptions} from 'world/Globe';

export const globe = Globe.getInstance({
    satellite: false,
    key: "db146b37ef8d9f34473828f12e1e85ad"
});

window.globe = globe;

function safelyResizeByParent(){
    const parent = globe.canvas.parentNode;
    if(parent){
        const w = parent.clientWidth;
        const h = parent.clientHeight;
        if(w > 0 && h > 0){
            globe.resize(w, h);
        }
    }
}

window.addEventListener("resize", safelyResizeByParent, false);

export default class Map extends Component{

    static defaultProps = {
    };

    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return <div className={styles.map}></div>;
    }

    componentDidMount(){
        const domNode = ReactDOM.findDOMNode(this);
        globe.placeAt(domNode);
        safelyResizeByParent();
        globe.resumeRendering();
    }

    componentWillUnmount(){
        const domNode = ReactDOM.findDOMNode(this);
        const canvas = globe && globe.canvas;
        if(canvas && canvas.parentNode === domNode){
            domNode.removeChild(canvas);
            globe.pauseRendering();
        }
    }
};