const sgMail = require('@sendgrid/mail');
export default async (req, res) => {
    const { name, email, subject, message } = req.body;
    const emailHTML = `
        <h3>Name: ${name}</h3>
        <h3>Email: ${email}</h3>
        <h3>Subject: ${subject}</h3>
        <h3>Message: ${message}</h3>
    `;
    if(req.method === 'POST') {
        sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API);
        const msg = {
        to: 'cheaprice.io@gmail.com',
        from: {name: name, email: 'messages@cheaprice.co'},
        subject: subject,
        html: emailHTML,
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