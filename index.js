const algoliasearch = require('algoliasearch');
const _ = require('lodash');
const client = algoliasearch('VL9V6CVL87', '1706d6a2d8010a0021303ce7a9a766fe');
const index = client.initIndex('cheaprice.co');

index.saveObjects([{
  test: 'testing'
}], {
    autoGenerateObjectIDIfNotExist: true
  }).then(({ objectIDs }) => {
    console.log(objectIDs);
  }).catch((err) => {
      console.log(err)
});
