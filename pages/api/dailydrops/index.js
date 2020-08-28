import firebase from '../firebase/firebase';

export default async (req, res) => {
    if(req.method === 'GET') {
        let drops = [];
        let products = [];
        await firebase.collection('prices').limit(10)
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
                drops.push(doc.data());
            });
        }).catch((err) => {
            res.json({err});
        });

        drops.map(async (value) => {
            products.push(new Promise(async (resolve, reject) => {
                
                    await firebase.collection('products')
                    .where('id', '==', value.id)
                    .get()
                    .then((snap) => {
                        snap.forEach((doc) => {
                            resolve(doc.data());
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                
            }));
       });
       let result = await Promise.all(products);
       res.json({dailydrops: result});
    }
    res.json({message: 'Request Method Not Allowed'});
}