import React, { useState, useEffect } from 'react';
import '../style/css/style.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Link from 'next/link';
import parse from 'html-react-parser';
import { FaStarOfLife } from 'react-icons/fa';
import urlUtil from 'url';

const Product = ({data}) => {
   
   
    return (
        <div>
                <>
                <Header title="Samsung Galaxy S9 | Cheaprice" type="image/jpeg" url={data.url} image={data.image} />
                   <main className="product__page">
                       <div className="breadcrumb">
                           <h1>{ parse(String(data.title)) }</h1>
                       </div>
                       <div className="product__info">
                           <div className="product__img">
                               <img src={data.image? data.image : data.fullImg } />
                           </div>
                           <div className="product__description">
                               <h1>Description</h1>
                               <ul>
                                   <li>Price : ${ data.price } </li>
                                   {/* <li>Before : $280</li> */}
                               </ul>
                               { data.description !== null? (
                                   <>
                                    <h3>Details</h3>
                                    <p>{ parse(String(data.description)) }</p>
                                    </>
                               ) : (
                                   <>
                                     <h3>Click Below to see more info</h3>
                                   </>
                               )}
                               { data.store === 'Amazon'? (
                                   <>
                                    <a href={ data.url } target="__blank" className="buy__on__amazon">View On Amazon</a>
                                   </>
                               ) : ''}
                               { data.store === 'eBay'? (
                                   <>
                                   <a href={ data.url } target="__blank" className="buy__on__ebay">View On eBay</a>
                                   </>
                               ) : ''}
                               { data.store === 'Walmart'? (
                                   <>
                                     <a href={ data.url } target="__blank" className="buy__on__walmart">View On Walmart <FaStarOfLife style={{color: '#FF9900'}} /></a>
                                   </>
                               ): ''}
                              
                           </div>
                       </div>
                   </main>
                <Footer />
               </>
        </div>
    )
}

export async function getServerSideProps(context) {
    let resp = await fetch(`https://cheaprice-co.vercel.app/api/products/${context.params.id}`);
    let data = await resp.json();
    return {
      props: {data}, // will be passed to the page component as props
    }
  }



export default Product;