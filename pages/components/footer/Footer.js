import { FiTrendingDown } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaReddit, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <>
         <footer className="footer__section">
                <div>
                <h3>CHEAPRICE <FiTrendingDown /></h3>
                <p>CHEAPRICE allows you to check historic prices of products from US based 
                    E-commerce stores for free. This is easy to use price tracker for US based 
                    E-commerce stores. We currently offer Amazon Price Tracker and eBay Price Tracker.
                    Try it now! we will help you save a lot of money shopping on Amazon and eBay: Prices change
                    constantly waiting for a day or so will help you save 100s of dollars. Cheaprice.co 
                    will help you save money!</p>
                </div>
                <div className="copyright">
                <span className="copyright__text">&copy; 2020 CHEAPRICE <FiTrendingDown />. All Rights Reserved</span>
                 <ul className="social__icons">
                     <li><a href="https://www.facebook.com/cheaprice.co"><FaFacebook /></a></li>
                     <li><a href="https://www.instagram.com/cheaprice.co/"><FaInstagram /></a></li>
                     <li><a href="https://www.reddit.com/user/cheaprice-co"><FaReddit /></a></li>
                     <li><a href="https://twitter.com/CheapriceC"><FaTwitter /></a></li>
                     <li><a href="https://www.linkedin.com/company/cheaprice-co/"><FaLinkedin /></a></li>
                 </ul>
                </div>
               
            </footer>
        </>
    )
}

export default Footer;