import React, { useState, useEffect } from 'react';
import '../style/css/style.css';
import 'flexboxgrid/dist/flexboxgrid.min.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Link from 'next/link';
import  Router from 'next/router';

const Deals = ({data}) => {

    const [search, setSearch] = useState(null);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState({products: [...data.products], lastVisible: data.lastVisible});

   
    const lookUp = async (event) => {
        event.preventDefault();
        Router.push('/deals?search=' + search);
        let resp = await fetch('http://localhost:3000/api/search/' + serializeString(search));
        let data = await resp.json();

        if(data) {
            setProducts({products: []});
        }
    }

    const limitTitle = (str) => {
        let newTitle = '';
        if(str.length < 35) {
            return str;
        } 
        for(let i = 0; i < 45; i++) {
            newTitle += str.charAt(i);
        }
        return newTitle.trim() + "...";
    }

    const serializeString = (str) => {
        let newString = '';
        for(let i = 0; i < str.length; i++) {
            if(str[i] !== ' ') {
                newString += str[i];
            } else {
                newString += '%20';
            }
        }
        return newString;
    }

    const loadMore = async (event) => {
        event.preventDefault();
        setLoading(true);
        let response = await fetch(process.env.NODE_ENV === 'development'? 
        `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/products/more` : 
        `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/products/more`, 
        {method: 'POST', body: JSON.stringify({lastVisible: products.lastVisible}), headers: 
        {'Content-Type': 'application/json'}});
        let data = await response.json();
        setLoading(false);
        setProducts({products: [...products.products,...data.products], lastVisible: data.lastVisible});
        
    }

    useEffect(() => {
      
      }, []);

    return (
       <>
             <Header title="Best Deals: Currently tracking | Cheaprice: Amazon Price History Tracker" description="Amazon price tracker | ebay price tracker: Best deals cheaprice.co" />
            <main className="deals">
                <div className="breadcrumb">
                    <h1>Best Deals</h1>
                </div>
                <div className="products">
                    {/* <div className="search__bar">
                        <h2>Filter</h2>
                        <form onSubmit={ lookUp }>
                            <input type="text" placeholder="Search" id="searchValue" onChange={handleChange} />
                            <button type="submit"><FaSearch /></button>
                        </form>
                    </div> */}
                    <div className="product__list">
                        <div className="row">
                          {products.products.map((value) => {
                              return (
                                  <>
                                    <Link href={`../product/${value.id}`}>
                                        <div className="product col-md-3" key={value.id}>
                                            <div className="product__img">
                                                    <img src={value.image? value.image : value.fullImg.replace('http', 'https')} style={{maxWidth: '100%', maxHeight: '100%'}} />
                                            </div>
                                            <div className="product__description">
                                                <p>{ limitTitle(String(value.title)) }</p>
                                                <p>{ value.price? `$${Number(value.price)}` : 'OUT OF STOCK' }</p>
                                            </div>
                                        </div>
                                    </Link>
                                  </>
                              )
                          })}
                         
                        </div>
                        <button onClick={loadMore} style={{width:'100%', marginTop:'15px', height: '40px', overflowAnchor: 'none'}}>{loading? 'Loading...' : 'Load More' }</button>
                    </div>
                </div>
            </main>
          <Footer />
      </>
    )
}

export async function getServerSideProps(context) {
    let resp = await fetch(process.env.NODE_ENV === 'development'? 
    `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/products/all` : 
    `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/products/all`)
    let data = await resp.json();
    if(data) {
        return {
            props: {data}, // will be passed to the page component as props
        }
    }
    
  }

export default Deals;