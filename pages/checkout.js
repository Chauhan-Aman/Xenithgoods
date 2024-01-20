import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import Head from 'next/head'
import Script from 'next/script'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Checkout = ({ cart, clearCart, subTotal, addToCart, removeFromCart }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [user, setUser] = useState({ value: null })

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if (myuser && myuser.token) {
      setUser(myuser)
      setEmail(myuser.email)
      fetchData(myuser.token)
    }
  }, [])


  useEffect(() => {
    if (name.length > 3 && email.length > 3 && phone.length > 3 && address.length > 3 && pincode.length > 3) {
      setDisabled(false);
    }
    else {
      setDisabled(true)
    }
  }, [name, email, phone, pincode, address])


  const getPinCode = async (pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json()

    if (Object.keys(pinJson).includes(pin)) {
      setCity(pinJson[pin][0])
      setState(pinJson[pin][1])
    }
    else {
      setCity('')
      setState('')
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
    getPinCode(res.pincode)
  }

  const handleChange = async (e) => {

    if (e.target.name === 'name') {
      setName(e.target.value)
    }
    else if (e.target.name === 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name === 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name === 'address') {
      setAddress(e.target.value)
    }
    else if (e.target.name === 'pincode') {
      setPincode(e.target.value)
      if (e.target.value.length == 6) {
        getPinCode(e.target.value)
      }
      else {
        setCity('')
        setState('')
      }
    }
  }

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());

    //Fetch transaction token 
    const data = { cart, subTotal, oid, email: email, name, address, pincode, phone }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let txnRes = await a.json();
    // console.log(txnRes)
    if (txnRes.success) {
      let txnToken = txnRes.txnToken

      var config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
          "orderId": oid,
          "token": txnToken,
          "tokenType": "TXN_TOKEN",
          "amount": subTotal
        },
        "handler": {
          "notifyMerchant": function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          }
        }
      };
      window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      }).catch(function onError(error) {
        console.log("error => ", error);
      });
    }
    else {
      if (txnRes.cartClear) {
        clearCart()
      }
      toast.error(txnRes.error, {
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

  return (
    <div className='w-[80vw] px-2 mx-auto min-h-screen'>
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
        theme="light"
      />
      <Head>
        <title>Checkout - XenithGoods</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <Script type="application/javascript" crossorigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} />
      <h1 className='font-bold text-3xl my-8 text-center text-gray-100 font-mono'>Checkout</h1>
      <h2 className='font-semibold sm:text-start text-xl text-gray-100 mb-4'>1. Delivery Details</h2>
      <div className='flex md:flex-row flex-col mx-auto my-2'>
        <div className='px-2 md:w-1/2 w-full'>
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-300">Name</label>
            <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className='px-2 md:w-1/2 w-full'>
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-300">Email</label>
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
      <div className='flex md:flex-row flex-col mx-auto my-2'>
        <div className='px-2 md:w-1/2 w-full'>
          <div className=" mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-300">State</label>
            <input onChange={handleChange} value={state} readOnly={true} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className='px-2 md:w-1/2 w-full'>
          <div className=" mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-300">District</label>
            <input onChange={handleChange} value={city} readOnly={true} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>

      <h2 className='font-semibold text-xl text-gray-100 mb-4 mt-5'>2. Review Cart Items & Pay</h2>
      <div className='flex md:flex-row flex-col mb-20'>
        <div className='sideCart bg-indigo-500 md:py-6 md:px-9 pb-2 px-2 m-2 border-solid border-2 border-gray-400 rounded-md md:w-[60vw] w-full'>
          {Object.keys(cart).length === 0 && <div className='my-10 font-semibold text-center'>Your Cart is Empty!</div>}
          {Object.keys(cart).map((k) => (
            <div key={k} className="item flex'">
              <div className="flex border-2 mt-2 rounded-lg border-gray-600 sm:flex-row flex-row sm:p-4 p-2 w-full">
                <div className='relative rounded overflow-hidden flex flex-col justify-center items-center mr-4'>
                  <img alt="item" className="rounded object-cover object-center sm:w-24 sm:h-24 w-14 h-14 block" src={cart[k].img} />
                </div>
                <Link className="flex-grow" passHref={true} href={`/product/${cart[k].slug}`}>
                  <h2 className="text-black text-sm title-font sm:text-lg font-medium">{cart[k].name.split('-')[1]}</h2>
                  <h2 className="text-gray-900 text-xs title-font sm:text-sm font-medium">{cart[k].name.split('-')[0]}</h2>
                  <p className="leading-relaxed text-sm sm:text-base mb-2 text-stone-950">({cart[k].size}/{cart[k].variant})</p>
                  <p className="leading-relaxed text-base font-bold text-stone-950">₹{cart[k].price}</p>
                </Link>
                <div className='flex items-center justify-center w-1/3 font-semibold text-lg'>
                  <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-indigo-950' />
                  <span className='mx-2 text-sm'>{cart[k].qty}</span>
                  <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant, cart[k].img) }} className='cursor-pointer text-indigo-950' />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='sideCart bg-indigo-500 pt-6 pb-0 px-9 m-2 border-solid border-2 border-gray-400 rounded-md md:w-[38vw] w-full h-fit'>
          <div class="sm:p-4 px-0 py-4 w-full">
            <h2 class="font-medium title-font tracking-widest text-gray-900 mb-4 text-lg text-center sm:text-left">Order Summary</h2>
            <nav class="flex flex-col sm:items-start sm:text-left text-center items-center -mb-1 space-y-2.5 border-t-2 pt-4">
              <div className='flex justify-between w-full'>
                <p className='font-medium '>Subtotal</p>
                <p className='font-semibold pr-1'>₹{subTotal}</p>
              </div>
              <div className='flex justify-between w-full'>
                <p className='font-medium text-start'>Shipping estimate</p>
                <p className='font-semibold pr-1'>₹60</p>
              </div>
              <div className='flex justify-between w-full pb-5'>
                <p className='font-medium '>Tax estimate</p>
                <p className='font-semibold pr-1'>₹{Math.floor(subTotal * (0.03))}</p>
              </div>
              <div className='flex justify-between w-full border-t-2 border-gray-400 pt-2'>
                <p className='font-medium text-lg'>Order total</p>
                <p className='font-semibold pr-1'>₹{subTotal + 60 + Math.floor(subTotal * (0.03))}</p>
              </div>
            </nav>
            <div>
              <button disabled={disabled} onClick={initiatePayment} className="disabled:bg-indigo-400 flex mt-8 mb-4 text-white bg-indigo-600 border-2 border-gray-500 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />Pay ₹{subTotal}</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Checkout