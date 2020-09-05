import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiTrendingDown } from 'react-icons/fi';
import '../../style/css/style.css';


const Header = ({title,description,url,image, type}) => {
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
      
    },[]);
    return (
        <>
          <Head>
            <meta CharSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="description" content="Amazon price tracker, eBay price tracker,
             walmart price tracker, Free Price tracker, product tracker, price drop, price drop alert
             , boat sales, amazon, ebay, amazon prices, ebay shopping, amazon shopping, online shopping" />
            <meta name="p:domain_verify" content="073c1c8f24e9376166e83c6d70fcf770"/>
             <meta property="og:title" content={title} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <title>{title}</title>
            <script data-ad-client="ca-pub-7391905567078145" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-174290712-1"
                />

            <script
                dangerouslySetInnerHTML={{
                __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'UA-174290712-1');
                    `,
                }}
            />

         </Head>
         <header className="site__header">
                <a href="/" className="site__title">CHEAPRICE <FiTrendingDown /></a>
                <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/deals">Deals</a></li>
                    <li><Link href='/privacy'><a>Privacy</a></Link></li>
                    <li><Link href='/faqs'><a>FAQs</a></Link></li>
                    <li><Link href='/contact'><a>Contact</a></Link></li>
                    <li>
                     <Link  href="/tracking"><a className="action__btn">Get Started</a></Link>
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
                    <li><a href="/">Home</a></li>
                    <li><Link href='/deals'><a>Deals</a></Link></li>
                    <li><Link href='/privacy'><a>Privacy</a></Link></li>
                    <li><Link href='/faqs'><a>FAQs</a></Link></li>
                    <li><Link href='/contact'><a>Contact</a></Link></li>
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