module.exports = function(req, res, next) {
    if(req.session.username == null && req.path !== '/api/session/login'){
        res.send('please login')
    }
    else{
        next()
    }
}