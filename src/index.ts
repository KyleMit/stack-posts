import { fetchData, writeMarkdown } from "./cli";


const main = async () => {
    const args = process.argv.slice(2);
    const [ command ] = args;
    if (command === 'fetch') {
        await fetchData();
    } else if (command === 'markdown') {
        await writeMarkdown();
    }
}

main()
