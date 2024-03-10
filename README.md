# Dockerの使い方

## コンテナの構成
 - nginx : Webサーバー用のコンテナです。
 - node : Webアプリ（React/Next.js）用のコンテナです。
 - mysql : データベース用のコンテナです。

## Dockerのインストール
Dockerをインストールしてください。デスクトップ版は以下のURLからダウンロード可能です。 
https://www.docker.com/ja-jp/products/docker-desktop/

デスクトップ版を使用している場合、コンテナを起動するときはアプリを起動したままにしてください。

## git clone直後の操作
以下のコマンドを実行してください
~~~
$ docker-compose run node npm upgrade
~~~

~~~
$ docker-compose run mysql /bin/sh
mysql# mysql -u root -p INSECTDB < /etc/mysql/INSECTDB.sql
~~~
(`./.env`)の`MYSQL_ROOT_PASSWORD`の値を入力してください。

## 基本操作
### コンテナイメージ作成、コンテナ起動
~~~
$ docker-compose up -d --build
~~~
コンテナ起動が成功していれば、 http://localhost から作成中のサイトを見ることができます。

### コンテナが立ち上がっているか確認
~~~
$ docker-compose ps
~~~

### コンテナ内のログを確認
~~~
$ docker-compose logs [nginx or node or mysql]...
~~~
各コンテナが止まった際の原因を調べる時などに使用してください。

### 起動中のコンテナ内で特定のコマンドを使用
~~~
docker-compose exec [nginx or node or mysql] [command]...
~~~
コンテナ内の`/bin/`内にあるコマンドが使用できます。

### コンテナを立ち上げて特定のコマンドを使用
~~~
docker-compose run [nginx or node or mysql] [command]...
~~~
コンテナ内の`/bin/`内にあるコマンドが使用できます。

### コンテナ停止と削除
~~~
$ docker-compose down
~~~

### 後片付け
~~~
$ docker system prune -a
~~~
停止しているコンテナの他にイメージとキャッシュが削除されます。作業終わりなどの時に使用してください。