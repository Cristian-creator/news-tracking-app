
require('dotenv').config();

const { USER, HOST, DATABASE, PASSWORD, PORT } = process.env;

const Pool = require('pg').Pool;
const pool = new Pool({
    user: USER,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: PORT,
});

const puppeteer = require('puppeteer');

const getNews = async (req, res) => {
    const { id } = req.body;
    // FIND USER
    const query = `SELECT * FROM users WHERE id=$1`;
    let { rows } = await pool.query(query, [id]);

    // SUBSCRIPTIONS LIST
    let subList = rows[0].subscriptions;
    subList = subList.sort();

    // query news
    if(!subList.length) return res.json({ success: true, sublist: [] });
   
    let newsQuery = `SELECT * FROM SOURCES WHERE `;
    subList.map((item, index) => {
        if(index < subList.length - 1) newsQuery += `id=${item} OR `;
            else newsQuery += `id=${item}`;
    });

    const sources = await pool.query(newsQuery); //     const sources = pool.query(newsQuery);
    // console.log(sources.rows);                   //     console.log((await sources).rows);

    let news = [];

    const browser = await puppeteer.launch();
    
    const getSources = await Promise.all(sources.rows.map(async (item, index) => {
        const page = await browser.newPage();
        const url = item.url;

        await page.goto(url);

        const title = await page.evaluate((item) => document.querySelector(item.element_title).innerText, item);
        const link = await page.evaluate((item) => document.querySelector(item.element_link).href, item);
        
        const data = {
            journalID: item.id,
            journal: item.title,
            title,
            link
        };

        news.push(data);
    }));

    await browser.close();

    res.json({ success: true, news });
}

const getSources = async (req, res) => {
    
    const query = 'SELECT * FROM sources'
    const { rows } = await pool.query(query);

    res.json({ success: true, sources: rows });
}

const addSubscription = async (req, res) => {
    const { sourceId, userId} = req.body;

    const query = "UPDATE users SET subscriptions = array_append(subscriptions, $1) WHERE id = $2";
    const append = pool.query(query, [sourceId, userId], (error, results) => {
        if(error) throw error;
        return res.json({ success: true, rows: results.rows});
    });
}

const removeSubscription = async (req, res) => {
    const { sourceId, userId} = req.body;

    const query = "UPDATE users SET subscriptions = array_remove(subscriptions, $1) WHERE id = $2";
    const append = pool.query(query, [sourceId, userId], (error, results) => {
        if(error) throw error;
        return res.json({ success: true, rows: results.rows});
    });
}

module.exports = {
    getNews,
    getSources,
    addSubscription,
    removeSubscription
}