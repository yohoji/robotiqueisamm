const express = require("express");
const cors = require("cors");
const fs = require('fs');
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
    })
)

var dataObj = {
    table: []
}

app.post("/newApplication", (req, res) => {
    dataObj.table.push(req.body)
    let parsedData = JSON.stringify(dataObj);
    fs.writeFile(__dirname + "\NewApplications.json", parsedData, function (err) {
        if (err) {
            res.status(500)
        } else {
            res.status(200)
        }
    })
})

app.listen(3080, () => {
    console.log("app running on port 3080")
    const data = fs.readFileSync(__dirname + "\NewApplications.json", { encoding: 'utf8' })
    const oldData = JSON.parse(data)
    dataObj = oldData
    console.log(dataObj)
})