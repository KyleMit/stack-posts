# Stack Posts

Personalized Local Copy of Stack Overflow

## API Docs

[Questions on Users](https://api.stackexchange.com/docs/questions-on-users#page=1&pagesize=100&order=desc&sort=activity&ids=1366033&filter=!WXi8jmdCDBo_r-QTD3GFmuOlWj4Js-SxyFKgGyu&site=stackoverflow&run=true)


## Features

* Download unsafe HTML
* Download All Questions
  * Plus accepted answer
* Download All Answers
  * Plus prompting question
* Download All users metadata
* Generate Markdown Files w/ Frontmatter
* Build site with **awesome** search 🚀
* Run Weekly Update via Github Actions
* R2
  * All posts you've voted on


## SDK

* [JavaScript SDK - Stack Exchange API](https://api.stackexchange.com/docs/js-lib)
* [KarthikGangadhar/**stack-exchange**](https://github.com/KarthikGangadhar/stack-exchange) - This is a simple npm module that provides wrapper to access StackOverflow API
* [StackExchange API JS SDk - Stack Apps](https://stackapps.com/q/6748/21608)

## Example API Call

```js
let userId = 1366033
let base = `https://api.stackexchange.com/2.2/users/${userId}/questions`
let params = {
    page: "1",
    pagesize: "5",
    order: "desc",
    sort: "activity",
    site: "stackoverflow",
    filter: "ls.OxV)TU.yiDYF4d4clGwwb06WqnuOBDvxQZL"
}
let queryString = new URLSearchParams(params).toString()
let url = `${base}?${queryString}`
console.log(url)
// https://api.stackexchange.com/2.2/users/1366033/questions?page=1&pagesize=5&order=desc&sort=activity&site=stackoverflow&filter=ls.OxV%29TU.yiDYF4d4clGwwb06WqnuOBDvxQZL
```
