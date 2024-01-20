import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from 'next/router'

const Navbar = ({ isAdmin, user, Logout, cart, addToCart, removeFromCart, clearCart, subTotal }) => {

    const [dropdown, setDropdown] = useState(false)
    const [sidebar, setSidebar] = useState(false)
    const [respicon, setResicon] = useState(false)

    const router = useRouter()

    let exempted = ['/checkout', '/order', '/allorders', '/myaccount', '/orders', '/login', '/signup']
    useEffect(() => {
        Object.keys(cart).length !== 0 && setSidebar(true)
        if (exempted.includes(router.pathname)) {
            setSidebar(false)
        } else {
            setSidebar(true)
        }
    }, [])

    const toggleCart = () => {
        setSidebar(!sidebar)
    }

    useEffect(() => {
        console.log(cart)
        const updateResIcons = () => {
            if (window.innerWidth < 765) {
                setResicon(true);
            } else {
                setResicon(false);
            }
        };

        updateResIcons();

        const handleResize = () => {
            updateResIcons();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {!sidebar && <span className='fixed right-2 top-6 z-50 cursor-pointer' onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}>
                {dropdown && <div className='absolute right-0 top-5 py-4 bg-white shadow-lg border rounded-md px-5 w-32 z-40'>
                    <ul>
                        <Link href={'/myaccount'}><li className='py-1 hover:text-indigo-700 text-sm font-bold'>My Account</li></Link>
                        <Link href={'/orders'}><li className='py-1 hover:text-indigo-700 text-sm font-bold'>My Orders</li></Link>
                        <li onClick={Logout} className='py-1 hover:text-indigo-700 text-sm font-bold'>Logout</li>
                    </ul>
                </div>}
                {user.value && <MdAccountCircle className='text-2xl text-indigo-700 md:text-3xl mx-2' />}
            </span>}

            <header className={`flex flex-col md:flex-row md:justify-start justify-between shadow-md sticky bg-gray-950 top-0 z-10 ${!sidebar && 'overflow-hidden'}`}>
                {isAdmin && respicon && <button className="fixed left-2 top-4 z-20 text-white bg-indigo-600 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-500 rounded text-base mr-4 md:mt-0"><Link href={'/admin/'}>Admin</Link></button>}
                {user.value && <AiOutlineShoppingCart onClick={toggleCart} className={`fixed z-20 cursor-pointer ${respicon ? 'text-2xl right-1 top-6' : 'text-3xl right-3 top-6'} mr-12 text-indigo-600`} />}
                {!user.value && <AiOutlineShoppingCart onClick={toggleCart} className={`fixed z-20 cursor-pointer ${respicon ? 'text-2xl right-5 top-5 mr-0' : 'text-3xl  right-20 top-5 mr-12'} text-indigo-600`} />}
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link href={'/'} className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                        <Image src={'/symbol.png'} width={40} height={40} alt='logo' />
                        <span className="text-xl">XenithGoods</span>
                    </Link>
                    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                        <Link href={'/men'} className="mr-5 text-white hover:text-indigo-300">MEN</Link>
                        <Link href={'/women'} className="mr-5 text-white hover:text-indigo-300">WOMEN</Link>
                        <Link href={'/hoodies'} className="mr-5 text-white hover:text-indigo-300">HOODIE</Link>
                        <Link href={'/sneakers'} className="mr-5 text-white hover:text-indigo-300">SNEAKER</Link>
                        <Link href={'/homeliving'} className="mr-5 text-white hover:text-indigo-300">HOME & LIVING</Link>
                        <Link href={'/accessories'} className="mr-5 text-white hover:text-indigo-300">ACCESSORIES</Link>
                    </nav>
                    <div className='flex justify-center items-center mt-3 sm:mt-0'>
                        {isAdmin && !respicon && <button className="fixed right-24 top-5 text-white bg-indigo-600 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-500 rounded text-base mr-4 mt-0 md:mt-1"><Link href={'/admin/'}>Admin</Link></button>}
                        {!user.value && <button className={`inline-flex items-center ${respicon ? 'mt-2' : 'fixed top-5 right-6'} text-white bg-indigo-600 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-500 rounded text-base mr-4 md:mt-0`}><Link href={'/login'}>Login</Link>
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </button>}
                    </div>
                </div>


                <div className={`w-80 h-[100vh] sideCart overflow-y-scroll top-0 absolute z-50 bg-indigo-400 px-4 py-10 transition-all ${sidebar ? 'right-0' : '-right-96'}`}>
                    <h2 className='font-bold text-xl text-center font-serif mb-5'>Shopping Cart</h2>
                    <span onClick={toggleCart} className='absolute top-5 right-2 cursor-pointer text-2xl text-indigo-800'><AiFillCloseCircle /></span>
                    {Object.keys(cart).length === 0 && <div className='my-10 font-semibold text-center'>Your Cart is Empty!</div>}
                    {Object.keys(cart).map((k) => (
                        <div key={k} className="item flex'">
                            <div className="flex border-2 mt-2 rounded-lg border-gray-600 sm:flex-row flex-row px-2 pt-4 pb-1 w-full">
                                <div className='relative rounded overflow-hidden flex flex-col justify-center items-center mr-4'>
                                    <img alt="item" className="rounded object-cover object-center w-16 h-16 block" src={cart[k].img} />
                                    <p className="leading-relaxed text-base">₹{cart[k].price}</p>
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-black text-sm title-font font-medium">{cart[k].name.split('-')[1]}</h2>
                                    <h2 className="text-black text-xs title-font font-medium">{cart[k].name.split('-')[0]}</h2>
                                    <p className="leading-relaxed text-base mb-2 text-stone-950">({cart[k].size}/{cart[k].variant})</p>
                                </div>
                                <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                                    <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-indigo-600' />
                                    <span className='mx-2 text-sm'>{cart[k].qty}</span>
                                    <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant, cart[k].img) }} className='cursor-pointer text-indigo-600' />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='flex justify-between border-t-2 pt-4 mt-12'>
                        <div className='font-semibold '>Subtotal: </div>
                        <div className='font-bold pr-1'>₹{subTotal}</div>
                    </div>
                    <p className='mt-3 text-sm'>Shipping and taxes calculated at checkout.</p>
                    <div className='flex justify-center items-center'>
                        <Link href={'/checkout'}><button disabled={Object.keys(cart).length === 0} className="disabled:bg-indigo-500 flex mr-2 mt-8 text-white bg-indigo-700 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />CheckOut</button></Link>
                        <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className="disabled:bg-indigo-500 flex mr-2 mt-8 h-fit text-white bg-indigo-700 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm"><RiDeleteBin5Fill className='m-1' />ClearCart</button>
                    </div>
                </div>
            </header>
        </>

    )
}

export default Navbar