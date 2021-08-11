const userService = require('../services/user.service')


module.exports = {
    authenticate,
    getAllUsers,
    register,
    getGoals,
    setGoals,
    find
};


function authenticate(req, res, next) {
    console.log("Authenticate():", req.body);
       userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAllUsers(req, res, next) {
    userService.getAllUsers()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function register(req, res, next) {

   userService.addUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}




// get goals (calorie goal and minute goal) for the specific username in 'req.params...' and send the JSON back the to the user that requested the information. Hint: write a middleware function and add it to the exports.
function getGoals(req, res, next) {
    userService.getGoals(req.params.username).then(user => res.json(user)).catch(err => next(err));
}

// set goals (calorie goal and minute goal) for a user. Hint: write a middleware function and add it to the module exports.
function setGoals(req, res, next) {
    userService.setGoals(req.body, req.user.sub).then(user => res.json(user)).catch(err => next(err));
}

function find(req, res, next) {
    userService.find(req.params.userId).then(user => res.json(user)).catch(err => next(err));
}
