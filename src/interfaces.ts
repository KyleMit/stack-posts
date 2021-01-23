export interface QuestionResponse {
  has_more: boolean
  quota_max: number
  quota_remaining: number
  page: number
  page_size: number
  total: number
  items: Question[]
}

export interface Question {
  question_id: number
  accepted_answer_id?: number
  title: string
  link: string
  score: number
  view_count: number
  answer_count: number
  is_answered: boolean
  last_activity_date: number
  tags: string[]
  body_markdown: string
}
