import yaml from "js-yaml"


export const objToYaml = (obj: any): string =>
    yaml.safeDump(yaml.safeLoad(JSON.stringify(obj)))


export const objToFrontmatter = (obj: any): string =>
    `---\n${objToYaml(obj)}---\n`
