/*
1. 자유로운 포트에서 어플리케이션 서버 시작
2. 헤드리스 크롬 브라우저에서 페이지 열기 (헤드리스 : 화면에 UI를 그리지 않고도 실행된다는 뜻. ex, puppeteer)
3. 어플리케이션 홈페이지로 이동
4. data-test-id가 'about'인 링크를 찾아 클릭
5. 링크로 이동할 때까지 대기
6. /about 페이지에 도착했는지 확인
*/

const portfinder = require('portfinder')
const puppeteer = require('puppeteer')

const app = require('../meadowlark.js')

let server = null
let port = null

beforeEach(async () => {
    port = await portfinder.getPortPromise()
    server = app.listen(port)
})

afterEach(() => {
    server.close()
})

test('home page links to about page', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(`http://localhost:${port}`)
    await Promise.all([
        page.waitForNavigation(), page.click('[data-test-id="about"]'),
    ])
    expect(page.url()).toBe(`http://localhost:${port}/about`)
    await browser.close()
})