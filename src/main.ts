import { Translator, SourceLanguageCode, TargetLanguageCode } from "deepl-node"
import { PathLike } from "fs"
import { readFile, writeFile } from "fs/promises"
import { pathToFileURL } from "url"

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

async function readRuleFiles(paths: PathLike[]): Promise<RuleFile[]> {
    let strings = await Promise.all(
        paths.map(path => readFile(path, { encoding: "utf-8" }))
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
    function zip<T>(a: T[], b: T[]): [T, T][] {
        return a.map((s, i) => [s, b[i]])
    }

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

const ruleFiles = await readRuleFiles([
    "radar-rules.js",
    "rssbud-rules.js",
])
const targetLang: TargetLanguageCode = "en-US"
const dict = await buildDict(ruleFiles, targetLang)
await writeFile(`dicts/dict.${targetLang}.json`, JSON.stringify(Object.fromEntries(dict), undefined, 4), { encoding: "utf-8" })
