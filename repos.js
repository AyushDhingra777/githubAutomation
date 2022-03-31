const cheerio = require("cheerio")
const request = require("request")
const getIssueshtmlObj = require("./issues")
function getReposLink(url, topic) {
    request(url, function cb(err, res, html) {
        if (err) {
            console.log(err)
        }
        else {
            extractReposLink(html, topic)
        }
    })
}

function extractReposLink(html, topic) {
    let $ = cheerio.load(html)
    let repos = $(".f3.color-fg-muted.text-normal.lh-condensed")    //This will give us all repo boxes of the current topic
    // console.log(topic)
    for (let i = 0; i < 8; i++) { //since we only want top 8 repos of the topic
        let UserAndRepoName = $(repos[i]).find("a")  //will give us Username/RepoName   =>(eg keras-team / keras )
        // console.log(UserAndRepoName)
        let halfRepoLink = $(UserAndRepoName[1]).attr("href")   //since repo name will be idx 1(keras)
        // console.log(halfRepoLink)
        let fullRepoLink = "https://github.com" + halfRepoLink
        let repoName = halfRepoLink.split("/").pop()    //repo name will be at end of link
        //To get issues link
        let issueLink = fullRepoLink + "/issues"
        // console.log(issueLink)
        getIssueshtmlObj.getIssueshtml(issueLink, topic, repoName)  //to get issues of current repo
    }
    console.log(" ````````````````````````` ")



}
module.exports = {
    getReposLink: getReposLink
} 