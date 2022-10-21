import { parseISO, format } from 'date-fns'
import { FC } from 'react'

interface IDateDisplayProps {
  dateString: string;
  className?: string;
}
const DateDisplay: FC<IDateDisplayProps> = ({ dateString, className }) => {
  
  let formatted: string;
  try {
    const date = parseISO(dateString)
    formatted = format(date, 'LLLL d, yyyy')
  } catch (error) {
    // fail gracefully
    console.log(`Error parsing ${dateString}`)
    formatted = dateString
  }
  return <time className={className} dateTime={dateString}>{formatted}</time>
}

export default DateDisplay
