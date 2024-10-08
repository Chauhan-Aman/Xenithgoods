/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Sidebar from './Admincomponents/Sidebar'

import Product from "../../models/Product"
import mongoose from 'mongoose'

import { Input, Button, useDisclosure } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";

import ModalContainer from './Admincomponents/modal';

const Allproducts = ({ products, isAdmin }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [func, setFunc] = useState()
    const [product, setProduct] = useState()

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const [query, setQuery] = useState('')

    const filteredProducts =
        query === ''
            ? Object.values(products)
            : Object.values(products).filter((product) => {
                return product.title.toLowerCase().includes(query.toLowerCase());
            });

    const SearchChange = (e) => {
        if (e.target.name === 'search') {
            setQuery(e.target.value)
        }
    }

    const sizeSpan = (size) => { return (<span className='border border-gray-300 px-2 py-1 mx-1 text-gray-400'>{size}</span>) }

    const colorButton = (color) => {
        if (color == 'black' || color == 'white') {
            return (<button className={`border-2 border-gray-300 ml-1 bg-${color} rounded-full w-6 h-6 focus:outline-none`}></button>)
        }
        else if (color == 'yellow') {
            return (<button className={`border-2 border-gray-300 ml-1 bg-${color}-400 rounded-full w-6 h-6 focus:outline-none`}></button>)
        }
        else if (color == 'gray' || color == 'pink') {
            return (<button className={`border-2 border-gray-300 ml-1 bg-${color}-500 rounded-full w-6 h-6 focus:outline-none`}></button>)
        }
        else {
            return (<button className={`border-2 border-gray-300 ml-1 bg-${color}-700 rounded-full w-6 h-6 focus:outline-none`}></button>)
        }
    }

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
                            <div className='flex sm:flex-row flex-col sm:justify-between justify-center sm:px-28 px-0'>
                                <h1 className='font-bold text-3xl text-center mb-8 text-gray-100 font-mono'>All Products</h1>
                                <div className='flex justify-center ml-10'>
                                    <Input
                                        classNames={{
                                            base: "max-w-fit min-w-fit sm:max-w-[13rem] sm:min-w-[15rem] h-10 bg-indigo-100 rounded",
                                            mainWrapper: "h-full",
                                            input: "text-small",
                                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                        }}
                                        placeholder="Type to search..."
                                        size="sm"
                                        startContent={<CiSearch size={18} />}
                                        type="search"
                                        name='search'
                                        onChange={SearchChange}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center flex-wrap -m-4  mx-5 text-center">
                                {Object.keys(products).length === 0 && <p className='text-gray-50'>No Product is Added</p>}
                                {Object.keys(filteredProducts).map((item) => (
                                    <div key={filteredProducts[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-xl m-5">
                                        <div className="block relative rounded overflow-hidden">
                                            <img alt="ecommerce" className="m-auto h-[30vh] md:h-[33vh] block" src={filteredProducts[item].img} />
                                        </div>
                                        <div className="mt-4 text-center md:text-left">
                                            <h3 className="text-gray-400 text-xs tracking-widest title-font mb-1">{filteredProducts[item].type}</h3>
                                            <h2 className="text-gray-50 title-font text-lg font-medium">{filteredProducts[item].title.split('-')[1]}</h2>
                                            <p className="text-gray-400 title-font text-xs font-medium">{filteredProducts[item].title.split('-')[0]}</p>
                                            <h2 className="text-gray-50 title-font text-xs font-medium mt-3">{filteredProducts[item].slug}</h2>
                                            <p className="text-gray-100 mt-5 mb-1">₹{filteredProducts[item].price}</p>
                                            <div className='flex items-center mb-2 mt-4 '>
                                                <div className="mx-1">
                                                    {filteredProducts[item].size.includes('S') && sizeSpan('S')}
                                                    {filteredProducts[item].size.includes('M') && sizeSpan('M')}
                                                    {filteredProducts[item].size.startsWith('L') && sizeSpan('L')}
                                                    {filteredProducts[item].size.startsWith('XL') && sizeSpan('XL')}
                                                    {filteredProducts[item].size.startsWith('XXL') && sizeSpan('XXL')}
                                                </div>
                                                <div className='mt-0'>
                                                    {filteredProducts[item].color.includes('red') && colorButton('red')}
                                                    {filteredProducts[item].color.includes('blue') && colorButton('blue')}
                                                    {filteredProducts[item].color.includes('black') && colorButton('black')}
                                                    {filteredProducts[item].color.includes('green') && colorButton('green')}
                                                    {filteredProducts[item].color.includes('yellow') && colorButton('yellow')}
                                                    {filteredProducts[item].color.includes('purple') && colorButton('purple')}
                                                    {filteredProducts[item].color.includes('orange') && colorButton('orange')}
                                                    {filteredProducts[item].color.includes('white') && colorButton('white')}
                                                    {filteredProducts[item].color.includes('gray') && colorButton('gray')}
                                                    {filteredProducts[item].color.includes('pink') && colorButton('pink')}
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
                <ModalContainer func={func} product={product} onOpenChange={onOpenChange} isOpen={isOpen} /> </> : <div className='md:min-h-screen min-h-[80vh] flex justify-center items-center bg-gray-900'>
                <main className="grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
                    <div className="text-center">
                        <p className="text-4xl font-semibold text-gray-50">404</p>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-100 sm:text-5xl">Page not found</h1>
                        <p className="mt-6 text-base leading-7 text-gray-100">Sorry, we couldn’t find the page you’re looking for.</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href={'/'} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</Link>
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