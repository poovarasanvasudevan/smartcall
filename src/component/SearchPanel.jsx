import {Form, Input, Space, TreeSelect, Modal} from "antd";
import {memo, useEffect, useState} from "react";
import {getAccounts, userSearch} from "../core/Api.js";
import {useAtom} from "jotai";
import {selectedAccountAtom, selectedUserAtom} from "../core/GlobalState.js";
import {debug} from "../core/Log.js";
import {FaBrush, FiMail, FiSearch, FiUser, IoTicket} from "react-icons/all";
import SearchUserDialog from "./SearchUserDialog.jsx";
import AppButton from "./AppButton.jsx";

const {info, error} = Modal

const SearchPanel = memo(() => {

    const formItemClass = 'w-56 !m-0'
    const [accounts, setAccounts] = useState([])
    const [selectedAccount, setSelectedAccount] = useAtom(selectedAccountAtom)
    const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)
    const [searchUserDialogProp, setSearchUserDialog] = useState({
        isOpen: false,
        data: []
    })
    const [searchData, setSearchData] = useState({
        LoginID: '',
        FirstName: '',
        LastName: '',
        ServiceFocusID: '',
        EmailAddress: ''
    })

    useEffect(() => {
        getAccounts()
            .then(x => {
                processTreeDropdown(x)
            })
    }, [])

    const onChangeAccount = (value) => {
        setSelectedAccount(JSON.parse(value))
    }


    const processTreeDropdown = (data) => {
        const dropdownData = []
        const masterAccount = data.filter(j => j.Account_sk === j.MasterAccount_sk)
        for (let i = 0; i < masterAccount.length; i++) {
            let childAccount = data.filter(j => j.MasterAccount_sk === masterAccount[i].Account_sk)

            dropdownData.push({
                title: masterAccount[i].Account,
                value: JSON.stringify({...masterAccount[i], type: 'MASTER'}),
                key: `${masterAccount[i].Account_sk}_MASTER`,
                disabled: "disabled",
                children: childAccount.map(j => ({
                    title: j.Account,
                    key: `${j.Account_sk}_CHILD`,
                    value: JSON.stringify({...j, type: 'CHILD'}),
                }))
            })
        }
        setAccounts(dropdownData)
    }

    const onInputChange = (type, e) => {
        setSearchData({...searchData, [type]: e.target.value})
    }

    const searchUserDialog = (data) => {
        setSearchUserDialog({
            isOpen: true,
            data: data
        })
    }
    const onPressEnter = async (e) => {
        if (selectedAccount != null) {
            const searchCriteria = Object.fromEntries(
                Object.entries(searchData).filter(([_, value]) => value !== '')
            )
            debug(searchCriteria)
            searchCriteria.Account = selectedAccount.Account
            const searchUser = await userSearch(searchCriteria)
            if (searchUser && searchUser.length > 0) {
                if (searchUser.length === 1) {
                    setSelectedUser(searchUser[0])
                } else {
                    searchUserDialog(searchUser)
                }
            } else {
                error({
                    content: 'User not found for given search criteria'
                })
            }
        } else {
            info({
                content: 'Please select an account',
            })
        }
    }

    const InputSuffixWithIcon = {
        suffix: <FiSearch/>,
        onPressEnter: onPressEnter
    }

    const defaultInputProps = (type) => {
        return {
            autoComplete: 'off',
            value: selectedUser && selectedUser[type] ? selectedUser[type] : searchData[type],
        }
    }

    const onClear = () => {
        setSelectedUser(null)
        setSearchData({
            LoginID: '',
            FirstName: '',
            LastName: '',
            ServiceFocusID: '',
            EmailAddress: ''
        })
    }

    return (
        <div className={'w-full bg-white flex flex-col border border-gray-100 shadow-xs'}>
            <SearchUserDialog data={searchUserDialogProp.data}
                              onClose={() => setSearchUserDialog({isOpen: false, data: []})}
                              isOpen={searchUserDialogProp.isOpen}/>

            <div className={'px-4 py-1.5 flex items-center border-b border-gray-100'}
                 style={{background: "var(--header-color)"}}>
                <div className={'font-semibold text-white'}>Account</div>
                <div className={'ml-3'}>
                    <TreeSelect
                        showSearch
                        placeholder="Please select"
                        size={'small'}
                        value={selectedAccount ? JSON.stringify(selectedAccount) : null}
                        onChange={onChangeAccount}
                        treeDefaultExpandAll
                        bordered={false}
                        className={'bg-white h-6'}
                        style={{width: 280}}>
                        {accounts.map((item, index) => (
                            <TreeSelect.TreeNode value={item.value} title={item.title}>
                                {item.children.map((child, index) => (
                                    <TreeSelect.TreeNode
                                        value={child.value}
                                        title={child.title}/>
                                ))}
                            </TreeSelect.TreeNode>
                        ))}
                    </TreeSelect>

                </div>
            </div>

            <div className={'p-4'}>
                <Form layout={'vertical'} className={'flex flex-wrap'} size={'middle'} autoComplete={'off'}>
                    <Space size={'middle'} className={'flex flex-wrap'}>
                        <Form.Item label="Network Login" className={formItemClass}>
                            <Input {...InputSuffixWithIcon}
                                   placeholder="Network Login"
                                   {...defaultInputProps('NetworkLogin')}
                                   onChange={(e) => onInputChange('NetworkLogin', e)}/>
                        </Form.Item>

                        <Form.Item label="First Name" className={formItemClass}>
                            <Input
                                {...InputSuffixWithIcon}
                                {...defaultInputProps('FirstName')}
                                placeholder="First Name"
                                onChange={(e) => onInputChange('FirstName', e)}/>
                        </Form.Item>


                        <Form.Item label="Last Name" className={formItemClass}>
                            <Input {...InputSuffixWithIcon} placeholder="Last Name"
                                   {...defaultInputProps('LastName')}
                                   onChange={(e) => onInputChange('LastName', e)}/>
                        </Form.Item>


                        <Form.Item label="ServiceFocus ID" className={formItemClass}>
                            <Input {...InputSuffixWithIcon}
                                   {...defaultInputProps('LoginID')}
                                   placeholder="For ex: CTS-JOHN"
                                   onChange={(e) => onInputChange('LoginID', e)}/>
                        </Form.Item>

                        <Form.Item label="Asset Tag" className={formItemClass}>
                            <Input placeholder="Asset Tag"
                            />
                        </Form.Item>

                        <Form.Item label="Computer Name" className={formItemClass}>
                            <Input placeholder="Asset Tag"
                            />
                        </Form.Item>

                        <Form.Item label="Email" className={'w-72 !m-0'}>
                            <Input {...InputSuffixWithIcon} placeholder="Email"
                                   {...defaultInputProps('EmailAddress')}
                                   onChange={(e) => onInputChange('EmailAddress', e)}/>
                        </Form.Item>

                        <Form.Item label="Ext" className={'w-20 !m-0'}>
                            <Input placeholder="ext"
                                   {...defaultInputProps('PhoneExt')}
                            />
                        </Form.Item>


                        <Form.Item label="Phone" className={formItemClass}>
                            <Input placeholder="Phone"
                                   {...defaultInputProps('PhoneWork')}
                            />
                        </Form.Item>

                        <Form.Item label="Building, Dept,Floor and Suite" className={'w-96 !m-0'}>
                            <Input placeholder="Building, Dept,Floor and Suite"

                                   {...defaultInputProps('Building')}
                            />
                        </Form.Item>

                        <Form.Item label="Office" className={formItemClass}>
                            <Input placeholder="Office"   {...defaultInputProps('Office')}/>
                        </Form.Item>
                    </Space>
                </Form>
            </div>

            {selectedUser && (
                <Space className={'px-4 pb-3 border-t border-gray-100 pt-2'} size={'small'} >
                    <AppButton title={'Clear'} icon={<FaBrush/>} className={'bg-red-500'} onClick={onClear}/>
                    <AppButton title={'Create Incident'} icon={<IoTicket/>} className={'bg-blue-700'} />
                    <AppButton title={'Create SR'} icon={<IoTicket/>} className={'bg-green-700'} />
                    <AppButton title={'Edit User'} icon={<FiUser/>} className={'bg-teal-700'} />
                    <AppButton title={'Send Email'} icon={<FiMail/>} className={'bg-orange-700'} />
                </Space>
            )}

        </div>
    )
})

export default SearchPanel