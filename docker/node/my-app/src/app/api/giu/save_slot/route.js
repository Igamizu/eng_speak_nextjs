import { NextRequest, NextResponse } from "next/server";
import * as mysql from 'promise-mysql';

// 環境変数
require('dotenv').config({ path: './.env' });

export async function PUT(request, response) {
    // request bodyをオブジェクトとして受け取る。
    const reqbody = await request.json();

    const questionsJson = JSON.stringify(reqbody.questions)
    const { id, current, correct, incorrect } = reqbody;
    const queries = [id, current, correct, incorrect, questionsJson]

    const connection = await mysql.createConnection({
        host: 'mysql',
        port: 3306,
        database: process.env.MYSQL_DATABASE,
        user: "root",
        password: process.env.MYSQL_ROOT_PASSWORD
    });
    const result = await connection.query(
        'INSERT INTO state_slot (id, current, correct, incorrect, questions) \
        VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE current = ?, correct = ?, incorrect = ?, questions = ?', 
        [...queries, current, correct, incorrect, questionsJson]
    );
    connection.end();

    return NextResponse.json(result);
}
