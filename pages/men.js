import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Product from "../models/Product"
import mongoose from 'mongoose'

import { Input, CheckboxGroup, Checkbox, Slider, Button } from '@nextui-org/react'
import { CiSearch } from "react-icons/ci";
import { IoFilterSharp } from "react-icons/io5";
import Card from '@/components/Card'

const Men = ({ products }) => {

    const [query, setQuery] = useState('')
    const [sizebox, setSizebox] = useState([])
    const [colorbox, setColorbox] = useState([])
    const [typebox, setTypebox] = useState([])
    const [price, setPrice] = useState([500, 12500])

    const [isOpen, setIsOpen] = useState(true)
    const [isResp, setIsResp] = useState(false)

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

    const handleChange = (value, name) => {
        if (name === 'sizebox') {
            setSizebox(value);
        } else if (name === 'colorbox') {
            setColorbox(value);
        } else if (name === 'typebox') {
            setTypebox(value);
        } else if (name === 'price') {
            setPrice(value);
        }
    };

    useEffect(() => {
        const updateRes = () => {
            if (window.innerWidth < 765) {
                setIsOpen(false)
                setIsResp(true)
            } else {
                setIsOpen(true)
                setIsResp(false)
            }
        };

        updateRes();

        const handleResize = () => {
            updateRes();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <>
            <div>
                <Head>
                    <title>MEN - XenithGoods</title>
                    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
                </Head>
                <div className='flex'>
                    {isResp && <Button variant='light' className={`fixed ${isResp ? "top-37 left-0 mb-20" : "top-24  left-5"} z-50 flex justify-start w-fit text-white items-center`} onClick={() => setIsOpen(!isOpen)}>
                        <IoFilterSharp />
                        <p className='ml-2'>Filters</p>
                    </Button>}
                    <div className={` ${isResp ? 'fixed z-40 overflow-y-auto' : 'sticky top-16 bottom-0'} flex flex-col justify-between sm:h-[91vh] h-[83vh] w-72 bg-slate-700 pr-8 pl-6 pt-10 pb-10 text-white transition-all ${isOpen ? 'left-0 translate-x-0' : '-left-96 -translate-x-80'}`}>
                        <div className='flex flex-col'>
                            {!isResp && <div className='flex justify-start w-fit text-white items-center'>
                                <IoFilterSharp />
                                <p className='ml-2'>Filters</p>
                            </div>}
                            <div className='mb-5 mt-10'>
                                <Slider
                                    label="Price Range"
                                    size="sm"
                                    step={1500}
                                    showSteps={true}
                                    maxValue={12500}
                                    minValue={500}
                                    aria-label="Price"
                                    defaultValue={[500, 12500]}
                                    className="max-w-md"
                                    name='price'
                                    onChange={(value) => handleChange(value, 'price')}
                                />
                            </div>
                            <div className='my-2 mb-6'>
                                <CheckboxGroup
                                    label="Category :"
                                    defaultValue={[]}
                                    classNames={{
                                        label: "text-white text-md mb-2 pl-1",
                                    }}
                                    orientation='horizontal'
                                    disableAnimation='false'
                                    name='typebox'
                                    onChange={(values) => handleChange(values, 'typebox')}
                                >
                                    <Checkbox value="Shirt" size='sm' color='default'><p className='text-gray-300 w-20'>Shirt</p></Checkbox>
                                    <Checkbox value="TShirt" size='sm' color='default'><p className='text-gray-300 w-20'>TShirt</p></Checkbox>
                                    <Checkbox value="Jeans" size='sm' color='default'><p className='text-gray-300 w-20'>Jeans</p></Checkbox>
                                    <Checkbox value="Trouser" size='sm' color='default'><p className='text-gray-300 w-20'>Trouser</p></Checkbox>
                                </CheckboxGroup>
                            </div>
                            <div className='my-2 mb-4'>
                                <CheckboxGroup
                                    label="Select Colors :"
                                    defaultValue={[]}
                                    classNames={{
                                        label: "text-white text-md mb-2 pl-1",
                                    }}
                                    orientation='horizontal'
                                    disableAnimation='false'
                                    name='sizebox'
                                    onChange={(values) => handleChange(values, 'colorbox')}
                                >
                                    <Checkbox value="red" size='sm' color='danger'><p className='text-red-400 w-20'>Red</p></Checkbox>
                                    <Checkbox value="blue" size='sm' color='primary'><p className='text-blue-400 w-20'>Blue</p></Checkbox>
                                    <Checkbox value="black" size='sm' color='default'><p className='text-black w-20'>Black</p></Checkbox>
                                    <Checkbox value="green" size='sm' color='success'><p className='text-green-400 w-20'>Green</p></Checkbox>
                                    <Checkbox value="yellow" size='sm' color='default'><p className='text-yellow-400 w-20'>Yellow</p></Checkbox>
                                    <Checkbox value="purple" size='sm' color='secondary'><p className='text-purple-400 w-20'>Purple</p></Checkbox>
                                    <Checkbox value="orange" size='sm' color='warning'><p className='text-orange-400 w-20'>Orange</p></Checkbox>
                                    <Checkbox value="white" size='sm' color='default'><p className='text-white w-20'>White</p></Checkbox>
                                    <Checkbox value="gray" size='sm' color='default'><p className='text-gray-400 w-20'>Gray</p></Checkbox>
                                    <Checkbox value="pink" size='sm' color='default'><p className='text-pink-400 w-20'>Pink</p></Checkbox>
                                </CheckboxGroup>
                            </div>
                            <div className='my-2 mb-6'>
                                <CheckboxGroup
                                    label="Select Sizes :"
                                    defaultValue={[]}
                                    classNames={{
                                        label: "text-white text-md mb-2 pl-1",
                                    }}
                                    orientation='horizontal'
                                    disableAnimation='false'
                                    name='sizebox'
                                    onChange={(values) => handleChange(values, 'sizebox')}
                                >
                                    <Checkbox value="S" size='sm' color='default'><p className='text-white w-8'>S</p></Checkbox>
                                    <Checkbox value="M" size='sm' color='default'><p className='text-white w-8'>M</p></Checkbox>
                                    <Checkbox value="L" size='sm' color='default'><p className='text-white w-8'>L</p></Checkbox>
                                    <Checkbox value="XL" size='sm' color='default'><p className='text-white w-8'>XL</p></Checkbox>
                                    <Checkbox value="XXL" size='sm' color='default'><p className='text-white w-8'>XXL</p></Checkbox>
                                </CheckboxGroup>
                            </div>
                        </div>
                        <div>
                            <Input
                                classNames={{
                                    base: "max-w-full min-w-full sm:max-w-[13rem] sm:min-w-[15rem] h-10 bg-indigo-100 rounded",
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

                    <Card type={'Men'} products={filteredProducts} CheckSize={sizebox} CheckColor={colorbox} CheckType={typebox} price={price} />

                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let products = await Product.find({ category: 'men' })

    let mens = {}
    for (let item of products) {
        if (item.title in mens) {
            if (!mens[item.title].color.includes(item.color) && item.availableQty > 0) {
                mens[item.title].color.push(item.color)
            }
            if (!mens[item.title].size.includes(item.size) && item.availableQty > 0) {
                mens[item.title].size.push(item.size)
            }
        }
        else {
            mens[item.title] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {
                mens[item.title].color = [item.color]
                mens[item.title].size = [item.size]
            }
            else {
                mens[item.title].color = []
                mens[item.title].size = []
            }
        }
    }
    return {
        props: { products: JSON.parse(JSON.stringify(mens)) },
    }
}

export default Men