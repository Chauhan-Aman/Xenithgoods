import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Forgot = () => {

    const router = useRouter()

    console.log(router.query.token)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }
        //eslint-disable-next-line
    }, [])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')

    const handleChange = async (e) => {

        if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
        else if (e.target.name === 'cpassword') {
            setCpassword(e.target.value)
        }
    }

    const sendResetemail = async () => {
        const data = { email, sendMail: true }
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let res = await a.json();
        if (res.success) {
            console.log("Password reset instructions have been sent to your email")
        }
        else {
            console.log("Error")
        }
    }

    const resetPassword = async () => {
        if (password == cpassword) {
            const data = { password, sendMail: false }
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            let res = await a.json();
            if (res.success) {
                console.log("Password has been Changed")
            }
            else {
                console.log("Error")
            }
        }
    }

    return (
        <div>
            <Head>
                <title>Forgot Password - XenithGoods</title>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            <div className="flex min-h-screen flex-col justify-center px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image src={'/symbol.png'} width={50} height={50} alt='logo' className="mx-auto h-10 w-auto" />
                    <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">Forgot Password</h2>
                </div>

                <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    {router.query.token && <><form className="space-y-6 mt-5" action="#" method="POST">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-200">New Password</label>
                            <div className="mt-2">
                                <input onChange={handleChange} value={password} id="password" name="password" type="password" autoComplete="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-200">Confirm New Password</label>
                            <div className="mt-2">
                                <input onChange={handleChange} value={cpassword} id="cpassword" name="cpassword" type="password" autoComplete="cpassword" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                            </div>
                        </div>

                        <div>
                            <button onClick={resetPassword} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Continue</button>
                        </div>
                    </form>
                        {password !== cpassword && <span className='text-red-600'>Passwords Dont Match</span>}
                        {password && password === cpassword && <span className='text-green-600'>Passwords Match</span>}
                    </>}

                    {!router.query.token && <><form className="space-y-6 mt-5" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-200">Email address</label>
                            <div className="mt-2">
                                <input onChange={handleChange} value={email} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                            </div>
                        </div>

                        <div>
                            <button onClick={sendResetemail} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Continue</button>
                        </div>
                    </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Remember?
                            <Link href={'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login</Link>
                        </p>
                    </>}

                </div>
            </div>
        </div>
    )
}

export default Forgot