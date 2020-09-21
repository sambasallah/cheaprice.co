

import firebase from '../firebase/firebase';

export default async (req, res) => {
   let first = await firebase.collection("products")
   .orderBy("title")
   .limit(28);
    await first.get().then(function (documentSnapshots) {
            // Get the last visible document
           let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
        
          let products = {products: [], lastVisible: lastVisible};
                documentSnapshots.docs.map((doc) => {
                    products.products.push(doc.data());
                })
            res.json(products); 
      });
}
    

  