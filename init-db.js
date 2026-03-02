const { query } = require('./src/config/db');
const fs = require('node:fs');
const path = require('node:path');

const initDatabase = async () => {
    try {
        const sqlPath = path.join(__dirname, 'src', 'config', 'init.sql');
        const sql = fs.readFileSync(sqlPath).toString();
        await query(sql);
        console.log("🚀 Tables created successfully!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error initializing database:", err);
        process.exit(1);
    }
};

initDatabase();