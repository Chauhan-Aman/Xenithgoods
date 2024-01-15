import React, { useState, useEffect } from 'react'
import { Input, CheckboxGroup, Checkbox, Slider, Button } from '@nextui-org/react'
import { CiSearch } from "react-icons/ci";
import { IoFilterSharp } from "react-icons/io5";

const Sidebar = ({ products }) => {

    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(true)
    const [isResp, setIsResp] = useState(true)

    const filteredProducts =
        query === ''
            ? products
            : Object.keys(products).filter((brand) => {
                return products[brand].title.toLowerCase().includes(query.toLowerCase());
            });

    const handleChange = (e) => {
        if (e.target.name === 'search') {
            setQuery(e.target.value)
            console.log(query)
            console.log(filteredProducts)
        }
    }

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
            {isResp && <Button variant='light' className={`fixed ${isResp ? "top-32  left-0" : "top-24  left-5"} z-50 flex justify-start w-fit text-white items-center`} onClick={() => setIsOpen(!isOpen)}>
                <IoFilterSharp />
                <p className='ml-2'>Filters</p>
            </Button>}
            <div className={`flex flex-col justify-between h-[91vh] ${isResp ? 'w-[60vw] absolute left-0 z-100 ' : 'w-fit'} bg-slate-700 pr-8 pl-6 pt-10 pb-10 text-white transition-all ${isOpen ? 'left-0 translate-x-0 sticky top-16 bottom-0 ' : '-left-96 -translate-x-80 absolute top-16 bottom-0 '}`}>
                <div className='flex flex-col'>
                    {!isResp && <div className='flex justify-start w-fit text-white items-center'>
                        <IoFilterSharp />
                        <p className='ml-2'>Filters</p>
                    </div>}
                    <div className='mb-6 mt-10'>
                        <Slider
                            label="Price Range"
                            size="sm"
                            step={100}
                            maxValue={10000}
                            minValue={200}
                            aria-label="Price"
                            defaultValue={0.2}
                            className="max-w-md"
                        />
                    </div>
                    <div className='my-2 mb-6'>
                        <CheckboxGroup
                            label="Select Colors :"
                            defaultValue={["buenos-aires", "london"]}
                            classNames={{
                                label: "text-white text-md mb-2 pl-1",
                            }}
                        >
                            <Checkbox value="buenos-aires" size='md' color='default'><p className='text-white'>Buenos Aires</p></Checkbox>
                            <Checkbox value="buenos-aires" size='md' color='default'><p className='text-white'>Buenos Aires</p></Checkbox>
                            <Checkbox value="buenos-aires" size='md' color='default'><p className='text-white'>Buenos Aires</p></Checkbox>
                            <Checkbox value="buenos-aires" size='md' color='default'><p className='text-white'>Buenos Aires</p></Checkbox>
                            <Checkbox value="buenos-aires" size='md' color='default'><p className='text-white'>Buenos Aires</p></Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div className='my-2 mb-6'>
                        <CheckboxGroup
                            label="Select Sizes :"
                            defaultValue={["buenos-aires", "london"]}
                            classNames={{
                                label: "text-white text-md mb-2 pl-1",
                            }}
                            orientation='horizontal'
                        >
                            <Checkbox value="buenos-aires" size='sm' color='default'><p className='text-white mr-2'>S</p></Checkbox>
                            <Checkbox value="buenos-aires" size='sm' color='default'><p className='text-white mr-2'>M</p></Checkbox>
                            <Checkbox value="buenos-aires" size='sm' color='default'><p className='text-white mr-2'>L</p></Checkbox>
                            <Checkbox value="buenos-aires" size='sm' color='default'><p className='text-white mr-2'>XL</p></Checkbox>
                            <Checkbox value="buenos-aires" size='sm' color='default'><p className='text-white mr-2'>XXL</p></Checkbox>
                        </CheckboxGroup>
                    </div>
                </div>
                <div>
                    <Input
                        classNames={{
                            base: "max-w-full sm:max-w-[20rem] h-10 bg-indigo-100 rounded",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        placeholder="Type to search..."
                        size="sm"
                        startContent={<CiSearch size={18} />}
                        type="search"
                        onChange={handleChange}
                        name='search'
                    />
                </div>
            </div>
        </>
    )
}

export default Sidebar