import React, { useState, useEffect } from 'react';
import '../style/css/style.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Link from 'next/link';
import parse from 'html-react-parser';
import { FaStarOfLife } from 'react-icons/fa';
import urlUtil from 'url';

const Product = ({id}) => {
    const [product, setProduct] = useState({});

    const getProduct = async () => {
        let resp = await fetch(`https://cheaprice-co.vercel.app/api/products/${id}`);
        let data = await resp.json();

        if(data) {
           setProduct({...product, ...data});
        } else {
            console.error('Error fetching data');
        }
    }

    const isEmtpy = (data) => {
        if(data.id === undefined) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        getProduct();
    },[]);
    return (
        <div>
            { !isEmtpy(product)? (
                <>
                <Header title="Samsung Galaxy S9 | Cheaprice" type="image/jpeg" url={product.url} image={product.image} />
                   <main className="product__page">
                       <div className="breadcrumb">
                           <h1>{ parse(String(product.title)) }</h1>
                       </div>
                       <div className="product__info">
                           <div className="product__img">
                               <img src={product.image? product.image : product.fullImg } />
                           </div>
                           <div className="product__description">
                               <h1>Description</h1>
                               <ul>
                                   <li>Price : ${ product.price } </li>
                                   {/* <li>Before : $280</li> */}
                               </ul>
                               { product.description !== null? (
                                   <>
                                    <h3>Details</h3>
                                    <p>{ parse(String(product.description)) }</p>
                                    </>
                               ) : (
                                   <>
                                     <h3>Click Below to see more info</h3>
                                   </>
                               )}
                               { product.store === 'Amazon'? (
                                   <>
                                    <a href={ product.url } target="__blank" className="buy__on__amazon">View On Amazon</a>
                                   </>
                               ) : ''}
                               { product.store === 'eBay'? (
                                   <>
                                   <a href={ product.url } target="__blank" className="buy__on__ebay">View On eBay</a>
                                   </>
                               ) : ''}
                               { product.store === 'Walmart'? (
                                   <>
                                     <a href={ product.url } target="__blank" className="buy__on__walmart">View On Walmart <FaStarOfLife style={{color: '#FF9900'}} /></a>
                                   </>
                               ): ''}
                              
                           </div>
                       </div>
                   </main>
                <Footer />
               </>
            ) : (
                <>
                  <Header title="Cheaprice | Amazon, eBay & Walmart Price Tracker" />
                  <main>
                      <h1 style={{padding: '10px'}}>Loading...</h1>
                  </main>
                </>
            )}
        </div>
    )
}

export async function getServerSideProps(context) {
    return {
      props: {id: context.params.id}, // will be passed to the page component as props
    }
  }



export default Product;