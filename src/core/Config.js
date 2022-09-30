export const ATTEN_CALL = "ATTEN_CALL";
export const END_CALL = "END_CALL";

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
//https://servicefocus2-sbox.ctsmartdesk.com/sfauth/get_auth_apps/?u_id=Poovarasan.Vasudevan&
// rf_tkn=d8c0acef-d0f0-44e3-8f47-dbbbe9bc0a0d&access_token=1581c631-38e6-4d74-8424-7df4ac3aee20&
// acc_code=CTS&
// auth_type_code=ldap&is_html=false&app_code=AGC
//https://sfi-sbox.ctsmartdesk.com/SFInterface/auth/v1/me?groups=0&ad_groups=0&default_application=0&Role=0&Preference=0
export const APIUrl = {
    GET_USER_INFO: `${API_BASE_URL}/auth/v1/me?groups=0&ad_groups=0&default_application=0&Role=0&Preference=0`,
    GET_ACCOUNTS: `${API_BASE_URL}/V1/AccountsByUser?SortField=MasterAccount,Account&Status=Active`
}