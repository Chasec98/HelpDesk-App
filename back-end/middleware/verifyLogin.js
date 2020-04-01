module.exports = function(req, res, next) {
    if(req.session.username == null && req.path !== '/api/session/login'){
        res.status(403).send('please login')
    }
    else{
        next()
    }
}