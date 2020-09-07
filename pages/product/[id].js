import React, { useState, useEffect } from 'react';
import '../style/css/style.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import parse from 'html-react-parser';
import { FaStarOfLife } from 'react-icons/fa';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ToastContainer, toast } from 'react-toastify';
import { Line } from 'react-chartjs-2';
import { useRouter } from 'next/router';

const Product = ({data}) => {
    
    const router = useRouter();
    const [product, setProduct] = useState({...data});
    const [modal, setModal] = useState(false);
    const [priceHistory, setPriceHistory] = useState({date: [], price: []});
    const [formData, setFormData] = useState({
        email: "",
        phoneNumber: "",
        priceDropAmount: ""
    });
    const [loading, setLoading] = useState(false);

    const startTracking = async (event) => {
        event.preventDefault();
        setLoading(true);
        const { email, phoneNumber, priceDropAmount } = formData;
        let phone = phoneNumber? "+1" + phoneNumber : null;
        const productID = product.id;
        const url = product.url;
        const trackData = {email: email, phoneNumber: phone, priceDropAmount: priceDropAmount,
         id: productID, url: url};
        let response = await fetch(process.env.NODE_ENV === 'development'? 
        `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/users` : 
        `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/users`,{method: 'POST', body: JSON.stringify(trackData),
                headers: {'Content-Type': 'application/json'}});
        let data = await response.json();
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
                    email: "",
                    phoneNumber: "",
                    priceDropAmount: "",
                });
                closeModal();
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

    const getPriceHistory = async () => {
        let response = await fetch(process.env.NODE_ENV === 'development'? 
        `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/price/${router.query.id}` : 
        `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/price/${router.query.id}`);
        let data = await response.json();
        let date = [];
        let price = [];
        if(data) {
            data.prices.map((value) => {
                date.push(value.createdAt);
                price.push(Number(value.price));
            });
            setPriceHistory({date: [...date].sort(), price: [...price].sort()});
        }
    }

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value});
    }


    useEffect(() => {
        getPriceHistory();
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (err) {
            console.log(err);
          }
    },[])

    return (
        <div>
                <>
                 { Object.keys(product).length !== 0? (
                     <>
                     <ToastContainer />
                       <Header title={data.title} type="image/jpeg" image={data.image? data.image : data.fullImg} description={data.description !== null? data.description : data.title} />
                   <main className="product__page">
                       <div className="breadcrumb">
                           <h1>{ parse(String(data.title)) }</h1>
                       </div>
                       <ins
                        className="adsbygoogle adbanner-customize"
                        style={{
                            display: "block"
                        }}
                        data-ad-client="ca-pub-7391905567078145"
                        data-ad-slot="1723273533"
                        data-full-width-responsive="true"
                        />
                       <div className="product__info">
                           <div className="product__img">
                               <img src={data.image? data.image : data.fullImg.replace('http', 'https') } />
                           </div>
                           <div className="product__description">
                               <h1>Description</h1>
                               <ul>
                                   {data.price? <li>Price: ${Number(data.price)}</li> : <li>OUT OF STOCK</li>}
                                   { data.previousPrice? <li>Before : ${Number(data.previousPrice)}</li>: ''}
                               </ul>
                               <span>Started Tracking: { new Date(data.createdAt._seconds * 1000).toString()  }</span> <br /> <br />
                               <span>Last Updated: {  new Date(data.updatedAt._seconds * 1000).toTimeString() }</span>
                               { data.description !== null? (
                                   <>
                                    <h3>Details</h3>
                                    <p>{ parse(String(data.description)) }</p>
                                    </>
                               ) : (
                                   <>
                                     <h3>Click Below to see more info</h3>
                                   </>
                               )}
                               { data.store === 'Amazon'? (
                                   <>
                                    <a href={ data.url } target="__blank" className="buy__on__amazon">View On Amazon</a>
                                    <a href="#" onClick={openModal} className="track">Track Price</a>
                                   </>
                               ) : ''}
                               { data.store === 'eBay'? (
                                   <>
                                   <a href={ data.url } target="__blank" className="buy__on__ebay">View On eBay</a>
                                   <a href="#" onClick={openModal} className="track">Track Price</a>
                                   </>
                               ) : ''}
                               { data.store === 'Walmart'? (
                                   <>
                                     <a href={ data.url } target="__blank" className="buy__on__walmart">View On Walmart <FaStarOfLife style={{color: '#FF9900'}} /></a>
                                     <a href="#" onClick={openModal} className="track">Track Price</a>
                                   </>
                               ): ''}
                              
                           </div>
                           <Modal open={modal} classNames="custom-modal-style" onClose={closeModal}>
                                <h2 style={{paddingBottom: '20px', fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"
                                   ,fontWeight: 'lighter', fontSize: '25px' ,textAlign: 'center'}}>Track Product</h2>
                                <form onSubmit={startTracking}>
                                    <input required type="text" style={
                                        {width: '100%', maxWidth: '100%',
                                         height: '45px',maxHeight: '50px',
                                         border: '1px solid rgba(0,0,0,0.5)',
                                         padding: '0px 12px',
                                         fontSize: '18px',
                                         backgroundColor: '#f6f6f6',
                                         marginBottom: '10px',
                                         fontWeight:'lighter'
                                         }} placeholder="Email Address" value={formData.email} id="email"
                                         pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' onChange={handleChange} />
                                    <input  type="text" style={
                                        {width: '100%', maxWidth: '100%',
                                         height: '45px',maxHeight: '50px',
                                         border: '1px solid rgba(0,0,0,0.5)',
                                         padding: '0px 12px',
                                         fontSize: '18px',
                                         backgroundColor: '#f6f6f6',
                                         marginBottom: '10px',
                                         fontWeight:'lighter'
                                         }} placeholder="Phone Number (Optional)" 
                                         value={formData.phoneNumber} id="phoneNumber" 
                                         pattern="[0-9]{10}" onChange={handleChange} />
                                    <input required type="text" style={
                                        {width: '100%', maxWidth: '100%',
                                         height: '45px',maxHeight: '50px',
                                         border: '1px solid rgba(0,0,0,0.5)',
                                         padding: '0px 12px',
                                         fontSize: '18px',
                                         backgroundColor: '#f6f6f6',
                                         marginBottom: '10px',
                                         fontWeight:'lighter'
                                         }} placeholder="Price Drop Amount" 
                                         value={formData.priceDropAmount} id="priceDropAmount" 
                                         pattern="[0-9]+" onChange={handleChange} />
                                    <button type="Submit" style={
                                        {
                                            maxWidth: '150px',
                                            maxHeight: '50px',
                                            backgroundColor: '#3f3a64',
                                            color: '#0099e5',
                                            border: '1px solid #0099e5',
                                            backgroundColor: 'transparent',
                                            fontSize: '20px',
                                            fontWeight: 'bold',
                                            fontFamily: 'serif',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            padding: '10px'
                                        }}>{loading? 'Loading...' : 'Track'}</button>
                                </form>
                           </Modal>
                       </div>
                       <ins
                        className="adsbygoogle"
                        style={{
                            display: "block"
                        }}
                        data-ad-client="ca-pub-7391905567078145"
                        data-ad-slot="1723273533"
                        data-full-width-responsive="true"
                         />
                       <div className="price__history">
                           {priceHistory? (
                               <>
                               <Line
                                    data={{
                                        labels: priceHistory.date,
                                        datasets: [{label: 'Price History',
                                                    data: priceHistory.price,
                                        }]
                                    }}  
                                    width={100}
                                    height={450}
                                    options={{ maintainAspectRatio: false }}
                                    />
                               </>
                           ) : (<h1>Loading...</h1>)}
                        </div>
                   </main>
                <Footer />
                     </>
                 ) : (
                     <>
                      <Header title="Product Does Not Exist" />
                       <main className="product__not__exist">
                       <ins
                            className="adsbygoogle adbanner-customize"
                            style={{
                                display: "block"
                            }}
                            data-ad-client="ca-pub-7391905567078145"
                            data-ad-slot="1723273533"
                            data-full-width-responsive="true"
                            />
                            <div className="not__found">
                                Product Not Found
                            </div>
                       </main>
                      <Footer />
                     </>
                 )}
               </>
        </div>
    )
}

export async function getServerSideProps(context) {
    let resp = await fetch(process.env.NODE_ENV === 'development'? 
    `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/products/${context.params.id}` : 
    `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/products/${context.params.id}`)
    let data = await resp.json();
    return {
      props: {data}, // will be passed to the page component as props
    }
  }



export default Product;