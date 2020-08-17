import firebase from '../firebase/firebase';
// import { v4 as uuidv4 }  from 'uuid';
// import axios from 'axios';

export default async (req, res) => {
    if(req.method === 'GET') {
       await firebase.collection('products').limit(4)
       .get()
       .then((snaps) => {
          let products = {products: []};
          snaps.docs.map((doc) => {
            products.products.push(doc.data());
          })
          return res.json(products);
       }).catch((err) => {
         return res.json({message: 'Error getting data'});
       })
    }
    // const product = {
    //   id: req.body.id,
    //   title: req.body.title,
    //   description: req.body.description,
    //   price: req.body.price,
    //   url: req.body.url,
    //   image: req.body.image
    // };
    // await firebase.collection('products').
    // doc(uuidv4()).
    // set(product).
    //  then(() => {
    //      res.json({statusCode: 201,success: 'Data inserted'})
    //  }).catch((err) => {
    //      res.json({error: err});
    //  });
}