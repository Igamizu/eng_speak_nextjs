# ベースイメージの指定
FROM node:20.11.1-alpine3.18

# コンテナ内の作業ディレクトリを/var/www/htmlに設定
WORKDIR /var/www/html/

# 
COPY ./my-app /var/www/html/

# next.jsプロジェクトに必要なパッケージをインストール
RUN npm upgrade && npm install

# アプリケーションをビルド
# RUN npm run build

# ポート3000でアプリを起動
EXPOSE 3000
CMD ["npm", "run", "dev"]