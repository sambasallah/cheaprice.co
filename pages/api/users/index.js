import firebase from '../firebase/firebase';
import { v4 as uuidv4 }  from 'uuid';
const axios = require('axios').default;

export default async (req, res) => {
    if(req.method !== 'POST') {
        return res.json({error: 'Request Method Not Allow'});
    }
    const user = {
        id: req.body.id? req.body.id : uuidv4(),
        email: req.body.email,
        phoneNumber: req.body.phoneNumber || null,
        priceDropAmount: req.body.priceDropAmount,
        url: req.body.url,
        createdAt: new Date()
    };

    if(!req.body.id) {
        await firebase.collection('users').
       add(user).
        then(() => {
            axios.post(process.env.NODE_ENV === 'development'? 
            `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/crawl/fetch` : 
            `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/crawl/fetch`, {id: user.id, url: user.url, email: user.email},
            {headers: {'Content-Type': 'application/json'}})
            .catch((err) => {
              console.log('Error Occured.....');
            });
            res.json({statusCode: 201,message: 'Data inserted'})
        }).catch((err) => {
            res.json({statusCode: 400, error: err});
        });;
    } else {
        await firebase.collection('users').
        add(user).
         then(() => {
             res.json({statusCode: 201,message: 'Data inserted'})
         }).catch((err) => {
             res.json({statusCode: 400, error: err});
         });;
    }
}