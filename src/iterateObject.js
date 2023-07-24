export function iterateObject(obj, callbacks = {}, ...args) {
    const { onValue, onFinal } = callbacks;

    for (const key in obj) {
        iterateObjectRecursive(obj[key], onValue, [key], ...args);
    }
    if (typeof onFinal === 'function') {
        return onFinal(obj, ...args);
    }
}

function iterateObjectRecursive(obj, onValue, keyPath = [], ...args) {

    if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
        for (const key in obj) {
            iterateObjectRecursive(obj[key], onValue, [...keyPath, key], ...args);
        }
    } else if (typeof onValue === 'function') {
        onValue(obj, keyPath, ...args);
    }

}