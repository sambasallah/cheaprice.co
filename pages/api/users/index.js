import firebase from '../firebase/firebase';
import { v4 as uuidv4 }  from 'uuid';
const axios = require('axios').default;

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
            axios.post(`https://cheaprice-co.vercel.app/api/crawl/fetch`, {id: user.id, url: user.url},
            {headers: {'Content-Type': 'application/json'}})
            .catch((err) => {
              console.log('Error Occured.....');
            });
            res.json({statusCode: 201,message: 'Data inserted'})
             
        }).catch((err) => {
            res.json({statusCode: 400, error: err});
        });
    await firebase.database().goOffline();
}