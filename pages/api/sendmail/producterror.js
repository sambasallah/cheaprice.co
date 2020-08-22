const sgMail = require('@sendgrid/mail');

export default (req, res) => {
    if(req.method === 'POST') {
        sgMail.setApiKey('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');
        const msg = {
        to: 'cheaprice.io@gmail.com',
        from: {name: 'Crawl Error - Cheaprice.co', email: 'crawl@cheaprice.co'},
        subject: `Cheaprice.co - Crawl Unsuccessful!`,
        html:'Coundn"t not get products from firebase database'
        };
        
        try {
            sgMail.send(msg);
            res.json({message: 'Email Sent'});
        } catch(err) {
            res.json({message: 'Error sending email'});
        }
    }
    res.json({message: 'Request Method Not Allowed'});
}