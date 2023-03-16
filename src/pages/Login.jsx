import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Progress, Result, Spin} from "antd";
import {getAccessToken, getUserInfo} from "../core/Api.js";
import {Store} from "../core/AppUtils.js";


const Login = () => {

    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        const refresh_token = searchParams.get('rf_tkn')
        setStatus(0)

        if (refresh_token === null) {
            setStatus(1)
        } else {
            getAccessToken(refresh_token)
                .then((res) => {
                    if (res.access_token) {
                        getUserInfo({accessToken: res.access_token, refreshToken: res.refresh_token})
                            .then((res1) => {
                                if (res1.error) {
                                    setStatus(1)
                                } else {
                                    Store.set('token_details', res)
                                    Store.set('user_details', res1)
                                    navigate('/')
                                }
                            })
                            .catch((err) => {
                                setStatus(1)
                            })
                    }
                })
        }


    }, [])


    return (
        <div className={'flex w-full h100 items-center justify-center bg-white'}>
            {status === 0 && <Spin size={'large'} tip={"Verifying User"}/>}
            {status === 1 && <Result
                status="404"
                size={'small'}
                title="Unauthorized"
                subTitle="Sorry, We are unable to verify you. Please login and navigate to Smart Agent Center"
            />}
        </div>
    )
}
export default Login