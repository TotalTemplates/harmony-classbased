export function getEnv(key: string) {
  try {
    return Deno.env.get(key)
  } catch (_) {
    return undefined
  }
}

export function readRecursively (path: string, filelist: string[] = []) {
  const files = Deno.readDirSync(path)
  for (const file of files) {
    if (Deno.statSync(path + '/' + file.name).isDirectory) {
      filelist = readRecursively(path + '/' + file.name, filelist)
    } else filelist.push(path + '/' + file.name)
  }

  return filelist
}

export function existsSync(filePath: string) {
  try {
    Deno.lstatSync(filePath)
    return true
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false
    }
    throw err
  }
}
