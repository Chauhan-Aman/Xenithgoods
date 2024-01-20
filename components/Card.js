/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'

const Card = ({ type, products, CheckSize, CheckColor, CheckType, price }) => {

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

    let hasMatchingProducts = false;

    return (
        <>
            <section className="min-h-screen text-gray-600 body-font">
                <div className="container px-5 md:py-24 py-12 mx-auto">
                    <div className="flex justify-center flex-wrap -m-4  mx-5 text-center">
                        {Object.keys(products).length === 0 && hasMatchingProducts && <p className='text-gray-50'>Sorry all the {type} Products are currently out of stock. New stock coming soon. Stay Tuned!</p>}
                        {Object.keys(products).map((item) => {
                            if (
                                price &&
                                products[item].price > price[0] &&
                                products[item].price < price[1] &&
                                CheckSize &&
                                CheckSize.every(size => products[item].size.includes(size)) &&
                                CheckColor &&
                                CheckColor.every(color => products[item].color.includes(color))&&
                                CheckType&&
                                CheckType.every(type => products[item].type.startsWith(type))
                            ) {
                                hasMatchingProducts = true;
                                return (
                                    <div key={products[item]._id} className=" p-4 w-fit cursor-pointer shadow-xl my-4 mx-2 border-2 border-gray-800">
                                        <Link passHref={true} href={`/product/${products[item].slug}`}>
                                            <div className="block relative rounded overflow-hidden">
                                                <img alt="ecommerce" className="m-auto w-[28vh] h-[34vh] block" src={products[item].img} />
                                            </div>
                                            <div className="mt-4 text-center md:text-left">
                                                <h3 className="text-gray-400 text-xs tracking-widest title-font mb-1">{products[item].type}</h3>
                                                <h2 className="text-gray-50 title-font text-lg font-medium">{products[item].title.split('-')[1]}</h2>
                                                <p className="text-gray-400 title-font text-xs font-medium">{products[item].title.split('-')[0]}</p>
                                                <p className="text-gray-100 mt-2 mb-4">₹{products[item].price}</p>
                                                <div className="mt-1">
                                                    {(CheckSize && CheckSize.length > 0) ? (
                                                        <>
                                                            {products[item].size.includes('S') && CheckSize.includes('S') && sizeSpan('S')}
                                                            {products[item].size.includes('M') && CheckSize.includes('M') && sizeSpan('M')}
                                                            {products[item].size.includes('L') && CheckSize.includes('L') && sizeSpan('L')}
                                                            {products[item].size.includes('XL') && CheckSize.includes('XL') && sizeSpan('XL')}
                                                            {products[item].size.includes('XXL') && CheckSize.includes('XXL') && sizeSpan('XXL')}
                                                        </>
                                                    ) :
                                                        <>
                                                            {products[item].size.includes('S') && sizeSpan('S')}
                                                            {products[item].size.includes('M') && sizeSpan('M')}
                                                            {products[item].size.includes('L') && sizeSpan('L')}
                                                            {products[item].size.includes('XL') && sizeSpan('XL')}
                                                            {products[item].size.includes('XXL') && sizeSpan('XXL')}
                                                        </>
                                                    }
                                                </div>
                                                <div className='mt-5'>
                                                    {(CheckColor && CheckColor.length > 0) ? (
                                                        <>
                                                            {products[item].color.includes('red') && CheckColor.includes('red') && colorButton('red')}
                                                            {products[item].color.includes('blue') && CheckColor.includes('blue') && colorButton('blue')}
                                                            {products[item].color.includes('black') && CheckColor.includes('black') && colorButton('black')}
                                                            {products[item].color.includes('green') && CheckColor.includes('green') && colorButton('green')}
                                                            {products[item].color.includes('yellow') && CheckColor.includes('yellow') && colorButton('yellow')}
                                                            {products[item].color.includes('purple') && CheckColor.includes('purple') && colorButton('purple')}
                                                            {products[item].color.includes('orange') && CheckColor.includes('orange') && colorButton('orange')}
                                                            {products[item].color.includes('white') && CheckColor.includes('white') && colorButton('white')}
                                                            {products[item].color.includes('gray') && CheckColor.includes('gray') && colorButton('gray')}
                                                            {products[item].color.includes('pink') && CheckColor.includes('pink') && colorButton('pink')}
                                                        </>
                                                    ) :
                                                        <>
                                                            {products[item].color.includes('red') && colorButton('red')}
                                                            {products[item].color.includes('blue') && colorButton('blue')}
                                                            {products[item].color.includes('black') && colorButton('black')}
                                                            {products[item].color.includes('green') && colorButton('green')}
                                                            {products[item].color.includes('yellow') && colorButton('yellow')}
                                                            {products[item].color.includes('purple') && colorButton('purple')}
                                                            {products[item].color.includes('orange') && colorButton('orange')}
                                                            {products[item].color.includes('white') && colorButton('white')}
                                                            {products[item].color.includes('gray') && colorButton('gray')}
                                                            {products[item].color.includes('pink') && colorButton('pink')}
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            }
                            return null;
                        })}
                        {!hasMatchingProducts && <p className='text-gray-50 text-3xl sm:text-xl font-mono flex flex-wrap justify-center items-center mx-auto'>Sorry all the {type} Products are currently out of stock. New stock coming soon. Stay Tuned!</p>}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Card