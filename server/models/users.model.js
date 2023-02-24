const sql = require("./db.model.js");

// constructor
const Users = function(user) {
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.email = user.email;
  this.password = user.password;
};

Users.create = (user, result) => {
  console.log(user)
    sql.query("INSERT INTO users SET first_name = ?, last_name = ?, email = ?, password = ?, created_at = NOW(), updated_at = NOW()",
    [user.first_name, user.last_name, user.email, user.password], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...user });
      result(null, { id: res.insertId, ...user });
    });
  };

// Users.create = (newUser, result) => {
//   sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("created user: ", { id: res.insertId, ...newUser });
//     result(null, { id: res.insertId, ...newUser });
//   });
// };

Users.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };

Users.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

Users.getAll = (email, result) => {
  let query = "SELECT * FROM users";

  if (email) {
    query += ` WHERE email LIKE '%${email}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

Users.getSome = (email, result) => {
  let query = "SELECT * FROM users";

  if (email) {
    query += ` WHERE email LIKE '%${email}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

// Users.getAllPublished = result => {
//   sql.query("SELECT * FROM users WHERE published=true", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("users: ", res);
//     result(null, res);
//   });
// };

Users.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET title = ?, description = ?, published = ? WHERE id = ?",
    [user.title, user.description, user.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

Users.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

Users.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = Users;