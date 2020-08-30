import firebase from '../firebase/firebase';

export default async (req, res) => {
    if(req.method === 'GET') {
        let drops = [];
        let products = [];
        await firebase.collection('prices')
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
               if(new Date(doc.data().createdAt._seconds * 1000).getDate() === new Date().getDate()) {
                   drops.push(doc.data().id);
               }
            });
        }).catch((err) => {
            res.json({err});
        });

        // filter to remove duplicate id's
        let dailydeals = [...new Set(drops.slice(0,10))];
        await firebase.collection('products')
        .where('id','in',dailydeals)
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
                // return resolve(doc.data());
                products.push(doc.data());
            });
        }).catch((err) => {
            res.json(err);
        });
       res.json({dailydrops: products});
    }
    res.json({message: 'Request Method Not Allowed'});
}