const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const auth = require("./routes/auth.route");
const app = express();
const favorites = require("./routes/favorites.route");
const user = require("./routes/user.route");

dotenv.config();

app.use(cors({ credentials:true, origin:'http://localhost:3000'})); 

app.use(cookieParser());
app.use(express.json());

app.use('/api/user', user);
app.use('/api/favorites', favorites);
app.use("/api/auth", auth);

app.set("port", process.env.PORT || 5001);


app.listen(app.get("port"), () => {
    console.log(
      "Servidor (API) em execução... [url: http://localhost:" +
        app.get("port") +
        "]"
    );
  });