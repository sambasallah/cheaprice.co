const sgMail = require('@sendgrid/mail');
export default async (req, res) => {
    if(req.method === 'POST') {
        const { email, message, title, price, image, url } = req.body;
        const emailHTML = `
        <div style='background-color: #f5f5f5; width: 700px; height: 580px; margin: 10px auto; text-align: center;'>
        <h2 style='font-size: 25px; font-weight: 22px; text-align: center; padding-top: 10px; font-family:
        "Courier New", Courier, monospace; padding-top: 20px;'>${message} - Cheaprice.co</h2>
        <div style='width: 50%; margin: 20px auto; height: 350px;'>
            <img src='${image}' style='width: 100%; height: 100%;' />
        </div>
        <span style='font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif; font-weight: 500px;
            font-size: 22px;'>
            ${title}</span> <br>
        <span style='font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif; font-size: 25px;'>
            ${price}</span> <br> <br>
        <a href="${url}" style='padding: 10px 30px; background-color:black; color: #fff; font-family: 
        "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif; text-decoration: none;'>Buy Now</a>
    </div>
    `;
        sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API);
        const msg = {
        to: emailHTML,
        from: {name: 'Cheaprice.co', 'email': 'pricedropalert@cheaprice.co'},
        subject: `Cheaprice.co - ${message}!`,
        html:email,
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