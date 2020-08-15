// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import firebase from '../firebase/firebase';

export default (req, res) => {
  const { query: { trackid } } = req;

  res.json(`${trackid}`);
  
}
