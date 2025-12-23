import fs from "fs/promises"

export const readfile = async (path) => {
    try {
        const data = await fs.readFile(path, 'utf8');
        return JSON.parse(data || "[]");
    } catch {
        return []
    }
}

export const writefile = async (path,json) => {
    const data = JSON.stringify(json)
    await fs.writeFile(path, data)
}