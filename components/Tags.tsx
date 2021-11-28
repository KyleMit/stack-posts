import { parseISO, format } from 'date-fns'
import { FC } from 'react'

interface IDateProps {
  tags?: string[]
}
const Tags: FC<IDateProps> = ({ tags }) => {
  if (!tags?.length) return null;
  return (
    <div className="d-flex gs4">
        {tags.map((tag) => (
            <a key={tag} className="flex--item s-tag s-tag__muted" href="#">{tag}</a>
        ))}
  </div>
  )
}

export default Tags
