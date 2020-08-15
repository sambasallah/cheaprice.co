import firebase from '../firebase/firebase';
import { v4 as uuidv4 }  from 'uuid';

export default async (req, res) => {
    if(req.method !== 'POST') {
        return res.json({error: 'Request Method Not Allow'});
    }
    const user = {
        id: uuidv4(),
        email: req.body.email,
        phoneNumber: req.body.phone_number || null,
        priceDropAmount: req.body.price_drop_amount,
        url: req.body.url,
        createdAt: new Date()
    };

    await firebase.collection('users').
       doc(uuidv4()).
       set(user).
        then(() => {
            console.log(user.id);
            res.json({statusCode: 201,message: 'Data inserted'})
            // Make a request to crawl 
         

        }).catch((err) => {
            res.json({statusCode: 400, error: err});
        });
    await firebase.database().goOffline();
}