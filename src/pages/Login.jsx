import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Progress, Result, Spin} from "antd";
import {getUserInfo} from "../core/Api.js";
import {Store} from "../core/AppUtils.js";


const Login = () => {

    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        const access_token = searchParams.get('access_token')
        const refresh_token = searchParams.get('refresh_token')
        setStatus(0)

        if (access_token == null || refresh_token === null) {
            setStatus(1)
        } else {
            getUserInfo({accessToken: access_token, refreshToken: refresh_token})
                .then((res) => {
                    Store.set('token_details', {access_token, refresh_token})
                    Store.set('user_details', res)
                    navigate('/')
                })
                .catch((err) => {
                    setStatus(1)
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