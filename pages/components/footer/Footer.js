import { FiTrendingDown } from 'react-icons/fi';

const Footer = () => {
    return (
        <>
         <footer className="footer__section">
                <div>
                <h3>CHEAPRICE <FiTrendingDown /></h3>
                <p>CHEAPRICE allows you to check historic prices of products from US based 
                    E-commerce stores for free. This is easy to use price tracker for US based 
                    E-commerce stores. We currently offer Amazon Price Tracker, eBay Price Tracker, Walmart Price
                    Tracker and Etsy Price Tracker</p>
                </div>
                <div className="copyright">
                <span className="copyright__text">&copy; 2020 CHEAPRICE <FiTrendingDown />. All Rights Reserved</span>
                </div>
            </footer>
        </>
    )
}

export default Footer;