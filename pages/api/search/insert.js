import firebase from '../firebase/firebase';
const _ = require('lodash');
const algoliasearch = require('algoliasearch');
const client = algoliasearch('VL9V6CVL87', '1706d6a2d8010a0021303ce7a9a766fe');
const index = client.initIndex('cheaprice.co');

export default async (req, res) => {
    await firebase.collection('products')
    .get()
    .then((snap) => {
        let products = [];
        snap.forEach((doc) => {
            products.push(doc.data());
        });
        const chuncks = _.chunk(products, 100);
        chuncks.forEach(chunk => {
            index.saveObjects(chunk, {
                autoGenerateObjectIDIfNotExist: true
              }).then(({ objectIDs }) => {
                console.log(objectIDs);
              }).catch((err) => {
                  console.log(err)
            });
        });
        res.json({success: 'Index Populated'});
    }).catch((err) => {
        res.json({err: err});
    });
}