const accountSid = process.env.NEXT_PUBLIC_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export default (req, res) => {
    if(req.method === 'POST') {
        const { phoneNumber, message, price,title } = req.body;
        client.messages
        .create({
            body: `Cheaprice.co - ${ message } Check Your Email For More Info - New Price ${price} - Product - ${title}`,
            from: '+15017122661',
            to: phoneNumber,
        })
        .then(message => console.log(message.sid))
        .catch((err) => {
            console.log('Error');
        });
    }
    res.json({message: 'Request Method Not Allowed'});
}