
const axios = require('axios').default;
const urlUtil = require('url');
import firebase from '../firebase/firebase';
import { v4 as uuidv4 }  from 'uuid';

export default async (req,res) => {
    if(req.method === 'POST') {
        const stores = ['amazon.com','www.amazon.com', 'ebay.com', 'www.ebay.com',
        'walmart.com','www.walmart.com']
        const { url, id } = req.body;
        const host = urlUtil.parse(url).host;
        if(stores.includes(host) && host === 'amazon.com' || 'www.amazon.com') {
            // send crawl request
            await axios.post('https://ibcweim5j3.execute-api.eu-west-1.amazonaws.com/dev/amazon/add',{url: url},
            {headers: {'Content-Type': 'application/json'}}).
            then(async (response) => {
                const data = Object.assign({}, response.data, {id: id});  
                await firebase.collection('products').
                doc(uuidv4()).
                set(data).
                 then(() => {
                    res.json({statusCode: 201, message: 'Data Inserted'});
                 }).catch((err) => {;
                     res.json({statusCode: 400, message: 'Data Not Inserted'});
                 });
                }).catch((err) => {
                    // retry
                    res.json({err: err});
                })
                await firebase.database().goOffline();
        
        } else {
            return res.json({message: 'Error occured'});
        }
        
    }
    return res.json({message: 'Request Method Not Allowed'});
}