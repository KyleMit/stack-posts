import { parseISO, format } from 'date-fns'
import { FC } from 'react'

interface IDateDisplayProps {
  dateString: string;
  className?: string;
}
const DateDisplay: FC<IDateDisplayProps> = ({ dateString, className }) => {
  const date = parseISO(dateString)
  return <time className={className} dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}

export default DateDisplay
