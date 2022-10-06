import {atom} from "jotai";
import {CALL_STATE, SIP_STATUS} from "./Config.js";

export const userExtenstionAtom = atom(null);

export const sipStatus = atom(SIP_STATUS.ERROR)
export const currentCall = atom(null)
export const currentCallState = atom(CALL_STATE.NO_STATE)
export const dialpadState = atom(false)
export const transferDialogAtom = atom(false)
export const selectedAccountAtom = atom(null)
export const selectedUserAtom = atom(null)

export const callPropAtom = atom({
    isMuted: false,
    isHold: false,
})