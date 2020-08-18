
const axios = require('axios').default;
const urlUtil = require('url');
import firebase from '../firebase/firebase';
const algoliasearch = require('algoliasearch');

export default async (req,res) => {
    if(req.method === 'POST') {
        const client = algoliasearch('VL9V6CVL87','1706d6a2d8010a0021303ce7a9a766fe');
        const index = client.initIndex('test_products');
        const stores = ['amazon.com','www.amazon.com', 'ebay.com', 'www.ebay.com',
        'walmart.com','www.walmart.com']
        const { url, id } = req.body;
        const host = urlUtil.parse(url).host;
        if(stores.includes(host) && host === 'amazon.com' || host === 'www.amazon.com') {
            // send crawl request
            await axios.post('https://ibcweim5j3.execute-api.eu-west-1.amazonaws.com/dev/amazon/add',{url: url},
            {headers: {'Content-Type': 'application/json'}}).
            then(async (response) => {
                const data = Object.assign({}, response.data, {id: id});  
                await firebase.collection('products')
                .add(data).
                 then(async (response) => {
                    const algoliaData = Object.assign({}, data, {objectID: data.id});
                    await index.saveObjects([algoliaData]).then(() => {
                        res.json({message: 'Data inserted'});
                    }).catch((err) => {
                        res.json({'error': err});
                    });
                    // res.json({statusCode: 201, message: 'Data Inserted'});
                 }).catch((err) => {;
                     res.json({statusCode: 400, message: 'Data Not Inserted'});
                 });
                }).catch((err) => {
                    // retry
                    res.json({err: err});
                })
                await firebase.database().goOffline();
        
        } else if(stores.includes(host) && host === 'walmart.com' || host === 'www.walmart.com') {
            // send crawl request
            await axios.post('https://ibcweim5j3.execute-api.eu-west-1.amazonaws.com/dev/walmart/add',{url: url},
            {headers: {'Content-Type': 'application/json'}}).
            then(async (response) => {
                const data = Object.assign({}, response.data, {id: id});  
                await firebase.collection('products')
                .add(data).
                 then(() => {
                    res.json({statusCode: 201, message: 'Data Inserted'});
                 }).catch((err) => {;
                     res.json({statusCode: 400, message: 'Data Not Inserted'});
                 });
                }).catch((err) => {
                    // retry
                    res.json({err: err});
                })
                await firebase.database().goOffline(); {
            return res.json({message: 'Error occured'});
        }
        
    } else  if(stores.includes(host) && host === 'ebay.com' || host === 'www.ebay.com') {
        // send crawl request
        await axios.post('https://ibcweim5j3.execute-api.eu-west-1.amazonaws.com/dev/ebay/add',{url: url},
        {headers: {'Content-Type': 'application/json'}}).
        then(async (response) => {
            const data = Object.assign({}, response.data, {id: id});  
            await firebase.collection('products')
            .add(data).
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
        res.json({message: 'Unsupported Store'});
    }
}
    return res.json({message: 'Request Method Not Allowed'});
}