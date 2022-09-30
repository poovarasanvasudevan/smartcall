import {Form, Input, Space, TreeSelect} from "antd";
import {memo, useEffect, useState} from "react";
import {getAccounts} from "../core/Api.js";

const SearchPanel = memo(() => {

    const formItemClass = 'w-52 !m-0'
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        getAccounts()
            .then(x => {
                processTreeDropdown(x)
            })
    }, [])


    const processTreeDropdown = (data) => {
        const dropdownData = []
        const masterAccount = data.filter(j => j.Account_sk === j.MasterAccount_sk)
        for(let i = 0; i < masterAccount.length; i++){
            let childAccount = data.filter(j => j.MasterAccount_sk === masterAccount[i].Account_sk)

            dropdownData.push({
                title: masterAccount[i].Account,
                value:`${masterAccount[i].Account_sk}-${masterAccount[i].MasterAccount_sk}-${masterAccount[i].Account}-parent`,
                children: childAccount.map(j => ({title: j.Account, value: `${j.Account_sk}-${masterAccount[i].MasterAccount_sk}-${masterAccount[i].Account}`}))
            })
        }
        console.log(dropdownData)
        setAccounts(dropdownData)
    }


    return (
        <div className={'w-full bg-white flex flex-col border border-gray-100'}>
            <div className={'px-4 py-1.5 flex items-center border-b border-gray-100'}
                 style={{background: "var(--header-color)"}}>
                <div className={'font-semibold text-white'}>Account</div>
                <div className={'ml-2'}>
                    <TreeSelect
                        showSearch
                        placeholder="Please select"
                        style={{width: 280}}>
                        {accounts.map((item, index) => (
                            <TreeSelect.TreeNode value={item.value} title={item.title} key={"parent_" +index}>
                                {item.children.map((child, index) => (
                                    <TreeSelect.TreeNode value={child.value} title={child.title} key={"child_"+index}/>
                                ))}
                            </TreeSelect.TreeNode>
                        ))}
                    </TreeSelect>

                </div>
            </div>

            <div className={'px-4 py-4'}>
                <Form layout={'vertical'} className={'flex flex-wrap'} size={'middle'}>
                    <Space size={'middle'} className={'flex flex-wrap'}>
                        <Form.Item label="Network Login" className={formItemClass}>
                            <Input placeholder="Network Login"/>
                        </Form.Item>

                        <Form.Item label="First Name" className={formItemClass}>
                            <Input placeholder="First Name"/>
                        </Form.Item>


                        <Form.Item label="Last Name" className={formItemClass}>
                            <Input placeholder="Last Name"/>
                        </Form.Item>


                        <Form.Item label="ServiceFocus ID" className={formItemClass}>
                            <Input placeholder="For ex: CTS-JOHN"/>
                        </Form.Item>

                        <Form.Item label="Asset Tag" className={formItemClass}>
                            <Input placeholder="Asset Tag"/>
                        </Form.Item>

                        <Form.Item label="Computer Name" className={formItemClass}>
                            <Input placeholder="Asset Tag"/>
                        </Form.Item>

                        <Form.Item label="Email" className={'w-72 !m-0'}>
                            <Input placeholder="Email"/>
                        </Form.Item>

                        <Form.Item label="Ext" className={'w-20 !m-0'}>
                            <Input placeholder="ext"/>
                        </Form.Item>


                        <Form.Item label="Phone" className={formItemClass}>
                            <Input placeholder="Phone"/>
                        </Form.Item>

                        <Form.Item label="Building, Dept,Floor and Suite" className={'w-96 !m-0'}>
                            <Input placeholder="Building, Dept,Floor and Suite"/>
                        </Form.Item>

                        <Form.Item label="Office" className={formItemClass}>
                            <Input placeholder="Office"/>
                        </Form.Item>
                    </Space>
                </Form>
            </div>
        </div>
    )
})

export default SearchPanel