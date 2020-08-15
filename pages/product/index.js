import '../style/css/style.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Link from 'next/link';
// import { FaStarOfLife } from 'react-icons/fa';

const Product = () => {
    return (
        <>
         <Header title="Samsung Galaxy S9 | Cheaprice" />
            <main className="product__page">
                <div className="breadcrumb">
                    <h1>Samsung Galaxy S9</h1>
                </div>
                <div className="product__info">
                    <div className="product__img">
                        <img src="images/product1.jpg" />
                    </div>
                    <div className="product__description">
                        <h1>Description</h1>
                        <ul>
                            <li>Price : $250 (Best Price) </li>
                            <li>Before : $280</li>
                        </ul>
                        <h3>Details</h3>
                        <p>Carve your own path with the LG K30 2019. Wherever you go, 
                            whatever you do, this pocket-sized device will keep up every step of the way. Sleek, 
                            light, and seamless to use, there’s nothing that will slow you down. It's stocked with all 
                            the essentials, plus a thoughtful selection of photography features that capture life in action. 
                            The 5.45" HD+ display is the perfect size to scroll through your feed or games on the go. And, 
                            convenient AI tools make little tasks a cinch. Go your own way—the LG K30 2019 is yours.</p>
                        <Link href="#" ><a className="buy__on__amazon">Buy On Amazon</a></Link> <br/>
                        {/* <Link href="#" ><a className="buy__on__ebay">Buy On eBay</a></Link>
                        <Link href="#" ><a className="buy__on__walmart">Buy On Walmart <FaStarOfLife style={{color: '#FF9900'}} /></a></Link>
                        <Link href="#" ><a className="buy__on__target">Buy On Target</a></Link> */}
                    </div>
                </div>
            </main>
         <Footer />
        </>
    )
}

export default Product;