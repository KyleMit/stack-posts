const fetch = require("node-fetch");
const { promises: fs } = require("fs")

main()

async function main() {
    let userId = 1366033

    let questions = await getQuestions(userId)

    await setQuestions(questions)

}


async function getQuestions(userId) {

    let questBase = `https://api.stackexchange.com/2.2/users/${userId}/questions`

    let params = {
        page: 1,
        pagesize: 100,
        order: "desc",
        sort: "activity",
        site: "stackoverflow",
        filter: "!)5TZ1K2YyqRS(hrKyA8fD0E_CpML"
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