// ensure the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        return next;
    res.redirect('/customer/login')
}

module.export = {
    isloggedIn
}