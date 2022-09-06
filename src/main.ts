import { Translator, SourceLanguageCode, TargetLanguageCode } from "deepl-node"
import { PathLike } from "fs"
import { readFile, writeFile } from "fs/promises"

interface RuleFile {
    [website: string]: WebsiteRule
}

interface WebsiteRule {
    [key: string]: Rule[] | string
    _name: string
}

interface Rule {
    title: string
    docs?: string
    source?: string | ArrayLike<string>
    targetType?: string
    target?: string | ((params: { [param: string]: string }, url?: string, document?: any) => string)
}

function zip<T>(a: T[], b: T[]): [T, T][] {
    return a.map((s, i) => [s, b[i]])
}

async function readRuleFiles(paths: PathLike[]): Promise<RuleFile[]> {
    let strings = await Promise.all(
        paths.map(path => readFile(`rules/${path}`, { encoding: "utf-8" }))
    )
    return strings.map(eval)
}

function collectKeys(ruleFiles: Iterable<RuleFile>): Set<string> {
    const keys = new Set<string>()
    for (const ruleFile of ruleFiles) {
        for (const website in ruleFile) {
            for (const subdomain in ruleFile[website]) {
                if (subdomain != "_name") {
                    for (const rule of ruleFile[website][subdomain] as Rule[]) {
                        if (rule.title !== undefined) {
                            keys.add(rule.title)
                        }
                    }
                } else {
                    keys.add(ruleFile[website]._name)
                }
            }
        }
    }
    return keys
}

async function translate(keysToTranslate: Set<string>, sourceLang: SourceLanguageCode | null, targetLang: TargetLanguageCode): Promise<[key: string, value: string][]> {
    if (keysToTranslate.size === 0) { return [] }

    const authKey = process.env.DEEPL_AUTH_KEY ?? ""
    const translator = new Translator(authKey)

    const keys = Array.from(keysToTranslate)
    const values = (await translator.translateText(keys, sourceLang, targetLang)).map(r => r.text)
    return zip(keys, values)
}

async function buildDict(ruleFiles: Iterable<RuleFile>, targetLang: TargetLanguageCode): Promise<Map<string, string>> {
    const existingDict: Map<string, string> = new Map(
        Object.entries(
            JSON.parse(
                await readFile(`dicts/dict.${targetLang}.json`, { encoding: "utf-8" })
                    .catch((error) => {
                        console.log(error)
                        return "{}"
                    })
            )
        )
    )
    const dict: Map<string, string> = new Map()
    const keysToTranslate: Set<string> = new Set()
    
    for (const key of collectKeys(ruleFiles)) {
        if (key.length === 0) { continue }
        if (JSON.stringify(key).slice(1, -1) !== key) {
            console.log(`Key ${JSON.stringify(key)} might not be replaced because it requires escapes.`)
        }
        const existingValue = existingDict.get(key)
        if (existingValue !== undefined) {
            dict.set(key, existingValue)
        } else {
            keysToTranslate.add(key)
        }
    }

    console.log(`Translating ${keysToTranslate.size} keys to ${targetLang}...`)

    for (const [key, value] of await translate(keysToTranslate, "zh", targetLang)) {
        dict.set(key, value)
    }

    return dict
}

async function translateRuleFiles(ruleNames: string[], dict: Map<string, string>, targetLang: TargetLanguageCode) {
    let strings = await Promise.all(
        ruleNames.map(ruleName => readFile(`rules/${ruleName}.js`, { encoding: "utf-8" }))
    )

    function replacer(match: string, offset: number, string: string): string {
        if (offset - 1 < 0 || offset + match.length >= string.length) {
            return match
        }
        const delimiter = string.charAt(offset - 1)
        if (string.charAt(offset + match.length) === delimiter && [`"`, `'`, `\``].includes(delimiter)) {
            return dict.get(match) ?? match
        } else {
            return match
        }
    }
    
    await Promise.all(
        zip(ruleNames, strings)
            .map(([name, content]) => {
                let translatedContent = content
                for (const key of dict.keys()) {
                    translatedContent = translatedContent.replaceAll(key, replacer)
                }
                return [name, translatedContent]
            })
            .map(([name, content]) => writeFile(`rules/${targetLang}/${name}.js`, content, { encoding: "utf-8" }))
    )
}

const ruleFiles = await readRuleFiles([
    "radar-rules.js",
    "rssbud-rules.js",
])
const targetLang: TargetLanguageCode = "en-US"
const dict = await buildDict(ruleFiles, targetLang)
await writeFile(`dicts/dict.${targetLang}.json`, JSON.stringify(Object.fromEntries(dict), undefined, 4), { encoding: "utf-8" })
await translateRuleFiles(
    [
        "radar-rules",
        "rssbud-rules",
    ],
    dict,
    targetLang
)
