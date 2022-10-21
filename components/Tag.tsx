import Link from 'next/link'
import { FC } from 'react'

interface ITagProps {
  tag: string
}
const Tag: FC<ITagProps> = ({ tag }) => {
  return (
    <Link href={`/t/${encodeURIComponent(tag)}`}>
      <a className="s-tag s-tag__muted">{tag}</a>
    </Link>  
  )
}

export default Tag
