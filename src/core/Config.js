
export const DEBUG = true

export const ATTEN_CALL = "ATTEN_CALL";
export const END_CALL = "END_CALL";
export const MUTE_CALL = "MUTE_CALL";
export const HOLD_CALL = "HOLD_CALL";
export const TRANSFER_CALL = "TRANSFER_CALL";
export const OUTGOING_CALL = "OUTGOING_CALL";

export const ATOKEN = "F9236B49CEFE88CDFA60011EC8EAB45DDA02C78A7C21D04B02F6DA32E5DC41B0";
export const SMART_API_HEADERS = {
    atoken: ATOKEN,
}
export const API_TOKEN = {
    atoken: ATOKEN,
    ClientInstance: 'shared'
}
export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json'
}

export const SIP_STATUS = {
    REGISTERED: "REGISTERED",
    REGISTERED_FAILED: "REGISTERED_FAILED",
    UNREGISTERED: "UNREGISTERED",
    REGISTERING: "REGISTERING",
    UNREGISTERING: "UNREGISTERING",
    ERROR: "ERROR",
    CONNECTING: "CONNECTING",
    CONNECTED: "CONNECTED",
    DISCONNECTED: "DISCONNECTED",
    DISCONNECTING: "DISCONNECTING",
    RECONNECTING: "RECONNECTING",
    RECONNECTED: "RECONNECTED",
    RECONNECT_FAILED: "RECONNECT_FAILED",
    RECONNECT_ERROR: "RECONNECT_ERROR",
}

export const CALL_STATE = {
    CALLING: "CALLING",
    RINGING: "RINGING",
    IN_CALL: "IN_CALL",
    ENDED: "ENDED",
    FAILED: "FAILED",
    BUSY: "BUSY",
    NO_ANSWER: "NO_ANSWER",
    ACCEPTED: "ACCEPTED",
    NO_STATE: "NO_STATE",
}
const API_BASE_URL = "https://sfi-sbox.ctsmartdesk.com/SFInterface"
const CALL_API_BASE_URL = "http://10.165.135.132:8080/smartcall"

export const APIUrl = {
    GET_USER_INFO: `${API_BASE_URL}/auth/v1/me?groups=0&ad_groups=0&default_application=0&Role=0&Preference=0`,
    GET_ACCOUNTS: `${API_BASE_URL}/V1/AccountsByUser?SortField=MasterAccount,Account&Status=Active&SelectedFields=MasterAccount,Account,AccountName,AccountCodeName,Account_sk,URLKey,MasterAccount_sk`,
    GET_ALL_AGENTS: `${CALL_API_BASE_URL}/v1/agent/allAgents`,
    GET_ALL_QUEUE: `${CALL_API_BASE_URL}/v1/queue/allQueues`,
    GET_AGENT_INFO: `${CALL_API_BASE_URL}/v1/agent/agentDetails`,
    USER_SEARCH: `${API_BASE_URL}/V1/ProfileSearch4`,
    OPEN_TICKETS: `${API_BASE_URL}/V1/ConsolidatedTickets`,
}