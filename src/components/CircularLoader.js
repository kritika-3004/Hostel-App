import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * Renders a circular infinite loader
 * @param {String} [text="Loading..."] - text to be shown under loader  
 * @param {Boolean} [fullPage]
 */
const CircularLoader = (props) => {

    let className = "centeredProgress"
    if (props.fullPage) {
        className = className + " full-page"
    }
    return (
        <div className={className}>
            <CircularProgress />
            <span>{props.text}</span>
        </div>
    );
}

CircularLoader.defaultProps = {
    text: "Loading...",
    fullPage: false
}
export default CircularLoader
