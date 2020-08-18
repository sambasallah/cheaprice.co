import React, { useState, useEffect } from 'react';
import '../style/css/style.css';
import 'flexboxgrid/dist/flexboxgrid.min.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import  Router from 'next/router';

const Deals = ({data}) => {

    const [search, setSearch] = useState(null);
    const [products, setProducts] = useState({products: [...data.products]});
   
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
        if(str.length < 17) {
            return str;
        } 
        for(let i = 0; i < 22; i++) {
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

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    return (
       <>
             <Header title="Deals | Cheaprice" />
            <main className="deals">
                <div className="breadcrumb">
                    <h1>Deals</h1>
                </div>
                <div className="products">
                    <div className="search__bar">
                        <h2>Filter</h2>
                        <form onSubmit={ lookUp }>
                            <input type="text" placeholder="Search" id="searchValue" onChange={handleChange} />
                            <button type="submit"><FaSearch /></button>
                        </form>
                    </div>
                    <div className="product__list">
                        <div className="row">
                          {products.products.map((value) => {
                              return (
                                  <>
                                    <Link href={`../product/${value.id}`}>
                                        <div className="product col-md-3" key={value.id}>
                                            <div className="product__img">
                                                    <img src={value.image? value.image : value.fullImg} style={{maxWidth: '100%', maxHeight: '100%'}} />
                                            </div>
                                            <div className="product__description">
                                                <p>{ limitTitle(String(value.title)) }</p>
                                                <p>${ value.price }</p>
                                            </div>
                                        </div>
                                    </Link>
                                  </>
                              )
                          })}
                        </div>
                    </div>
                </div>
            </main>
          <Footer />
      </>
    )
}

export async function getServerSideProps(context) {
    let resp = await fetch('https://cheaprice-co.vercel.app/api/products/all');
    let data = await resp.json();
    if(data) {
        return {
            props: {data}, // will be passed to the page component as props
        }
    }
    
  }

export default Deals;