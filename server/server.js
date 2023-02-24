const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(express.json(), express.urlencoded({extended: true}));

app.use(cors({
    origin: "http://localhost:3000"
}))

// require("./client/routes/login.routes")(app);

app.get("/", (req, res) => {
  res.json({ message: "This is a succesful test." });
});
require("./routes/users.routes")(app);

//require("./config/mongoose.config")
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );