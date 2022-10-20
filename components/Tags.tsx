import { FC } from 'react'
import Tag from './Tag';

interface ITagsProps {
  tags?: string[]
}
const Tags: FC<ITagsProps> = ({ tags }) => {
  if (!tags?.length) return null;
  return (
    <div className="d-flex gs4">
      {tags.map((tag) => (
            <Tag key={tag} tag={tag} />
        ))}
  </div>
  )
}

export default Tags
