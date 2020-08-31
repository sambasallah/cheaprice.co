import React from 'react';
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
  return (
    <>
     <Header title="Amazon Price Tracker | eBay Price Tracker App" description="Amazon price tracker, eBay price tracker,
             walmart price tracker, Free Price tracker, ecommerce stores, price tracker, best price tracker, amazon price history,
             amazon price history tracker, price tracker amazon, price history tracker amazon,
             ebay price tracker free, free price tracker, price history tracker" />
     <main className="main__body">
       <div className="hero__section">
          <h1>Amazon & eBay Price Tracker</h1>
          <p>Free price tracker for Amazon & eBay</p>
          <img src='images/about1.png' style={{maxWidth: '70%', maxHeight: '50%'}} />
       </div>
       <div className="ecommerce__logos">
             <div><img src="images/amazon.png" style={{maxWidth: '40%', maxHeight: '40%'}}/></div>
             <div><img src="images/ebay.png" style={{maxWidth: '40%', maxHeight: '40%'}}/></div>
       </div>
       <div className="services">
          <h2>What We Offer</h2>
          <div className="services__list">
            <div><img src="images/pricechart.png" />
                <h3>Price History</h3>
            </div>  
          
            <div><img src="images/notification.png" />
                <h3>Price Alerts</h3>
            </div>
            <div><img src="images/productselection.png" />
                 <h3>Daily Deals</h3> 
            </div>
          </div>
       </div>
       {data? (
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
                            <span>BEST DEAL</span>
                              <div className="img__container">
                              <img src={value.image} style={{maxWidth: '100%', maxHeight: '100%'}} />
                              </div>
                            <div className="descrip">
                            <h6>{limitTitle(value.title) }</h6>
                          <h6>{value.price? '$'+value.price : 'OUT OF STOCK'} <del>{value.previousPrice}</del></h6>
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
    props: {data}, // will be passed to the page component as props
  }
}

export default Index;