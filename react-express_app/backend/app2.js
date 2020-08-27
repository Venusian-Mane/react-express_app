const express = require("express"); // imported the express mokdule to use
const file = require("fs"); // imported file handler for manipulatinng files
const app = express(); // initialized my app here
const dataFile = require("./web-project.json"); // and made a variable for the json file to mainpulate and add more objects

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// below, the code if made to return objects inside the web-project file
app.get("/item", function (req, res) {
  console.log("Getting app data");
  file.readFile("web-project.json", (err, data) => {
    if (err)
      res.json({
        message: "This file does not exist. Please try something else",
      });
    else res.json({ message: `${data}` });
  });
});

// and below is the code that will allow the user to add obejects into the web-project array in the json file, seen as "new item"
app.put("/item", (req, res) => {
  console.log("Putting new app data");
  console.log(req.body.item);
  var reqData = req.body.item;
  var projectList = dataFile.web_project;
  projectList.push(req.body.item);
  const newDataFile = JSON.stringify(dataFile);
  file.writeFile("web-project.json", newDataFile, (err) => {
    if (err) throw err;
    res.send("File updated!");
  });
});

app.post("/item", (req, res) => {
  console.log("Posting data");
  var response = req.body.item;
  var projectList = dataFile.web_project;
  for (i = 0; i < projectList.length; i++) {
    if (projectList[i].id == response) {
      projectList.splice(i, 1);
    }
  }
  const newDataFile = JSON.stringify(dataFile);
  file.writeFile("web-project.json", newDataFile, (err) => {
    if (err) throw err;
    res.send("Item deleted");
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  // port 8080 will be litening for any requests
  console.log(`Server is listening on port ${PORT}`);
});
