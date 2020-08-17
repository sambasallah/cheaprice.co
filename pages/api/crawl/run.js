export default (req, res) => {
    if(req.method === 'POST') {
        return res.json({message: 'Endpoint is live'});
    }
    return res.json({message: 'Request method is not allowed'});
}