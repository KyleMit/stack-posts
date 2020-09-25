const fetch = require("node-fetch");
const { promises: fs } = require("fs")
const yaml = require('js-yaml');


main()

async function main() {

    console.time()

    await fetchData()

    let questionText = await fs.readFile('./data/questions.json', 'utf-8')
    let questions = JSON.parse(questionText)

    await Promise.all(questions.map(async function(question) {

        let path = `./questions/${question.question_id}.md`

        let { question_id, title, score, view_count, tags } = question
        let meta = { question_id, title, score, view_count, tags }
        let frontmatter = yaml.safeDump(yaml.safeLoad(JSON.stringify(meta)))

        let post = `---
${frontmatter}---

${question.body_markdown}
`
            // can skip last await
        fs.writeFile(path, post, 'utf-8')
    }));

    console.timeEnd()
}

async function fetchData() {
    let userId = 1366033
    let questions = await getQuestions(userId)
    await setQuestions(questions)
}

async function getQuestions(userId) {
    let filter = "ls.OxV)TU.yiDYF4d4clGwwb06WqnuOBDvxQZL"

    let questBase = `https://api.stackexchange.com/2.2/users/${userId}/questions`

    let params = {
        page: 1,
        pagesize: 100,
        order: "desc",
        sort: "activity",
        site: "stackoverflow",
        filter: filter
    }

    // declare placeholders
    let json = {}
    let questions = []

    // make calls in a loop
    do {
        let queryString = new URLSearchParams(params).toString();
        let queryUrl = `${questBase}?${queryString}`

        // query data
        json = await getData(queryUrl)

        // append to questions
        questions.push(...json.items)

        // increment page counter
        params.page += 1
    } while (json.has_more);


    return questions

}

async function setQuestions(questions) {
    let path = "./data/questions.json"
    let output = JSON.stringify(questions, null, 2)
    await fs.writeFile(path, output, 'utf-8')
}


async function getData(url) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json
    } catch (error) {
        console.log(error);
    }
};
