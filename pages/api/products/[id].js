// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebase from '../firebase/firebase';

export default async (req, res) => {
  const { query: { id } } = req;

   if(req.method !== 'GET') {
     res.json({message: 'Request Method Is Invalid'});
   }
  await firebase.collection('products').
   where('id', '==',`${id}`)
   .limit(15)
   .get()
   .then((snapshots) => {
     let product = {};
     snapshots.docs.map((value) => {
       product = {...value.data()};
     });
     res.json(product);
   }).catch((err) => {
     res.json({message: err});
   });
 
  
}
