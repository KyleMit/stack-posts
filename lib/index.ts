import { fetchData, writeMarkdown } from "./cli";

enum Commands {
    fetch = "fetch",
    markdown = "markdown"
}

const main = async () => {
    const args = process.argv.slice(2);
    const [ command ] = args;
    switch (command) {
        case Commands.fetch:
            await fetchData();
            break;

        case Commands.markdown:
            await writeMarkdown();
            break;

        default:
            console.log(`You typed '${command}'. \nThe only available commands are ${Object.values(Commands).join(", ")}`)
    }
}

main()
