
const axios = require('axios').default;
const urlUtil = require('url');
import firebase from '../firebase/firebase';

export default async (req,res) => {
    if(req.method === 'POST') {
        const stores = ['amazon.com','www.amazon.com', 'ebay.com', 'www.ebay.com',
        'walmart.com','www.walmart.com']
        const { url, id, email } = req.body;
        const host = urlUtil.parse(url).host;
        if(stores.includes(host) && host === 'amazon.com' || host === 'www.amazon.com') {
            // send crawl request
            await axios.post('https://mp001iwsca.execute-api.eu-west-1.amazonaws.com/dev/amazon/add',{url: url},
            {headers: {'Content-Type': 'application/json'}}).
            then(async (response) => {
                const data = Object.assign({}, response.data, {id: id, createdAt: new Date(), updatedAt: new Date()});  
                await firebase.collection('products')
                .add(data).
                 then(async (response) => {
                    await axios.post(`https://cheaprice.co/api/sendmail/tracksuccess`, {email: email},{headers: {'Content-Type': 'application/json'}})
                    .then((resp) => {
                        console.log('Email Sent');
                    }).catch((err) => {
                        console.log(err);
                    });
                    res.json({statusCode: 201, message: 'Data Inserted'});
                 }).catch((err) => {;
                     res.json({statusCode: 400, message: 'Data Not Inserted'});
                 });
                }).catch(async (err) => {
                    await axios.post(`https://cheaprice.co/api/sendmail/trackerror`, {email: email},{headers: {'Content-Type': 'application/json'}})
                    .then(async (resp) => {
                        console.log('Email Sent');
                        await firebase.collection('users').
                        where('id', '==', `${id}`).get().
                        then((resp) => {
                            resp.forEach((doc) => {
                                doc.ref.delete();
                            });
                            console.log({message: 'Document Deleted'});
                        }).catch((err) => {
                            console.log({message: 'Cannot Delete User'});
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                    res.json({err: err});
                })
                await firebase.database().goOffline();
        
        } else if(stores.includes(host) && host === 'walmart.com' || host === 'www.walmart.com') {
            // send crawl request
            await axios.post('https://mp001iwsca.execute-api.eu-west-1.amazonaws.com/dev/walmart/add',{url: url},
            {headers: {'Content-Type': 'application/json'}}).
            then(async (response) => {
                const data = Object.assign({}, response.data, {id: id, createdAt: new Date(), updatedAt: new Date()});  
                await firebase.collection('products')
                .add(data).
                 then(async () => {
                    await axios.post(`https://cheaprice.co/api/sendmail/tracksuccess`, {email: email},{headers: {'Content-Type': 'application/json'}})
                    .then((resp) => {
                        console.log('Email Sent');
                    }).catch((err) => {
                        console.log(err);
                    });
                    res.json({statusCode: 201, message: 'Data Inserted'});
                 }).catch((err) => {;
                     res.json({statusCode: 400, message: 'Data Not Inserted'});
                 });
                }).catch(async (err) => {
                    await axios.post(`https://cheaprice.co/api/sendmail/trackerror`, {email: email},{headers: {'Content-Type': 'application/json'}})
                    .then(async (resp) => {
                        console.log('Email Sent');
                        await firebase.collection('users').
                        where('id', '==', `${id}`).get().
                        then((resp) => {
                            resp.forEach((doc) => {
                                doc.ref.delete();
                            });
                            console.log({message: 'Document Deleted'});
                        }).catch((err) => {
                            console.log({message: 'Cannot Delete User'});
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                    res.json({err: err});
                })
                await firebase.database().goOffline(); {
            return res.json({message: 'Error occured'});
        }
        
    } else  if(stores.includes(host) && host === 'ebay.com' || host === 'www.ebay.com') {
        // send crawl request
        await axios.post('https://mp001iwsca.execute-api.eu-west-1.amazonaws.com/dev/ebay/add',{url: url},
        {headers: {'Content-Type': 'application/json'}}).
        then(async (response) => {
            const data = Object.assign({}, response.data, {id: id, createdAt: new Date(), updatedAt: new Date()});  
            await firebase.collection('products')
            .add(data).
             then(async () => {
                await axios.post(`https://cheaprice.co/api/sendmail/tracksuccess`, {email: email},{headers: {'Content-Type': 'application/json'}})
                .then((resp) => {
                    console.log('Email Sent');
                }).catch((err) => {
                    console.log(err);
                });
                res.json({statusCode: 201, message: 'Data Inserted'});
             }).catch(async (err) => {
                await axios.post(`https://cheaprice.co/api/sendmail/trackerror`, {email: email},{headers: {'Content-Type': 'application/json'}})
                .then(async (resp) => {
                    console.log('Email Sent');
                    await firebase.collection('users').
                        where('id', '==', `${id}`).get().
                        then((resp) => {
                            resp.forEach((doc) => {
                                doc.ref.delete();
                            });
                            console.log({message: 'Document Deleted'});
                        }).catch((err) => {
                            console.log({message: 'Cannot Delete User'});
                        });
                }).catch((err) => {
                    console.log(err);
                });
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