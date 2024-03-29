import React, { useEffect } from 'react';
import Swiper from 'react-id-swiper';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Link from 'next/link';
import './style/css/style.css';
import 'swiper/swiper-bundle.min.css';
import SwiperCore,{ Pagination, Navigation} from "swiper"


const Index = ({data}) => {
  SwiperCore.use([Pagination,Navigation]);
  const limitTitle = (title) => {
    let newTitle = "";
    if(title.length < 15) {
        return title;
    }
    for(let i = 0; i < 18; i++) {
        newTitle += title.charAt(i);
    }
    return newTitle;
  }


  const params = {
    slidesPerView: 4,
    spaceBetween: 0,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
        },
    breakpoints: {
			320: {
				slidesPerView: 1,
				slidesPerGroup: 1
			},
			340: {
				slidesPerView: 1,
				slidesPerGroup: 1
			},
			500 : {
				slidesPerView: 2,
				slidesPerGroup: 2
			},
			640: {
			  slidesPerView: 2,
			  slidesPerGroup: 2
			},
			768: {
			  slidesPerView: 4,
			  spaceBetween: 40,
			},
			1024: {
			  slidesPerView: 5,
			  spaceBetween: 50,
      }
  }
}

useEffect(() => {
  
}, []);

  return (
    <>
     <Header title="Cheaprice.co: Best eBay & Amazon Price History Tracker: Price Tracker, Price Charts, Price Drops"
     description="Cheaprice.co allows you to track, check price history of products from amazon and ebay
     We currently offer Amazon Price Tracker and eBay Price Tracker"/>
     <main className="main__body">
       <div className="hero__section">
          <h1>Best eBay & Amazon Price Tracker | Price History | Price Charts </h1>
          <div className="text__content">
          <p>Free price history tracker for Amazon & eBay</p>
          <h2>Let Us Help You Save Money</h2>
          <p>Track Millions of products from Amazon & eBay and get notified when the prices drops for free.
          Amazon and eBay price's drop almost everyday if you wait just for a day or 
          so you will buy at a lower price, cheaprice.co is an amazon and ebay price tracker 
          that help you buy at the lowest price possible, 
          track prices and get notifications sent to your email or phone when the price drops
          </p>
          </div>
          <img src='images/about1.png' style={{maxWidth: '70%', maxHeight: '50%'}} />
       </div>
       <div className="ecommerce__logos">
             <div><img src="images/amazon.png" alt="Amazon Logo" style={{maxWidth: '40%', maxHeight: '40%'}}/></div>
             <div><img src="images/ebay.png" alt="eBay Logo" style={{maxWidth: '40%', maxHeight: '40%'}}/></div>
       </div>
       <div className="services">
          <h2>What We Offer</h2>
          <div className="services__list">
            <div><img src="images/pricechart.png" alt="Price Chart"/>
                <h3>Price History</h3>
            </div>  
          
            <div><img src="images/notification.png" alt="Notification" />
                <h3>Price Alerts</h3>
            </div>
            <div><img src="images/productselection.png" alt="Deals" />
                 <h3>Daily Deals</h3> 
            </div>
          </div>
       </div>
       {data.dailydrops.length >= 1? (
         <>
         <div className="daily__drops">
         <h2>DAILY DEALS</h2>
         <div className="daily__drop__products">
            <Swiper {...params}>
                { data.dailydrops.map((value) => {
                  return (
                      <div className="swiper-slide" key={value.id}>
                         <Link href={"/product/" + value.id}>
                         <div className="daily__product">
                              { value.price? <span>{ (Number(value.previousPrice) / Number(value.price) >= 1.5? 'Best Deal' : 'Good Deal') }</span> : '' }
                              <div className="img__container">
                              <img src={value.image} loading="lazy" style={{maxWidth: '100%', maxHeight: '100%'}} alt="Product Img" />
                              </div>
                            <div className="descrip">
                            <h6>{limitTitle(value.title) }</h6>
                          <h6>{value.price? '$'+value.price : 'OUT OF STOCK'} <del>{value.previousPrice}</del></h6>
                          <h6>{ value.price? (Math.ceil(((Number(value.previousPrice) - Number(value.price)) / Number(value.price)) * 100)) + '% Off' : '' }</h6>
                        </div>
                        </div>
                         </Link>
                      </div>
                  )
                })}
            </Swiper>
         </div>
       </div>
         </>
       ) : ''}
     </main>
     <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  let response = await fetch(process.env.NODE_ENV === 'development'? 
  `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/dailydrops` : 
  `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/dailydrops`);
  let data = await response.json();
  return {
    props: {data}
  }
  
}

export default Index;