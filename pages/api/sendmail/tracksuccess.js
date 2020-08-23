const sgMail = require('@sendgrid/mail');

export default async (req, res) => {
    if(req.method === 'POST') {
        const { email } = req.body;
        sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API);
        const msg = {
        to: email,
        from: {name: 'Cheaprice.co', email: 'tracking@cheaprice.co'},
        subject: `Cheaprice.co - Tracking Successful!`,
        html:'Your tracking request was successful, you will be notified when the product price drops!. Thank you.',
        };
        await sgMail
        .send(msg)
        .then(() => {
            res.json({info: 'Message Sent'})
        }, error => {
            res.json({info: error})
            if (error.response) {
            console.error(error.response.body)
            }
        });
        
    }
    res.json({message: 'Request Method Not Allowed'});
}