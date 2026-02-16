const { query } = require('./src/config/db');
const fs = require('fs');
const path = require('path');

const initDatabase = async () => {
    try {
        const sql = fs.readFileSync(path.join(__dirname, 'src/config/init.sql')).toString();
        await query(sql);
        console.log("🚀 Tables created successfully!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error initializing database:", err);
        process.exit(1);
    }
};

initDatabase();