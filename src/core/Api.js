import {API_TOKEN, APIUrl, DEFAULT_HEADERS, SMART_API_HEADERS} from "./Config.js";
import {Store} from "./AppUtils.js";

export const getAccessToken = (ref_token) => {
    return window.fetch(
        APIUrl.GET_ACCESS_TOKEN + "?refresh_token=" + ref_token + "&grant_type=refresh_token", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic Y3Rzc3A6c2VjcmV0`
            },
            method: 'POST'
        }
    ).then(res => res.json())
}

export const getUserInfo = async ({accessToken, refreshToken}) => {
    const INP = {}
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
            headers: {...API_TOKEN, ...DEFAULT_HEADERS}
        }
    ).then(x => x.json())
}

export const userSearch = async searchInput => {
    const INP = {
        "Status": ["Active", "Inactive"],
        "SortField": "FullName",
        "DistinctField": "People_Info_sk",
        "Distinct": "True",
        ...searchInput
    }
    return window.fetch(
        APIUrl.USER_SEARCH, {
            headers: {...API_TOKEN, ...DEFAULT_HEADERS},
            body: JSON.stringify(INP),
            method: "POST"
        }
    ).then(x => x.json())
}

export const getAgentDetails = async (agentId) => {
    return window.fetch(
        `${APIUrl.GET_AGENT_INFO}?loginid=${agentId}`, {
            headers: {...API_TOKEN, ...DEFAULT_HEADERS},
            method: "POST",
            body: JSON.stringify({}),
        }
    )
        .then(x => x.json())
        .then(x => {
            if (x.length === 1) {
                return x[0]
            } else {
                return null
            }
        })
}

export const myOpenTickets = async (userId) => {
    return window.fetch(
        `${APIUrl.OPEN_TICKETS}`, {
            headers: {...API_TOKEN, ...DEFAULT_HEADERS},
            method: "POST",
            body: JSON.stringify({
                "usersk": userId,
                "sortfield": "CreatedOn",
                "sortorder": "DESC",
                "israised": true,
                "SelectedField": ["TicketNumber", "Summary", "StatusDescription", "PriorityName", "AssignedGroupName", "AssignedIndividualName", "CreatedOn"]
            }),
        }
    )
        .then(x => x.json())

}

export const agentList = async () => {
    return window.fetch(
        APIUrl.GET_ALL_AGENTS, {
            headers: {...API_TOKEN, ...DEFAULT_HEADERS},
            method: "POST",
            body: JSON.stringify({
                "count": 0,
                "SelectedFields": [
                    "servicefocus_loginid", "extension_display_name"
                ]
            }),
        }
    ).then(x => x.json())
}

export const queueList = async () => {
    return window.fetch(
        APIUrl.GET_ALL_QUEUE, {
            headers: {...API_TOKEN, ...DEFAULT_HEADERS},
            method: "POST",
            body: JSON.stringify({
                "count": 0
            }),
        }
    ).then(x => x.json())
}


export const fetchEnduserExtension = async () => {

}
