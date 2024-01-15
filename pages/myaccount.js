import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MyAccount = () => {

    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [pincode, setPincode] = useState('')
    const [user, setUser] = useState({ value: null })
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [npassword, setNpassword] = useState('')

    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem('myuser'))
        if (!myuser) {
            router.push('/')
        }
        if (myuser && myuser.token) {
            setUser(myuser)
            setEmail(myuser.email)
            fetchData(myuser.token)
        }
        //eslint-disable-next-line
    }, [])

    const handleChange = async (e) => {

        if (e.target.name === 'name') {
            setName(e.target.value)
        }
        else if (e.target.name === 'phone') {
            setPhone(e.target.value)
        }
        else if (e.target.name === 'address') {
            setAddress(e.target.value)
        }
        else if (e.target.name === 'pincode') {
            setPincode(e.target.value)
        }
        else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
        else if (e.target.name === 'cpassword') {
            setCpassword(e.target.value)
        }
        else if (e.target.name === 'npassword') {
            setNpassword(e.target.value)
        }
    }

    const fetchData = async (token) => {
        let data = { token: token }
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let res = await a.json();
        setName(res.name)
        setAddress(res.address)
        setPincode(res.pincode)
        setPhone(res.phone)
    }

    const handleUserSubmit = async () => {
        let data = { token: user.token, address, name, phone, pincode }
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let res = await a.json();
        if (res.success) {
            toast.success("SuccessFully Updated Details!", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const handlePasswordSubmit = async () => {
        let res;
        if (npassword == cpassword) {
            let data = { token: user.token, password, cpassword, npassword }
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            res = await a.json();
        }
        else {
            res = { success: false }
        }
        if (res.success) {
            toast.success("SuccessFully Updated Password!", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error("Error Updating Password!", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        setPassword('')
        setCpassword('')
        setNpassword('')
    }

    return (
        <div className='w-[80vw] container mx-auto my-9'>
            <ToastContainer
                position="top-left"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Head>
                <title>MyAccount - XenithGoods</title>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            <h1 className='text-3xl text-center font-bold font-mono text-gray-50 mb-8'>My Account</h1>
            <h2 className='font-semibold text-xl text-gray-100 my-6'>1. Delivery Details</h2>
            <div className='flex md:flex-row flex-col mx-auto my-2'>
                <div className='px-2 md:w-1/2 w-full'>
                    <div className=" mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-300">Name</label>
                        <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className='px-2 md:w-1/2 w-full'>
                    <div className=" mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-300">Email( Cannot Be Updated )</label>
                        {user && user.token ? <input value={user.email} readOnly={true} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}

                    </div>
                </div>
            </div>
            <div className='px-2 w-full'>
                <div className=" mb-4">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-300">Address</label>
                    <textarea onChange={handleChange} value={address} name='address' id='address' cols="30" rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-pin k-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                </div>
            </div>
            <div className='flex md:flex-row flex-col mx-auto my-2'>
                <div className='px-2 md:w-1/2 w-full'>
                    <div className=" mb-4">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-300">Phone Number</label>
                        <input onChange={handleChange} value={phone} placeholder='Your 10 Digit Phone Number' type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className='px-2 md:w-1/2 w-full'>
                    <div className=" mb-4">
                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-300">Pincode</label>
                        <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>
            <button onClick={handleUserSubmit} className="m-2 disabled:bg-indigo-300 flex mb-5 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">Change Delivery Details</button>

            <h2 className='font-semibold text-xl text-gray-50 mt-10 mb-6'>2. Change Password</h2>
            <div className='flex md:flex-row flex-col mx-auto my-2'>
                <div className='px-2 md:w-1/2 w-full'>
                    <div className=" mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-300">Password</label>
                        <input onChange={handleChange} value={password} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className='px-2 md:w-1/2 w-full'>
                    <div className=" mb-4">
                        <label htmlFor="npassword" className="leading-7 text-sm text-gray-300">New Password</label>
                        <input onChange={handleChange} value={npassword} type="password" id="npassword" name="npassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className='px-2 md:w-1/2 w-full'>
                    <div className=" mb-4">
                        <label htmlFor="cpassword" className="leading-7 text-sm text-gray-300">Confirm New Password</label>
                        <input onChange={handleChange} value={cpassword} type="password" id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>
            <button onClick={handlePasswordSubmit} className="m-2 disabled:bg-indigo-300 flex text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">Change Password</button>
        </div>
    )
}

export default MyAccount