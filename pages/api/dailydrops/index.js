import firebase from '../firebase/firebase';

export default async (req, res) => {
    if(req.method === 'GET') {
        let results = [];
        await firebase.collection('products').limit(30)
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
                if(Number(doc.data().previousPrice)) {
                    results.push(doc.data());
                }
            });
        }).catch((err) => {
            res.json({err: err});
        });
       res.json({dailydrops: results});
    }
    res.json({message: 'Request Method Not Allowed'});
}