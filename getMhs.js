// import puppeteer
const puppeteer = require('puppeteer')

// define function
const main = async () => {

    // konfigurasi headless chromium
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
    })
    const page = await browser.newPage()
    await page.setViewport({width: 1366, height: 768});

    // isi dengan url halaman daftar peserta mata kuliah KKN tahun 2020 di siamik
    await page.goto('https://siamik.upnjatim.ac.id/daftarMahasiswa.asp?kelas=9EC166196A255F4067435D888A6009C3E57BE901AE1073B5&progdi=9A12E070A48561DFE7298B7C26C041139736AA5DCBDFA8FB&kode=D08532119DE2B3A4041CEFF7F75DAA5FE07EAF25AA4524530C9DECB1374FBE45')

    // mendapatkan data dari tabel
    let npm = await page.evaluate(() => Array.from(document.querySelectorAll('tr > td:nth-child(2)'), element => element.textContent))
    let name = await page.evaluate(() => Array.from(document.querySelectorAll('tr > td:nth-child(3)'), element => element.textContent))

    // screenshot tampilan page
    await page.screenshot({path: 'halamanPesertaKKN.png'})

    // define wadah dari array daya mahasiswa
    let newMHS = []
    let addName = []

    // push data hasil scrap name ke array diatas
    name.forEach((item, i) => {
        addName.push(item)
    });

    // push data nama beserta npm ke newMHS
    npm.forEach((item, i) => {
        let addedName = addName[i]
        newMHS.push({"npm": item, "name": addedName})
    });

    // cut array di possis pertama karena isinya nama tabel ('npm', 'nama')
    newMHS.splice(0, 1)

    // return array newMHS
    return newMHS

    // await browser.close()
}

// export function
module.exports = main
