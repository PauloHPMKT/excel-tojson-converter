const XLSX = require('xlsx')
const fs = require('fs')
const { join } = require('path')    

const covertKeysToLowerCase = (obj) => {
    const newObj = {}
    Object.keys(obj).forEach(key => {
        newObj[key.toLowerCase()] = obj[key]
    })
    return newObj
}

const fileName = 'campanhas'
const workbookPath = join(__dirname, `${fileName}.xlsx`)

const workbook = XLSX.readFile(workbookPath)

const sheetName = workbook.SheetNames[0]
const sheet = workbook.Sheets[sheetName]
const converteed = XLSX.utils.sheet_to_json(sheet)

const toJson = converteed.map(covertKeysToLowerCase)

fs.writeFileSync(join(__dirname, `${fileName}.json`), JSON.stringify(toJson, null, 2))