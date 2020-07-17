require('dotenv').config();

const jwt = require('jsonwebtoken');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'cristian',
    host: 'localhost',
    database: 'news_app',
    password: 'sefusuprem',
    port: 5432,
});

const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    let { firstName, secondName, email, password } = req.body;

    // check if email exists
    const emailExists = await pool.query('SELECT * FROM users WHERE email=$1', [email], (error, results) => {
        if(error) throw error;
        return results.rows;
    });
    if(emailExists) return res.json({ success: false, message:'Email already in use.' })
    
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;

    // insert user
    try {
        const data = [firstName, secondName, email, password];
        const savedUser = await pool.query(`INSERT INTO users (firstName, secondName, email, password) VALUES ($1,$2,$3,$4)`, data, (error, results) => {
            if(error) throw error;
            res.json({ success: true });
        });
    } catch(err) {
        res.status(400).send(err);
    }
}

const loginUser = async (req, res) => {
    let { email, password } = req.body;
    // Check if the user exists
    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1',[email]);
    if(!rows.length) return res.json({ success: false, message:'Invalid credentials.' });

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, rows[0].password);
    if(!validPassword) return res.json({ success: false, message:'Invalid credentials.' });
    
    // Create and assign a token
    let {id, firstname, secondname, subscriptions} = rows[0];

    const token = jwt.sign({ email, firstname, secondname, id, subscriptions }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({ success: true, token });
     // res.json({ success: true });
}

const getUser = async (req, res) => {
    const query = 'SELECT * FROM users WHERE id=$1';
    try {
        let { rows } = await pool.query(query, [req.params.id]);
        delete rows[0].parola;
        // console.log(rows[0].produsefavorite);
        // rows[0].produsefavorite = Object.values(rows[0].produsefavorite);
        res.json({ success: true, user: rows[0] });
    } catch(error) {
        throw error;
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
}