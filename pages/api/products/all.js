

import firebase from '../firebase/firebase';

export default async (req, res) => {
   const { query: {page: id} } = req;
   if(req.method !== 'GET') {
     res.json({message: 'Request Method Is Invalid'});
   }
   let first = await firebase.collection("products")
   .orderBy("title")
   .limit(200);
    await first.get().then(function (documentSnapshots) {
            // Get the last visible document
           let lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
        
          let products = {products: []};
                documentSnapshots.docs.map((doc) => {
                    products.products.push(doc.data());
                })
            res.json(products);
    });

    

    // // Construct a new query starting at this document,
    // // get the next 25 cities.
    // if(id >= 2) {
    //     let next = firebase.collection("products")
    //     .orderBy("title")
    //     .startAfter(lastVisible)
    //     .limit(2);
    //     await next.get().then(function (documentSnapshots) {
    //         // Get the last visible document
    //             lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
    //             let products = {products: []};
    //               documentSnapshots.docs.map((doc) => {
    //                 products.products.push(doc.data());
    //               })
    //             return res.json(products);
            
    //     });
    // }   
}
    

  