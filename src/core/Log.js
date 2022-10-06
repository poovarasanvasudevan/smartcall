import {DEBUG} from "./Config.js";

export const debug = (message) => {
    if (DEBUG) {
        console.log(message)
    }
}