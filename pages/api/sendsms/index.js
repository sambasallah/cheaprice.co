const accountSid = 'AC9f27a2f6c8e6df4ac36b6a0f14b15255';
const authToken = 'cc49ce49ee0530f437e57fe779277452';
const client = require('twilio')(accountSid, authToken);

export default (req, res) => {
    if(req.method === 'POST') {
        client.messages
        .create({
            body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
            from: '+15017122661',
            to: '+15558675310'
        })
        .then(message => console.log(message.sid));
    }
    res.json({message: 'Request Method Not Allowed'});
}