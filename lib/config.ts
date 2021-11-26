export interface IPostPaths {
  answerPost: string;
  questionPost: string;
  answerAltPost: string;
  questionAltPost: string;
}

export interface ICachePaths {
  answerData: string;
  questionData: string;
  answerAltData: string;
  questionAltData: string;
  userData: string;
  postData: string;
}

export interface IConfigData {
  userId: number;
  cache: ICachePaths;
  posts: IPostPaths;
}

const config: IConfigData = {
  userId: 1366033,
  cache: {
    answerData: "./_cache/answers-mine.json",
    questionData: "./_cache/questions-mine.json",
    answerAltData: "./_cache/answers-alt.json",
    questionAltData: "./_cache/questions-alt.json",
    userData: "./_cache/users.json",
    postData: "./_cache/posts.json",

  },
  posts: {
    answerPost: "./posts/mine/answers/",
    questionPost: "./posts/mine/questions/",
    answerAltPost: "./posts/alt/answers/",
    questionAltPost: "./posts/alt/questions/"
  }

}

export default config
