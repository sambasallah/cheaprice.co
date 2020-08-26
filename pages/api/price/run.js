import firebase from '../firebase/firebase';
const axios = require('axios').default;

export default async (req, res) => {
    if(req.method === 'POST') {
        let products = [];
        await firebase.collection('products')
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
                products.push(doc.data());
            });
        }).catch((err) => {
            console.log('err');
        });
        axios.post(process.env.NODE_ENV === 'development'? 
        `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/price` : 
        `${process.env.NEXT_PUBLIC_LIVE_SERVER}/api/price`,{products: products},{headers: {'Content-Type': 'application/json'}}).catch((err) => {
            console.log(err);
        }); 
        res.json({info: 'Crawling Started'});
    }
    res.json({message: 'Request Method Not Allowed'});
}