import firebase from '../firebase/firebase';
export default async (req, res) => {
    const {query: { id }} = req;

    if(req.method === 'GET') {
        await firebase.collection('prices')
        .where('id', '==', id)
        .limit(30)
        .get()
        .then((snap) => {
            let prices = [];
            snap.forEach((doc) => {
                let temp = {price: doc.data().price, 
                    createdAt: new Date(doc.data().createdAt._seconds * 1000).toLocaleDateString()};
                prices.push(temp);
            });
            res.json({prices});
        }).catch((err) => {
            res.json({err: err});
        })
    }
    res.json({message: 'Request method is not allowed'}); 
}