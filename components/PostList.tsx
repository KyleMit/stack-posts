import Link from 'next/link'
import { FC } from 'react'
import { DateDisplay } from './'
import { IPost } from '../lib/cli'

interface IPostListProps {
    posts: IPost[];
}

const PostList: FC<IPostListProps> = ({ posts }) => (
    <div>
        {posts.map(({ id, q, a }) => (
            <div key={id} className="s-post-summary s-post-summary__minimal bbw0">
                <div className="s-post-summary--content">
                    <Link href={`/p/${id}`}>
                    <a className="s-post-summary--content-title s-link">{q.title}</a>
                    </Link>
                    <div className="s-post-summary--meta">
                        <div className="s-post-summary--meta-tags">
                        {q.tags.map((tag) => (
                            <Link key={tag} href={`/t/${tag}`}>
                            <a className="s-tag s-tag__muted">{tag}</a>
                            </Link>  
                            ))}
                        </div>

                        <div className="s-user-card s-user-card__minimal">
                            <DateDisplay
                            dateString={q.creation_date}
                            className="s-user-card--time"
                            />
                        </div>

                    </div>
                </div>
            </div>
        ))}
    </div>
)


export default PostList
