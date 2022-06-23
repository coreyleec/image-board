import {createBrowserHistory} from "history";

function appendBaseName (basename, to, state, callback)  {
    if (typeof to === 'string') {
        to = basename + to;
    }
    if (typeof to === 'object' && to.pathname) {
        to.pathname = basename + to.pathname;
    }
    if (state !== undefined && state.pathname) {
        to.pathname = basename + state.pathname;
    }

    return callback(to, state);
}

export default function createBrowserHistoryWithBasename(basename = '/home') {
    let history = createBrowserHistory();
    console.log("history", history)
    history.basename = basename;
    console.log("basename", basename)
    const push = history.push;
    console.log("push", push)
    const replace = history.replace;
    console.log("replace", replace)
    history.push = (to, state = undefined) => appendBaseName(basename, to, state, push);
    history.replace = (to, state = undefined) => appendBaseName(basename, to, state, replace);

    console.log("history 2", history)
    return history;
};
