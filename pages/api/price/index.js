import firebase from '../firebase/firebase';

export default async (req, res) => {
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
    if(req.method === 'POST') {
        const { previousData , scraped } = req.body;
        const user = null;
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
            if(Number(previousData.priceDropAmount) <= Number(scraped.price)) {
                if(user !== null) {
                     // send price drop alert
                    axios.post('https://cheaprice.co/api/sendmail',{message: 'Price Dropped!!!', 
                    email: user.email, image: previousData.image? previousData.image: previousData.fullImg.replace('http','https'),
                    url: previousData.url, price: scraped.price, title: limitTitle(scraped.title) })
                    .catch((err) => {
                        console.log('Error....');
                    });
                }
                if(user !== null) {
                    if(user.phoneNumber !== null) {
                        // send text message
                        axios.post('https://cheaprice.co/api/sendsms',{message: 'Price Dropped!!!',phoneNumber: user.phoneNumber,
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
                    })
                }).catch((err) => {
                    console.log(err);
                });
            } else {
            if(user !== null) {
                // send price drop alert
                axios.post('https://cheaprice.co/api/sendmail',{message: 'Price Reduced!!!', 
                email: user.email, image: previousData.image? previousData.image: previousData.fullImg,
                url: previousData.url, price: scraped.price, title: limitTitle(scraped.title) })
                .catch((err) => {
                    console.log('Error....');
                });
            }
            if(user !== null) {
                if(user.phoneNumber !== null) {
                    // send text message
                    axios.post('https://cheaprice.co/api/sendsms',{message: 'Price Reduced!!!',phoneNumber: user.phoneNumber,
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
                await firestore.collection('prices').
                add({
                    id: previousData.id,
                    price: previousData.price,
                    createdAt: new Date()
                }).then((resp) => {
                    console.log('Done...');
                }).catch((err) => {
                    console.log('err');
                })
            }).catch((err) => {
                console.log('Error Inserting Data to database');
            });
            }
        } else {
            await firebase.collection('products')
                .where('id', '==',`${previousData.id}`)
                .get()
                .then(async (snap) => {
                    snap.forEach((doc) => {
                        doc.ref.update({
                            updatedAt: new Date()
                        })
                    });
                }).catch((err) => {
                    console.log(err);
                });
        } 
    }
    res.json({message: 'Request Method Not Allowed'});
}