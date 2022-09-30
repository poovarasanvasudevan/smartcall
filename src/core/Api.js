import {APIUrl} from "./Config.js";
import {Store} from "./AppUtils.js";


export const getUserInfo = async ({accessToken, refreshToken}) => {
    return window.fetch(
        APIUrl.GET_USER_INFO, {
            headers: {
                "access_token": accessToken,
                'refresh_token': refreshToken
            }
        }
    ).then(x => x.json())
}

export const getAccounts = async () => {

    return window.fetch(
        APIUrl.GET_ACCOUNTS, {
            headers: Store.get('token_details')
        }
    ).then(x => x.json())
}