import { FiTrendingDown } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <>
         <footer className="footer__section">
                <div>
                
                <h3>CHEAPRICE <FiTrendingDown /></h3>
                <p>CHEAPRICE allows you to check historic prices of products from US based 
                    E-commerce stores for free. This is easy to use price tracker for US based 
                    E-commerce stores. We currently offer Amazon Price Tracker and eBay Price Tracker.</p>
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
                <div className="copyright">
                <span className="copyright__text">&copy; 2020 CHEAPRICE <FiTrendingDown />. All Rights Reserved</span>
                </div>
            </footer>
        </>
    )
}

export default Footer;