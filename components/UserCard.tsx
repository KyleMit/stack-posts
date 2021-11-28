import { FC } from 'react'
import Image from 'next/image'
import { IUser } from '../lib/models'

interface IDateProps {
  user?: IUser;
}
const UserCard: FC<IDateProps> = ({ user }) => {
  if (!user?.user_id) return null;
  return (
    <>
      <a href={`https://stackoverflow.com/users/${user.user_id}`} className="s-avatar s-user-card--avatar">
        <Image
            className="s-avatar--image"
            src={user.profile_image}
            alt={`Profile picture for ${user.display_name}`}
            width={16}
            height={16}
          />
      </a>
      <div className="s-user-card--info">
          <a href={`https://stackoverflow.com/users/${user.user_id}`} className="s-user-card--link">{user.display_name}</a>
      </div>
    </>
  )
}

export default UserCard
