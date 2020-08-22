const sgMail = require('@sendgrid/mail');

export default (req, res) => {
    if(req.method === 'POST') {
        sgMail.setApiKey(NEXT_PUBLIC_SENDGRID_API);
        const msg = {
        to: 'cheaprice.io@gmail.com',
        from: {name: 'Crawl Error - Cheaprice.co', email: 'crawl@cheaprice.co'},
        subject: `Cheaprice.co - Crawl Unsuccessful!`,
        html:'Coundn"t not get products from firebase database'
        };
        sgMail.send(msg);
    }
    res.json({message: 'Request Method Not Allowed'});
}