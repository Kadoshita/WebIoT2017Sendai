# Seat Library

![システムロゴ](./static/img/systemlogo.png "システムロゴ")

本システムは、「Web×IoT メイカーズチャレンジ 2017 in 仙台」の作品です。
## システム概要

* 座席の状態をリアルタイムで取得
* 一定時間が経過すると振動でお知らせ

## 動作環境

* Node.js
* npm
* bower

上記のソフトウエア、コマンドが実行可能な環境

## 使用方法

以下のコマンドを実行してください。

```shell
git clone https://github.com/Kadoshita/WebIoT2017Sendai.git
cd ./WebIoT2017Sendai
npm install
cd static
bower install
cd ../
node app.js
```

[http://localhost:3000/](http://localhost:3000/)にブラウザでアクセスすると使用できます。