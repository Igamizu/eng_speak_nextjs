import { NextResponse } from 'next/server';
import * as mysql from 'promise-mysql';

// 環境変数
require('dotenv').config({path: './.env'});

export async function GET(request, { params }) {
    const key_value = params.key_value;

    const connection = await mysql.createConnection({
        host: 'mysql',
        port: 3306,
        database: process.env.MYSQL_DATABASE,
        user: "root",
        password: process.env.MYSQL_ROOT_PASSWORD
    });

    const result = await connection.query(
        'SELECT * FROM giu \
        WHERE `key_value` LIKE ?', [key_value]
    );
    connection.end();

    return result.length !== 0 
        ? NextResponse.json(result) 
        : NextResponse.json({error: '無効なリクエストです。'}, {status: 500});

}