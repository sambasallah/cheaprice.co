import React, { useState, useEffect } from 'react';
import '../style/css/style.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';

const Track = () => {

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [stores,setStores] = useState(["www.amazon.com","amazon.com","www.ebay.com",
    "ebay.com", "www.walmart.com","walmart.com"]);
    const [currentlyTracking, setCurrentlyTracking] = useState([]);
    
    const submitForm = async (event) => {
        event.preventDefault();
        setLoading(true);
        const { phone_number, url, email, price_drop_amount } = formData;
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
        let filteredData = {};
        if(phone_number.startsWith('+1') || phone_number.startsWith('001')) {
            filteredData = formData;
        } else {
            const phone = "+1" + phone_number;
            filteredData = {url: url, email: email, price_drop_amount: price_drop_amount, phone_number: phone};
        }
        let res = await fetch('https://cheaprice-co.vercel.app/api/users', {method: 'POST', body: JSON.stringify(filteredData), 
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
        if(str.length < 17) {
            return str;
        } 
        for(let i = 0; i < 18; i++) {
            newTitle += str.charAt(i);
        }
        return newTitle.trim() + "...";
    }
    
    const trackingData = async () => {
        let response = await fetch(`https://cheaprice-co.vercel.app/api/products/`);
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
        trackingData();
    },[]);
   
    return(
        <>
         <ToastContainer />
          <Header title="Track A Product" description="Amazon price tracker, eBay price tracker,
             walmart price tracker, Free Price tracker, ecommerce stores"/>
           <main className="track__page">
               <h1>Track A Product</h1>
               <p>Get Alerts sent to your Email and/or Phone when the price drops for free</p>
               <form onSubmit={ submitForm }>
                   <div>
                       <input type="url" placeholder="PRODUCT URL" id="url" onChange={handleChange} required/>
                   </div>
                   <div>
                       <input type="text" placeholder="PRICE DROP AMOUNT ($)" pattern="[0-9]+" id="price_drop_amount" onChange={handleChange} required/>
                   </div>
                   <div>
                       <input type="text" placeholder="EMAIL" id="email"
                       pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' onChange={handleChange} required/>
                   </div>
                   <div>
                        <input type="text" placeholder="US PHONE NUMBER (OPTIONAL)" id="phone_number" pattern="\+?[0-9]{10,13}" onChange={handleChange}/>
                   </div>
                   <div>
                      <button type="submit">{ loading? 'Loading...': 'Track' } </button>
                   </div>
               </form>
               
           </main>
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
                                        <img src={value.image} />
                                    </div>
                                    <div className="product__description">
                                        <p className="product__name">{limitTitle(String(value.title))}</p>
                                        <span className="price__now">${value.price}</span> {/** <span className="before__price">$260</span> */}
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