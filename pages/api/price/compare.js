
import firebase from '../firebase/firebase';
const axios = require('axios').default;

export default async (req, res) => {
        const { previousData , scraped } = req.body;
        
        if(scraped === null) {
            // crawl again
            if(previousData.store == 'Amazon') {
                console.log('Retry Amazon')
                await axios.post('https://mp001iwsca.execute-api.eu-west-1.amazonaws.com/dev/amazon/add',{url: previousData.url},
                {headers: {'Content-Type': 'application/json'}}).
                then((resp) => {
                    scraped = resp.data;
                    console.log(scraped);
                }).catch((err) => {
                    console.log(err);
                })
            } else if(previousData.store === 'Walmart') {
                console.log('Retry Walmart');
                await axios.post('https://mp001iwsca.execute-api.eu-west-1.amazonaws.com/dev/walmart/add',{url: previousData.url},
                {headers: {'Content-Type': 'application/json'}}).
                then((resp) => {
                    scraped = resp.data;
                    console.log(scraped);
                }).catch((err) => {
                    console.log(err);
                });
            } else if(previousData.store === 'eBay') {
                console.log('Retry eBay');
                await axios.post('https://mp001iwsca.execute-api.eu-west-1.amazonaws.com/dev/ebay/add',{url: previousData.url},
                {headers: {'Content-Type': 'application/json'}}).
                then((resp) => {
                    scraped = resp.data;
                    console.log(scraped)
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                console.log('Unsupported store');
            }
        }
        
        const limitTitle = (title) => {
            let newTitle = "";
            if(title.length < 18) {
                return title;
            }
            for(let i = 0; i < 40; i++) {
                newTitle += title.charAt(i);
            }
            return newTitle;
        }
        let user = null;
        await firebase.collection('users')
        .where('id', '==', `${previousData.id}`)
        .get()
        .then((snapshots) => {
            snapshots.docs.map((value) => {
              user = {...value.data()};
            });
        }).catch((err) => {
            console.log(err);
        });
        if(Number(previousData.price) > Number(scraped.price)) {
            if(Number(scraped.price) <= Number(previousData.priceDropAmount)  ) {
                if(user !== null) {
                     // send price drop alert
                    axios.post(process.env.NODE_ENV === 'development'? 
                    `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/sendmail` : 
                    `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/sendmail`,{message: 'Price Dropped!!!', 
                    email: user.email, image: previousData.image? previousData.image: previousData.fullImg.replace('http','https'),
                    url: previousData.url, price: scraped.price, title: limitTitle(scraped.title) })
                    .catch((err) => {
                        console.log('Error....');
                    });
                }
                if(user !== null) {
                    if(user.phoneNumber !== null) {
                        // send text message
                        axios.post(process.env.NODE_ENV === 'development'? 
                        `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/sendsms` : 
                        `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/sendsms`,{message: 'Price Dropped!!!',phoneNumber: user.phoneNumber,
                        url: previousData.url, price: scraped.price, title: limitTitle(scraped.title)})
                        .catch((err) => {
                            console.log('Error....');
                        });
                    }
                }
                await firebase.collection('products')
                .where('id', '==',`${previousData.id}`)
                .get()
                .then(async (snap) => {
                    snap.forEach((doc) => {
                        doc.ref.update({
                            price: scraped.price,
                            previousPrice: previousData.price,
                            updatedAt: new Date()
                        });
                        await firebase.collection('users')
                        .where('id','==',previousData.id)
                        .get()
                        .then((snap) => {
                            snap.forEach((doc) => {
                                doc.ref.delete();
                            });
                        }).catch((err) => {
                            console.log(err);
                        });
                    });
                    await firebase.collection('prices').
                    add({
                        id: previousData.id,
                        price: previousData.price,
                        createdAt: new Date()
                    }).then((resp) => {
                        console.log('Done...');
                    }).catch((err) => {
                        console.log('err');
                    });
                }).catch((err) => {
                    console.log(err);
                });
                console.log({info: 'Price Dropped!!! Notification Sent'});
            } else {
            if(user !== null) {
                // send price drop alert
                await axios.post(process.env.NODE_ENV === 'development'? 
                `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/sendmail` : 
                `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/sendmail`,{message: 'Price Reduced!!!', 
                email: user.email, image: previousData.image? previousData.image: previousData.fullImg,
                url: previousData.url, price: scraped.price, title: limitTitle(scraped.title) })
                .then((resp) => {
                    console.log('Sent...');
                })
                .catch((err) => {
                    console.log('Error....');
                });
            }
            if(user !== null) {
                if(user.phoneNumber !== null) {
                    // send text message
                    axios.post(process.env.NODE_ENV === 'development'? 
                    `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/sendsms` : 
                    `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/sendsms`,{message: 'Price Reduced!!!',phoneNumber: user.phoneNumber,
                        url: previousData.url, price: scraped.price, title: limitTitle(scraped.title)})
                        .catch((err) => {
                            console.log('Error....');
                        });
                }
            }

            await firebase.collection('products')
            .where('id', '==',`${previousData.id}`)
            .get()
            .then(async (snap) => {
                snap.forEach((doc) => {
                    doc.ref.update({
                        price: scraped.price,
                        previousPrice: previousData.price,
                        updatedAt: new Date()
                    })
                });
                await firebase.collection('prices').
                    add({
                        id: previousData.id,
                        price: previousData.price,
                        createdAt: new Date()
                    }).then((resp) => {
                        console.log('Done...');
                    }).catch((err) => {
                        console.log('err');
                    });
            }).catch((err) => {
                console.log('Error Inserting Data to database');
            });
            console.log({message: 'Notification Sent'});
            }
        } else {
            await firebase.collection('products')
            .where('id','==',previousData.id)
            .get()
            .then((snap) => {
                snap.forEach((doc) => {
                doc.ref.update({
                    updatedAt: new Date()
                });
                });
            }).catch((err) => {
                res.json({err: err});
            });
           console.log('updated')
      } 
      res.json({message: 'Request Method Not Allowed'});
}