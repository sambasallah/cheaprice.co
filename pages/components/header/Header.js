import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiTrendingDown } from 'react-icons/fi';

const Header = ({title,description}) => {
    const [resNav, setResNav] = useState(false);
    const [screenSize, setScreenSize] = useState(0);
  
    const openClose = (event) =>  {
        if(event.target.id === 'open') {
            setResNav(false);
        } else {
            setResNav(true);
        }
    }
    
    useEffect(() => {
        setScreenSize(window.innerWidth);
        console.log(screenSize);
    },[]);
    return (
        <>
          <Head>
            <meta CharSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="description" content="Amazon price tracker, eBay price tracker,
             walmart price tracker, Free Price tracker, ecommerce stores" />
            <title>{title}</title>
         </Head>
         <header className="site__header">
                <a href="/" className="site__title">CHEAPRICE <FiTrendingDown /></a>
                <nav>
                <ul>
                    <li><Link href='/'><a>Home</a></Link></li>
                    <li><Link href='#'><a>Deals</a></Link></li>
                    <li><Link href='#'><a>Privacy</a></Link></li>
                    <li><Link href='#'><a>FAQs</a></Link></li>
                    <li><Link href='#'><a>Contact</a></Link></li>
                    <li>
                    <Link href="/tracking"><a className="action__btn">Get Started</a></Link>
                    </li>
                </ul>
                </nav>
                <div className="hamburger__menu" onClick={ openClose }  id={(resNav? 'open' : 'close')} >
                    <span onClick={ openClose }  id={(resNav? 'open' : 'close')}></span>
                    <span onClick={ openClose }  id={(resNav? 'open' : 'close')}></span>
                    <span onClick={ openClose }  id={(resNav? 'open' : 'close')}></span>
                </div>
        </header> 
        
         { screenSize < 850? (
             <>
            <header className={ "responsive__nav " + (resNav? 'show': 'hide')} >
            <nav>
                <ul>
                    <li><Link href='/'><a>Home</a></Link></li>
                    <li><Link href='#'><a>Deals</a></Link></li>
                    <li><Link href='#'><a>Privacy</a></Link></li>
                    <li><Link href='#'><a>FAQs</a></Link></li>
                    <li><Link href='#'><a>Contact</a></Link></li>
                    <li>
                    <Link href="/tracking"><a className="get__started">Get Started</a></Link>
                    </li>
                </ul>
            </nav>
         </header>
             </>
         ): ''}
        </>
    )
}
export default Header;