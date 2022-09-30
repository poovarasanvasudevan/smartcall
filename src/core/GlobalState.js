import {atom} from "jotai";
import {CALL_STATE} from "./Config.js";

export const sipStatus = atom("")
export const currentCall = atom(null)
export const currentCallState = atom(CALL_STATE.NO_STATE)
export const dialpadState = atom(false)
export const transferDialogAtom = atom(false)