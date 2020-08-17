import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './style/css/style.css';
// import { FiTrendingDown } from 'react-icons/fi';

const Index = () => {
  return (
    <>
     <Header title="Cheaprice | Amazon, eBay, Walmart & Etsy Price Tracker App" />
     <main className="main__body">
       <div className="hero__section">
          <h1>Amazon, eBay & Walmart Price Tracker</h1>
          <p>Free price tracker for Amazon, eBay, & Walmart</p>
          <img src='images/about1.png' style={{maxWidth: '70%', maxHeight: '50%'}} />
       </div>
       <div className="ecommerce__logos">
             <div><img src="images/amazon.png" style={{maxWidth: '40%', maxHeight: '40%'}}/></div>
             <div><img src="images/ebay.png" style={{maxWidth: '40%', maxHeight: '40%'}}/></div>
             <div><img src="images/walmart.png" style={{maxWidth: '40%', maxHeight: '40%'}}/></div>
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
     </main>
     <Footer />
    </>
  )
}

export default Index;