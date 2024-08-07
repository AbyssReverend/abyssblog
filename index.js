import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Set up dirname variable for ability to run server on other computers
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/essays", (req, res) => {
    res.render("essays.ejs", {
        posts: posts
    });
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

var posts = [];
app.post("/submit", (req, res) => {
    res.render("index.ejs", {
        submitted: true
    });

    var post = {
        postName: req.body["name"],
        postEmail: req.body["email"],
        postTitle: req.body["title"],
        postContent: req.body["text"]
    }

    posts.push(post);
});


app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});