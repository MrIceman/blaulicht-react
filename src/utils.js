export const isWebApp = () => {
    return !window.BaseInterface;
};


export const getAppVersion = () => {
    return process.env.REACT_APP_VERSION;
}


export const clamp = (val, min, max) => Math.min(Math.max(min, val), max);


export const getCallerInfo = () => {
    // TODO maybe achieve to return line numbers of original files (not bundle)
    const callerLine = (new Error()).stack.split('\n')[3];
    const idx = callerLine.indexOf("at ");
    return callerLine.slice(idx+3, callerLine.length);
};