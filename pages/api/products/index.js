import firebase from '../firebase/firebase';
import { v4 as uuidv4 }  from 'uuid';

export default async (req, res) => {
    if(req.method !== 'POST') {
      res.json({message: 'Request Method Not Allowed'});
    }
    const product = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      url: req.body.url,
      image: req.body.image
    };
    await firebase.collection('products').
    doc(uuidv4()).
    set(product).
     then(() => {
         res.json({statusCode: 201,success: 'Data inserted'})
     }).catch((err) => {
         res.json({error: err});
     });

}