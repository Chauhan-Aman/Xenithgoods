import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [navbarshow, setNavbarshow] = useState(true)
  useEffect(() => {
    let exempted = ['/admin', '/admin/add', '/admin/allorders', '/admin/allproducts', '/admin/imageUploader']
    Object.keys(cart).length !== 0 && setNavbarshow(true)
    if (exempted.includes(router.pathname)) {
      setNavbarshow(false)
    } else {
      setNavbarshow(true)
    }
    //eslint-disable-next-line
  }, [router.pathname])

  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState(0)
  const [progress, setProgress] = useState(0)

  const FetchCart = async () => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    const data = { email: myuser.email }

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/fetchcart`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    setCart(response.cart)
    saveCart(response.cart)
  }

  const UpdateCart = async (newCart) => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    const data = { email: myuser.email, cart: newCart }

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatecart`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
  }

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
      else {
        if (myuser) {
          FetchCart()
        }
      }
    } catch (error) {
      // console.log(error);
      localStorage.clear();
    }
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email })
    }
    setKey(Math.random())
    //eslint-disable-next-line
  }, [router.query])

  const Logout = () => {
    localStorage.removeItem('myuser');
    localStorage.clear()
    setUser({ value: null })
    setKey(Math.random())
    setTimeout(() => {
      router.push('/')
      window.location.reload()
    }, 1100);
  }

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart))
    let subt = 0;
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt)
  }

  const addToCart = async (itemCode, qty, price, name, size, variant, img, slug) => {
    if (Object.keys(cart).length == 0) {
      setKey(Math.random())
    }
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant, img, slug }
    }
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if (myuser) {
      await UpdateCart(newCart)
      FetchCart()
    }
    if (!myuser) {
      setCart(newCart)
      saveCart(newCart)
    }
  }

  const removeFromCart = async (itemCode, qty, price, name, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]
    }
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if (myuser) {
      await UpdateCart(newCart)
      FetchCart()
    }
    if (!myuser) {
      setCart(newCart)
      saveCart(newCart)
    }
  }

  const clearCart = async () => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if (myuser) {
      await UpdateCart({})
      FetchCart()
    }
    if (!myuser) {
      setCart({});
      saveCart({});
    }
  }

  const buyNow = async (itemCode, qty, price, name, size, variant, img, slug) => {
    let newCart = {}
    newCart[itemCode] = { qty: 1, price, name, size, variant, img, slug }
    const myuser = JSON.parse(localStorage.getItem('myuser'))
    if (myuser) {
      await UpdateCart(newCart)
      FetchCart()
    }
    if (!myuser) {
      setCart(newCart)
      saveCart(newCart)
    }
    router.push('/checkout')
  }

  const [isAdmin, setIsAdmin] = useState(false)

  const CheckAdmin = async () => {
    const myuser = JSON.parse(localStorage.getItem('myuser'))

    if (myuser) {
      const data = { token: myuser.token }

      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/isadmin`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let response = await res.json()
      if (response.success) {
        setIsAdmin(true)
      }
      else {
        setIsAdmin(false)
      }
    }
    else {
      setIsAdmin(false)
    }
  }

  useEffect(() => {
    CheckAdmin()
  }, [])


  return <>
    <LoadingBar
      color='#4f46e5'
      progress={progress}
      waitingTime={300}
      onLoaderFinished={() => setProgress(0)}
    />
    {key && navbarshow && <Navbar isAdmin={isAdmin} key={key} user={user} Logout={Logout} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />}
    <Component {...pageProps} isAdmin={isAdmin} CheckAdmin={CheckAdmin} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} buyNow={buyNow} subTotal={subTotal} />
    {navbarshow && <Footer />}
  </>
}