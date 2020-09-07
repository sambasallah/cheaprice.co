
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../style/css/style.css';

const Privacy = () => {
    return(
        <>
         <Header title="Privacy Policy: Amazon Price Tracker: Price History: Cheaprice.co" />
           <div className="privacy__page">
           <script data-ad-client="ca-pub-7391905567078145" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
               <div className="privacy__title">
                   <h2>Privacy Policy</h2>
               </div>
               <div className="privacy__content">
                   <p>
                    You can use all of our services without providing any personal information. 
                    However, if you do so we will not sell or trade your personal information under any circumstance.
                    Setting up a tracking request on our site implies that you'd like us to contact you via the contact 
                    information you provided us. We will do our best to only do so if useful and necessary - we hate spam 
                    as much as you do. You can delete all your information by contacting us <a href="/contact" style={{color: '#0099e5'}}>Send Us A Message</a></p>
                    <h2>Disclaimer</h2>
                    <p> Product prices shown are accurate as of the date/time indicated and are 
                    subject to change.</p>

                    <h2>Support</h2>
                    <p> If you are seeking support of any of our offered features, 
                    please <a href="/contact" style={{color: '#0099e5'}}>Send Us A Message</a>.</p>

               </div>
           </div>
         <Footer />
        </>
    )
}

export default Privacy;