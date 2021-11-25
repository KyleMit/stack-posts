const config = {
  userId: 1366033,
  paths: {
    answerCacheData: "./_cache/answers-mine.json",
    questionCacheData: "./_cache/questions-mine.json",
    answerAltCacheData: "./_cache/answers-alt.json",
    questionAltCacheData: "./_cache/questions-alt.json",
    userCacheData: "./_cache/users.json",
    answerPostFolder: "./posts/mine/answers/",
    questionPostFolder: "./posts/mine/questions/",
    answerAltPostFolder: "./posts/alt/answers/",
    questionAltPostFolder: "./posts/alt/questions/"
  }
} as const

export default config
