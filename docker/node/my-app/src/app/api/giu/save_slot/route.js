import { NextRequest, NextResponse } from "next/server";
import * as mysql from 'promise-mysql';

// 環境変数
require('dotenv').config({ path: './.env' });

export async function POST(request, response) {
    const searchParams = request.nextUrl.searchParams;
    const params = {
        key_value: searchParams.get('key_value'),
        cited: searchParams.get('cited'),
        unit: searchParams.get('unit'),
        genre: searchParams.get('genre'),
        japanese: searchParams.get('japanese'),
        eng1: searchParams.get('eng1'),
        eng2: searchParams.get('eng2'),
        eng3: searchParams.get('eng3'),
        correct: searchParams.get('correct'),
        incorrect: searchParams.get('incorrect')
    }
    queries = Object.values(params);

    const connection = await mysql.createConnection({
        host: 'mysql',
        port: 3306,
        database: process.env.MYSQL_DATABASE,
        user: "root",
        password: process.env.MYSQL_ROOT_PASSWORD
    });
    const result = await connection.query(
        'insert into state_slot values \
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [...queries]
    );
    connection.end();

    const reqbody = JSON.parse(JSON.stringify(NextRequest.body));
    return NextResponse.status(200).json(result);
}
