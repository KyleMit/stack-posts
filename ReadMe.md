# Stack Posts

Personalized Local Copy of Stack Overflow

## API Docs

[Questions on Users](https://api.stackexchange.com/docs/questions-on-users#page=1&pagesize=100&order=desc&sort=activity&ids=1366033&filter=!WXi8jmdCDBo_r-QTD3GFmuOlWj4Js-SxyFKgGyu&site=stackoverflow&run=true)


## Todo

* Nuxt rename file
* Update to ESM
  * Update to latest Remark Package
* Use [Stacks](https://stackoverflow.design/)
  * Replace inline build once stacks releases update
  * Purge CSS
* Add 404.tsx page
* Improve Syntax Highlighting
* Add code copy button
* Fix Heading levels from markdown 1,2,3 -> 4,5,6
* Add Sort
* Build site with **awesome** search 🚀
* Add tags view
* Run Weekly Update via Github Actions
* R2
  * All posts you've
    * voted on
    * favorited
    * bountied
    * ... are generally interested in
* Cache bust param?
* Use Stimulus


## SDK

* [JavaScript SDK - Stack Exchange API](https://api.stackexchange.com/docs/js-lib)
* [KarthikGangadhar/**stack-exchange**](https://github.com/KarthikGangadhar/stack-exchange) - This is a simple npm module that provides wrapper to access StackOverflow API
* [StackExchange API JS SDk - Stack Apps](https://stackapps.com/q/6748/21608)

## Example API Call

```js
const userId = 1366033
const base = `https://api.stackexchange.com/2.2/users/${userId}/questions`
const params = {
    page: "1",
    pagesize: "5",
    order: "desc",
    sort: "activity",
    site: "stackoverflow",
    filter: "ls.OxV)TU.yiDYF4d4clGwwb06WqnuOBDvxQZL"
}
const queryString = new URLSearchParams(params).toString()
const url = `${base}?${queryString}`
console.log(url)
// https://api.stackexchange.com/2.2/users/1366033/questions?page=1&pagesize=5&order=desc&sort=activity&site=stackoverflow&filter=ls.OxV%29TU.yiDYF4d4clGwwb06WqnuOBDvxQZL
```
