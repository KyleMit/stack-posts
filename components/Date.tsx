import { parseISO, format } from 'date-fns'
import { FC } from 'react'

interface IDateProps {
  dateString: string;
  className: string;
}
const Date: FC<IDateProps> = ({ dateString, className }) => {
  const date = parseISO(dateString)
  return <time className={className} dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}

export default Date
