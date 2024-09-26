import { NextResponse } from 'next/server';
import * as mysql from 'promise-mysql';

// 環境変数
require('dotenv').config({path: './.env'});

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const queries = {
        unit: searchParams.get('unit') ?? "'%'",
        matl: searchParams.get('matl') ?? "giu",
        word: searchParams.get('word') ?? "%"
    }

    const { unit, matl, word } = queries;

    const connection = await mysql.createConnection({
        host: 'mysql',
        port: 3306,
        database: process.env.MYSQL_DATABASE,
        user: "root",
        password: process.env.MYSQL_ROOT_PASSWORD
    });

    const sqlQuery = `SELECT * FROM ${matl} WHERE unit LIKE ${unit} AND eng1 LIKE '%${word}%'`;

    const result = await connection.query(sqlQuery);
    connection.end();

    return NextResponse.json(result);
}