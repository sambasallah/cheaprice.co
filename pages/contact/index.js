import React, {useState} from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../style/css/style.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);


    const sendMessage = async (event) => {
        event.preventDefault();
        setLoading(true);
        let response = await fetch(process.env.NODE_ENV === 'development'? 
        `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/sendmail/sendmessage` : 
        `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/sendmail/sendmessage`,{method: 'POST', body: JSON.stringify({
            message: formData.message,
            subject: formData.subject,
            name: formData.subject,
            email: formData.email,
        }), headers:{'Content-Type': 'application/json'}});
        let data = await response.json();

        if(data.info) {
            setLoading(false);  
                toast('Success! Message Sent', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    setFormData({
                        name: "",
                        email: "",
                        subject: "",
                        message: ""
                    });
        } else {
            toast.error('Error! Message Not Sent', {
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

    const handleChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value});
    }
    return (
        <>
        <ToastContainer />
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
                     <button type="submit" className="btn__send">{loading? 'Loading...': 'Send Message'}</button>
                 </form>
             </div>
         </div>
        <Footer />
        </>
    )
}

export default Contact;