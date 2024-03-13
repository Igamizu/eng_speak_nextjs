import { NextResponse } from 'next/server';
import * as mysql from 'promise-mysql';

// 環境変数
require('dotenv').config({path: './.env'});

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const queries = {
        id: searchParams.get('id') ?? "",
    }

    const { id } = queries;

    const connection = await mysql.createConnection({
        host: 'mysql',
        port: 3306,
        database: process.env.MYSQL_DATABASE,
        user: "root",
        password: process.env.MYSQL_ROOT_PASSWORD
    });

    const result = await connection.query(
        'SELECT * FROM state_slot \
        WHERE `id` LIKE ?', 
        [ id ]
    );
    connection.end();

    return NextResponse.json(result);
}