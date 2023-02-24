const Users = require("../models/users.model.js");

// Create and Save a new users
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a user
    const user = new Users({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    });
  
    // Save users in the database
    Users.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the users."
        });
      else res.send(data);
    });
  };

// Retrieve all users from the database (with condition).
exports.findAll = (req, res) => {
  
    Users.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving userss."
        });
      else res.send(data);
    });
  };
  
exports.findSome = (req, res) => {
  Users.getSome(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found users with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving users with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};
// email = req.body.email;
//   Users.getSome(email, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving userss."
//       });
//     else res.send(data);
//   });
// };

// Find a single users with by email
exports.findOne = (req, res) => {
  console.log(req.params.email);
    Users.findByEmail(req.params.email, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Couldn't find the user with email: ${req.params.email}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving users with email " + req.params.email
          });
        }
      } else res.send(data);
    });
  };

// find all published userss
exports.findAllPublished = (req, res) => {
  
};

// Update a users identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    users.updateById(
      req.params.id,
      new users(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found users with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating users with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a users with the specified id in the request
exports.delete = (req, res) => {
    users.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found users with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete users with id " + req.params.id
          });
        }
      } else res.send({ message: `users was deleted successfully!` });
    });
  };

// Delete all userss from the database.
exports.deleteAll = (req, res) => {
    Users.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all userss."
        });
      else res.send({ message: `All userss were deleted successfully!` });
    });
  };