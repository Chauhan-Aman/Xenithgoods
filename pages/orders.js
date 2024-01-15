import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Orders = () => {

    const router = useRouter()

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token }),
            })
            const res = await a.json();
            setOrders(res.orders);
        }

        if (!localStorage.getItem('myuser')) {
            router.push('/')
        }
        else {
            fetchOrders()
        }
        //eslint-disable-next-line
    }, [])

    return (
        <div className='min-h-screen'>
            <Head>
                <title>Orders - XenithGoods</title>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            <h1 className='font-semibold text-center text-2xl p-8 text-gray-50'>My Orders</h1>
            <div className='container mx-auto w-[86vw]'>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 text-gray-100"># Order Id</th>
                                            <th scope="col" className="px-6 py-4 text-gray-100">Email</th>
                                            <th scope="col" className="px-6 py-4 text-gray-100">Amount</th>
                                            <th scope="col" className="px-6 py-4 text-gray-100">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {orders && orders.length === 0 && <><p>You have not placed any order. Please place an order!!</p><p>Thank You...</p></>} */}
                                        {orders && orders.length !== 0 && orders.map((item) => (
                                            <tr key={item._id}
                                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                <td className="whitespace-nowrap px-6 py-4 text-gray-100 font-medium">{item.orderId}</td>
                                                <td className="whitespace-nowrap px-6 py-4 text-gray-100">{item.email}</td>
                                                <td className="whitespace-nowrap px-6 py-4 text-gray-100">{item.amount}</td>
                                                <td className="whitespace-nowrap px-6 py-4 text-gray-100"><Link href={'/order?id=' + item._id}>Details</Link></td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders