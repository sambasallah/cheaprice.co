const sgMail = require('@sendgrid/mail');

export default (req, res) => {
    if(req.method === 'POST') {
        const { email } = req.body;
        sgMail.setApiKey(NEXT_PUBLIC_SENDGRID_API);
        const msg = {
        to: email,
        from: {name: 'Cheaprice.co', email: 'tracking@cheaprice.co'},
        subject: `Cheaprice.co - Tracking Successful!`,
        html:'Your tracking request was successful, you will be notified when the product price drops!. Thank you.',
        };
        sgMail.send(msg);
        
    }
    res.json({message: 'Request Method Not Allowed'});
}