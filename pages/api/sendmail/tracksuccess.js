const sgMail = require('@sendgrid/mail');

export default (req, res) => {
    if(req.method === 'POST') {
        const { email } = req.body;
        sgMail.setApiKey('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');
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