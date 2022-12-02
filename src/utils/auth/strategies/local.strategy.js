const { use } = require("passport");
const boom = require("@hapi/boom");
const { Strategy } = require("passport-local");
const ControlStudents = require("./../../../services/controlStudentsService");

const service = new ControlStudents();

const LocalStrategy = new Strategy( async (username, password, done) => {
    try {
        console.log("verificado en Local Strategy")
        const userID = await service.checkAccess(username, password)
        if (!userID.id) {
            throw boom.unauthorized();
        } else {
            //userID es recibido en el siguiente next como req.user
            done(null, userID);
        }
    } catch (error) {
        done(error)
    }
});

module.exports = LocalStrategy;