// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebase from '../firebase/firebase';

export default async (req, res) => {
  const { query: { value } } = req;
   if(req.method !== 'GET') {
     res.json({message: 'Request Method Is Invalid'});
   }
  await firebase.collection('products').
   where('title', '==',`${value}`)
   .get()
   .then((snapshots) => {
     let products = {products: []};
     snapshots.docs.map((value) => {
       products.products.push(value.data());
     });
     res.json(products);
   }).catch((err) => {
     res.json({message: err});
   });
}
