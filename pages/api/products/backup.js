
import firebase from '../firebase/firebase';
const fs = require('fs');
export default async (req, res) => {
    await firebase.collection('products')
    .get()
    .then((snap) => {
        let products = [];
        snap.forEach((doc) => {
            products.push(doc.data());
        });
        fs.writeFile('data.json',JSON.stringify(products), (err,file) => {
            if(err) res.json({err: 'Error creating'});
            res.json({info: 'file created'});
        })
        // res.json({products});
        
    }).catch((err) => {
        res.json({err: 'error creating file'});
    })
}