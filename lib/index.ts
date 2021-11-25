import { fetchData, writeMarkdown, writeSite } from "./cli";


const main = async () => {
    const args = process.argv.slice(2);
    const [ command ] = args;
    switch (command) {
        case "fetch":
            await fetchData();
            break;

        case "markdown":
            await writeMarkdown();
            break;

        case "site":
            await writeSite();
            break;
    }
}

main()
