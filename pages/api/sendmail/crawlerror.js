const sgMail = require('@sendgrid/mail');

export default async (req, res) => {
    if(req.method === 'POST') {
        sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API);
        const msg = {
        to: 'cheaprice.io@gmail.com',
        from: {name: 'Crawl Error - Cheaprice.co', email: 'crawl@cheaprice.co'},
        subject: `Cheaprice.co - Crawl Unsuccessful!`,
        html:'Your periodical crawl request was not successful',
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