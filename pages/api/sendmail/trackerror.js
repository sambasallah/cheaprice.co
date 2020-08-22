const sgMail = require('@sendgrid/mail');
export default (req, res) => {
    if(req.method === 'POST') {
        const { email } = req.body;
        sgMail.setApiKey(NEXT_PUBLIC_SENDGRID_API);
        const msg = {
        to: email,
        from: {name: 'Cheaprice.co', email: 'tracking@cheaprice.co'},
        subject: `Cheaprice.co - Tracking Unsuccessful!`,
        html:'Your tracking request was not successful, please retry again this might be caused my a connection timeout or if the product you want to track has attributes select one of the attributes and try again. Thank you.',
        };
        sgMail.send(msg);
    }
    res.json({message: 'Request Method Not Allowed'});
}