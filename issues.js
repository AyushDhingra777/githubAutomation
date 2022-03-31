const cheerio = require("cheerio")
const request = require("request")
const fs = require("fs")
const path = require("path")
// const url = "https://github.com/MvvmCross/MvvmCross/issues"
function getIssueshtml(url, topic, repoName) {
    request(url, function cb(err, res, html) {
        if (err) {
            console.log(err)
        }
        else {
            getIssues(html, topic, repoName)
            // console.log(html)
        }
    })
}

function getIssues(html, topic, repoName) {
    let $ = cheerio.load(html)
    let issuesElem = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title")   //this will give all issues
    let arr = []    //empty array so we can append issues of current repo
    for (let i = 0; i < issuesElem.length; i++) {
        let half = $(issuesElem[i]).attr("href")
        let full = "https://github.com" + half //to get that particular issue
        arr.push(full)
        // console.log(full)
    }
    // console.log(topic, "     ", arr)
    let folderPath = path.join(__dirname, topic)
    dirCreater(folderPath);//to create topic folder
    let filePath = path.join(folderPath, repoName + ".json")    //To create repo folder,we need it in json format
    let text = JSON.stringify(arr)  //since writeFileSync cant add array,we need to convert our array to string
    fs.writeFileSync(filePath, text)
}
function dirCreater(folderPath) {
    if (fs.existsSync(folderPath) == false) {
        fs.mkdirSync(folderPath)
    }

}

module.exports = {
    getIssueshtml: getIssueshtml
}