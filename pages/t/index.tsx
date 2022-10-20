import { GetStaticProps } from "next";
import Head from "next/head";
import { Layout, Tag } from "../../components";
import { getPostsCached } from "../../lib/cli";

interface ITagsData {
    tagName: string;
    tagCount: number;
}
interface ITagsProps {
    tagData: ITagsData[]
}

export default function Tags({ tagData }: ITagsProps) {


    return (
        <Layout>
            <Head>
                <title>{tagData.length} Tags</title>
            </Head>

            <header className="m16">
                <h1 className="s-page-title--header">
                    {tagData.length} tags
                </h1>
            </header>
                
            <section>
                <ul className="list-reset">
                    {tagData.map(({ tagName, tagCount }) => (
                        <li key={tagName} className="m6">
                            <Tag tag={tagName} /> x{tagCount}
                        </li>   
                    ))}
                </ul>
                
            </section>
        </Layout>
    )
}

const groupArray = (arr: any[]): Record<string, number> => arr.reduce((r,c) => (r[c] = (r[c] || 0) + 1, r), {})

export const getStaticProps: GetStaticProps = async () => {
    const allPosts = await getPostsCached()
    const allTags = Object.values(allPosts).flatMap(p => p.q.tags)
    const groupedTags = groupArray(allTags)
    const tagData = Object.entries(groupedTags).map(([tagName, tagCount]) => ({ tagName, tagCount }))
    const sortedTagData = tagData.sort((a,b) => b.tagCount - a.tagCount)
    return {
        props: {
            tagData: sortedTagData
        }
    }
}
