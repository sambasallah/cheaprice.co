import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../style/css/style.css';

const FAQs = () => {
    return (
        <>
        <Header title="FAQs: Amazon Price Tracker: Cheaprice.co" />
        <div className="faqs__page">
            <div className="faqs__title">
                <h2>FAQs</h2>
            </div>
            <div className="faqs__content">
            <h2>What is CHEAPRICE</h2>
            <p>Cheaprice maintains price histories for all products on Amazon and eBay
            which are the world’s largest and most trusted online merchants. Users can individually 
            track the price development of products they are interested in, and Cheaprice will notify 
            them when the price has reached a predetermined threshold. Besides this tracking feature,Cheaprice
             can also be used to browse the full range of Amazon and eBay, Cheaprice is the best
             money saving website. Just give it a try!</p>

             <h2>Which items can be tracked?</h2>
             <p>All products available on Amazon and eBay can be tracked, with the rare exception of products 
                 with strict marketing regulations and eBooks.</p>
            <h2>Do I have to create an account to use CHEAPRICE?</h2>
            <p>No, currently Cheaprice does not have any user registration. You can track unlimited amount of 
                products from Amazon, eBay and Walmart without having an account with us and price drop/alert notifications will be
                sent out to your provided contact informations.
            </p>
            <h2>How dependable are your prices?</h2>
            <p>Our data is constantly updating, and usually current. However, price fluctuations 
                happen constantly, and thus our listed price can theoretically sometimes 
                be behind a little bit. It is 
                thus always wise to double-check the price on Amazon or eBay before you actually finalize the purchase.</p>

            <h2>How often does your data update?</h2>
            <p>The update frequency varies, depending on the general interest in the product in question. 
                If a product is being tracked by someone, 
                it will be updated at least once every 30 minutes. Most others are updated several times daily.</p>
            <h2>How often will be you alerted about price drops</h2>
            <p>
                You will be sent an email everytime the price of the product you are tracking is reduced
                and if the price is equal or goes below your desired price drop amount.
            </p>
            <h2>How is <a href="https://cheaprice.co">Cheaprice</a> Different From <a href="https://camelcamelcamel.com">camelcamelcamel</a> and <a href="https://keepa.com">Keepa</a></h2>
            <p>Keepa.com and camelcamelcamel.com are both great price tracking tools but cheaprice is the tracking tool to use if you want
                ease of use without many complications and registrations.
            </p>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default FAQs;