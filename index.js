import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "b778a28b-5b11-46b4-9b71-5c2e7f844509";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });

  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  const postSecret = req.body.secret;
  const postScore = req.body.score;

  const newPost = {
    secret: postSecret,
    score: postScore,
  }

  console.log(config);

  try {
    const result = await axios.post(API_URL + "/secrets/", newPost, config);
    res.render("index.ejs", {
      content: JSON.stringify(newPost)
    });

  } catch (error) {
    console.log(JSON.stringify(error.response.data));
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  const postId = req.body.id;
  const postSecret = req.body.secret;
  const postScore = req.body.score;

  const newPut = {
    id: postId,
    secret: postSecret,
    score: postScore,
  }
  try {
    const result = await axios.put(API_URL + "/secrets/" + postId, newPut, config);
    res.render("index.ejs", {
      content: JSON.stringify(newPut)
    });

  } catch (error) {
    console.log(JSON.stringify(error.response.data));
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {

  const postId = req.body.id;
  const postSecret = req.body.secret;
  const postScore = req.body.score;

  const newPatch = {
    id: postId,
    secret: postSecret,
    score: postScore,
  }
  try {
    const result = await axios.patch(API_URL + "/secrets/" + postId, newPatch, config);
    res.render("index.ejs", {
      content: JSON.stringify(newPatch)
    });

  } catch (error) {
    console.log(JSON.stringify(error.response.data));
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/delete-secret", async (req, res) => {
  const postId = req.body.id;

  try {
    const result = await axios.delete(API_URL + "/secrets/" + postId, config);
    res.render("index.ejs", {
      content: JSON.stringify(postId) + " deleted"
    })

  } catch (error) {
    console.log(JSON.stringify(error.response.data));
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
