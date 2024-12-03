const Passport = require("passport");
const router = require("express").Router();

router.use("/", require("./swagger"));
router.use('/products', require('./products'));
router.use('/transactions', require('./transactions'));

router.get("/login", Passport.authenticate("github"), (req, res) => {
    res.redirect("/");
});

router.get("/logout", function(req, res, next) {
    req.logout(function(err) {
        if (err) return next(err);
        res.redirect("/");
    });
});

module.exports = router;
