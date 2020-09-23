import React, { useState, useEffect } from 'react';
import '../style/css/style.css';
import 'flexboxgrid/dist/flexboxgrid.min.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Link from 'next/link';
import  Router from 'next/router';
import { FaSearch, FaSpinner } from 'react-icons/fa';

const Deals = ({data}) => {

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchLoad, setSearchLoad] = useState(false);
    const [products, setProducts] = useState({products: [...data.products], lastVisible: data.lastVisible});

    let active = true;

    if(search.length > 2) {
        active = false;
    }
   
    const fullTextSearch = async (event) => {
        event.preventDefault();
        setSearchLoad(true);
        Router.push('/deals?search=' + serializeString(search));
        let resp = await fetch(process.env.NODE_ENV === 'development'? 
        `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/search`: 
        `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/search`, {method: 'POST', body: JSON.stringify({searchText: search}),
            headers: {'Content-Type': 'application/json'}});
        let data = await resp.json();
        if(data) {
            setSearchLoad(false)
            setProducts({products: [...data.products]});
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

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    useEffect(() => {
      
      }, []);

    return (
       <>
             <Header title="Best Deals: Currently tracking | Cheaprice: Amazon Price History Tracker" description="Amazon price tracker | ebay price tracker: Best deals cheaprice.co" />
            <main className="deals">
                <div className="breadcrumb deals-breadcrumb">
                    <h1>Best Deals</h1>
                    <form onSubmit={fullTextSearch}>
                        <input type="text" placeholder="Search" onChange={ handleChange }/>
                        <button type="submit" disabled={active}>{searchLoad? <FaSpinner /> : <FaSearch /> }</button>
                    </form>
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
                          { products.products.length > 0? (
                              <>
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
                              </>
                          ) : (
                              <h1>No Product Found</h1>
                          )}
                         
                        </div>
                        { products.lastVisible? (<button onClick={loadMore} style={{width:'100%', marginTop:'15px', height: '40px', overflowAnchor: 'none'}}>{loading? 'Loading...' : 'Load More' }</button>) : ('')}
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