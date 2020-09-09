import React, { useState, useEffect } from 'react';
import '../style/css/style.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';

const Track = () => {

    const [formData, setFormData] = useState({
        url: "",
        email: "",
        phoneNumber: "",
        priceDropAmount: ""
    });
    const [loading, setLoading] = useState(false);
    const [stores,setStores] = useState(["www.amazon.com","amazon.com","www.ebay.com",
    "ebay.com"]);
    const [currentlyTracking, setCurrentlyTracking] = useState([]);
    
    const submitForm = async (event) => {
        event.preventDefault();
        setLoading(true);
        const { phoneNumber, url, email, priceDropAmount } = formData;
        const host = (new URL(url)).hostname;
        if(!stores.includes(host)) {
            toast.error('The store you entered is not supported.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
            setLoading(false);
            return;
        }
        
        let number = phoneNumber? "+1" + phoneNumber : null;
        const filteredData = {phoneNumber: number, url: url, email: email, priceDropAmount: priceDropAmount};
        let res = await fetch(process.env.NODE_ENV === 'development'? 
        `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/users` : 
        `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/users`,
         {method: 'POST', body: JSON.stringify(filteredData), 
        headers: {'Content-Type': 'application/json'}});
        let data = await res.json();
        if(data.statusCode === 201) {
                setLoading(false);  
                toast('Success! Tracking Initiated', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    setFormData({
                        url: "",
                        email: "",
                        phoneNumber: "",
                        priceDropAmount: "",
                    });
        } else {
            toast.error('Error! check your input again', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            setLoading(false);
       }
    }

    const limitTitle = (str) => {
        let newTitle = '';
        if(str.length < 18) {
            return str;
        } 
        for(let i = 0; i < 40; i++) {
            newTitle += str.charAt(i);
        }
        return newTitle.trim() + "...";
    }
    
    const trackingData = async () => {
        let response = await fetch(process.env.NODE_ENV === 'development'? 
        `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/products` : 
        `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/products`);
        let data = await response.json();

        if(data) {
            setCurrentlyTracking([...currentlyTracking, ...data.products]);
        } else {
            console.error('Error')
        }
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value});
    }

    useEffect(() => {
        try {
            trackingData();
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (err) {
            console.log(err);
          }    
    },[]);
   
    return(
        <>
         <ToastContainer />
          <Header title="Track A Product: Amazon Price Tracker: Price History: Cheaprice.co" description="Track price drops on amazon and get alerts sent to your phone or email when the price drops"/>
         
           <main className="track__page">
               <h1>Track A Product</h1>
               <p>Get Alerts sent to your Email and/or Phone when the price drops for free</p>
               <form onSubmit={ submitForm }>
                   <div>
                       <input type="url" placeholder="PRODUCT URL" id="url" value={formData.url} onChange={handleChange} required/>
                   </div>
                   <div>
                       <input type="text" placeholder="PRICE DROP AMOUNT ($)" pattern="[0-9]+" value={formData.priceDropAmount} id="priceDropAmount" onChange={handleChange} required/>
                   </div>
                   <div>
                       <input type="text" placeholder="EMAIL" value={formData.email} id="email"
                       pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' onChange={handleChange} required/>
                   </div>
                   <div>
                        <span value="+1" id="countryCode">+1</span>
                        <input type="text" placeholder="US PHONE NUMBER (OPTIONAL)" value={formData.phoneNumber} id="phoneNumber" 
                        pattern="[0-9]{10}" onChange={handleChange}/>
                   </div>
                   <div>
                      <button type="submit">{ loading? 'Loading...': 'Track' } </button>
                   </div>
               </form>
           </main>
           
           <div className="supported__stores">
                   <div>
                   <img src="images/amazon.png" style={{maxWidth: '100%', maxHeight: '100%'}} alt="Amazon Logo" />
                   </div>
                   <div>
                   <img src="images/ebay.png" style={{maxWidth: '100%', maxHeight: '100%'}} alt="eBay Logo"/>
                   </div>
            </div>
            <div style={{width: "95%", margin: "10px auto"}}>
            </div>
           <div className="currently__tracking">
               <h1>Currently Tracking</h1>
               <div className="currently__tracking_products">
                { currentlyTracking.length > 0 ?(
                     currentlyTracking.map((value) => {
                        return (
                            <>
                             <Link href={"../product/" + value.id} >
                                <div className="tracked__product"> 
                                    <div className="product__img">
                                        <img src={value.image? value.image : value.fullImg.replace('http','https')} />
                                    </div>
                                    <div className="product__description">
                                        <p className="product__name">{limitTitle(String(value.title))}</p>
                                        <span className="price__now">{value.price? '$' + value.price : 'OUT OF STOCK'}</span> {/** <span className="before__price">$260</span> */}
                                    </div>
                                </div>
                            </Link>
                            </>
                        )
                    })
                     ) : (
                    <>
                     <h1>Loading...</h1>
                    </>
                )}
               </div>
           </div>
           <Footer />
          
        </>
    )
}


export default Track;