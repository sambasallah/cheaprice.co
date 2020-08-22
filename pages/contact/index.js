import React, {useState} from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../style/css/style.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });


    const sendMessage = (event) => {
        event.preventDefault();
        console.log(formData);
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value});
    }
    return (
        <>
        <Header title="Contact Us | Cheaprice.co" />
         <div className="contact__us">
             <div className="breadcrumb">
                 <h2>Contact Us</h2>
             </div>
             <div className="form__container">
                 <h2>Have Questions? Enquires? Support? Feature Request? 
                     Let us know! Drop us a line in the form below, and we'll get back to you as soon as possible!</h2>
                 <form onSubmit={sendMessage}>
                     <input type="text" placeholder="Your Name" id="name" value={formData.name} onChange={handleChange} required/>
                     <input type="text" placeholder="Your Email" id="email" value={formData.email} onChange={handleChange} required/>
                     <input type="text" placeholder="Subject" id="subject" value={formData.subject} onChange={handleChange} required/>
                     <textarea col="4" rows="20" placeholder="Message" id="message" value={formData.message} onChange={handleChange} required/>
                     <button type="submit" className="btn__send">Send Message</button>
                 </form>
             </div>
         </div>
        <Footer />
        </>
    )
}

export default Contact;