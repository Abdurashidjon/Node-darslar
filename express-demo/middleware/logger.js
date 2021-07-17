function log(req, res, next) {
    console.log("Logging iwladi: ---- > ");
    next()
}
module.exports = log;