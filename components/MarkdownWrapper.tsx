/* eslint-disable react/no-children-prop */
import { FC } from 'react'
import ReactMarkdown from 'react-markdown'


interface IMarkdownWrapperProps {
  md?: string;
}
const MarkdownWrapper: FC<IMarkdownWrapperProps> = ({ md }) => {
  return (
    <div className="s-prose" >
      <ReactMarkdown children={String(md)} />
    </div>
  )
}

export default MarkdownWrapper
