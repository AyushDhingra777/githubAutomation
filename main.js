const cheerio = require("cheerio")
const request = require("request")
const repoLink = require("./repos.js")
const url = "https://github.com/topics"
request(url, function cb(err, res, html) {
    if (err) {
        console.log(err)
    }
    else {
        extractTopics(html)
    }
})
function extractTopics(html) {
    let $ = cheerio.load(html)
    let topics = $(".no-underline.d-flex.flex-column.flex-justify-center")   //will give the boxes of 3 topics
    //to get links of topics

    for (let i = 0; i < topics.length; i++) {
        let link = $(topics[i]).attr("href")    //will give us half link(eg- topics/nodejs)=>this contains topic,need to add github.com
        // console.log(link)
        let topic = link.split("/").pop()   //removes and returns last element of array (eg- topics/nodejs)=>nodejs
        // console.log(topic)
        let fullLink = "https://github.com" + link
        repoLink.getReposLink(fullLink, topic)
    }
}


