import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Sidebar from './Admincomponents/Sidebar'

import { useRouter } from 'next/router'

import Product from "../../models/Product"
import mongoose from 'mongoose'

import { Modal, Button, useDisclosure } from "@nextui-org/react";

import ModalContainer from './Admincomponents/modal';

const Allproducts = ({ products, isAdmin }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [func, setFunc] = useState()
    const [product, setProduct] = useState()

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // const router = useRouter()

    // useEffect(() => {
    //     if (!isAdmin) {
    //         router.push('/')
    //     }
    //     //eslint-disable-next-line
    // }, [])

    return (
        <>
            {isAdmin ? <><div className='flex'>
                <Head>
                    <title>AllProducts - XenithGoods</title>
                    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
                </Head>
                <Sidebar />
                <div>
                    <section className="min-h-screen text-gray-600 body-font">
                        <div className="container px-5 md:py-12 py-6 mx-auto">
                            <h1 className='font-bold text-3xl text-center mb-8 text-gray-100 font-mono'>All Products</h1>
                            <div className="flex justify-center flex-wrap -m-4  mx-5 text-center">
                                {Object.keys(products).length === 0 && <p className='text-gray-50'>No Product is Added</p>}
                                {Object.keys(products).map((item) => (
                                    <div key={products[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-xl m-5">
                                        <div className="block relative rounded overflow-hidden">
                                            <img alt="ecommerce" className="m-auto h-[30vh] md:h-[33vh] block" src={products[item].img} />
                                        </div>
                                        <div className="mt-4 text-center md:text-left">
                                            <h3 className="text-gray-400 text-xs tracking-widest title-font mb-1">{capitalize(products[item].category)}</h3>
                                            <h2 className="text-gray-50 title-font text-lg font-medium">{products[item].title}</h2>
                                            <h2 className="text-gray-50 title-font text-xs font-medium">{products[item].slug}</h2>
                                            <p className="text-gray-100 mt-5 mb-1">₹{products[item].price}</p>
                                            <div className='flex items-center mb-2 mt-4 '>
                                                <div className="mx-1">
                                                    {products[item].size.includes('S') && <span className='border border-gray-300 px-2 py-1 mx-1 text-gray-400'>S</span>}
                                                    {products[item].size.includes('M') && <span className='border border-gray-300 px-2 py-1 mx-1 text-gray-400'>M</span>}
                                                    {products[item].size.startsWith('L') && <span className='border border-gray-300 px-2 py-1 mx-1 text-gray-400'>L</span>}
                                                    {products[item].size.includes('XL') && <span className='border border-gray-300 px-2 py-1 mx-1 text-gray-400'>XL</span>}
                                                    {products[item].size.includes('XXL') && <span className='border border-gray-300 px-2 py-1 mx-1 text-gray-400'>XXL</span>}
                                                </div>
                                                <div className='mt-0'>
                                                    {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                    {products[item].color.includes('white') && <button className="border-2 border-gray-900 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
                                                    {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                    {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                                                    {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                    {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-400 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                    {products[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                    {products[item].color.includes('orange') && <button className="border-2 border-gray-300 ml-1 bg-orange-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <Button onPress={onOpen} onClick={() => { setFunc('Update'); setProduct(products[item]) }} className="w-fit mx-1 justify-center items-center flex mt-6 mb-4 text-white bg-indigo-600 border-2 border-gray-500 py-2 px-2 focus:outline-none hover:bg-indigo-500 rounded text-sm">Update</Button>
                                            <Button onPress={onOpen} onClick={() => { setFunc('Delete'); setProduct(products[item]) }} className="w-fit mx-1 justify-center items-center flex mt-6 mb-4 text-white bg-red-500 border-2 border-gray-500 py-2 px-2 focus:outline-none hover:bg-red-400 rounded text-sm">Delete</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='bg-violet-300'>
                    <ModalContainer func={func} product={product} />
                </Modal> </> : <div className='md:min-h-screen min-h-[80vh] flex justify-center items-center bg-gray-900'>
                <main class="grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
                    <div class="text-center">
                        <p class="text-4xl font-semibold text-gray-50">404</p>
                        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-100 sm:text-5xl">Page not found</h1>
                        <p class="mt-6 text-base leading-7 text-gray-100">Sorry, we couldn’t find the page you’re looking for.</p>
                        <div class="mt-10 flex items-center justify-center gap-x-6">
                            <Link href={'/'} class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</Link>
                        </div>
                    </div>
                </main>
            </div>}
        </>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }

    let Allproducts = await Product.find({})

    return {
        props: { products: JSON.parse(JSON.stringify(Allproducts)) },
    }
}

export default Allproducts