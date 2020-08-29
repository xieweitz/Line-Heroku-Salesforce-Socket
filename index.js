// -----------------------------------------------------------------------------
// モジュールのインポート
const express = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート
const socketIO = require('socket.io');
const redis = require('socket.io-redis');
socketId='';

// -----------------------------------------------------------------------------
// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};

// -----------------------------------------------------------------------------
// Webサーバー設定
const server = express.listen(process.env.PORT || 3000);

// APIコールのためのクライアントインスタンスを作成
const lineChat = new line.Client(line_config);
const io = socketIO(server);

// -----------------------------------------------------------------------------
// ルーター設定
express.post('/bot/webhook', line.middleware(line_config), (req, res, next) => {
    // 先行してLINE側にステータスコード200でレスポンスする。
    res.sendStatus(200);

    // イベントオブジェクトを順次処理。
    req.body.events.forEach((event) => {
        // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
        if (event.type == "message" && event.message.type == "text"){
            //events_processed.push();
            io.to(socketId).emit('msg_line_to_sf', event.message.text)
        }
    });
});

io.on('connection', (socket) => {
  console.log('Client connected');
  socketId = socket.id;
  /**
   * Create function to send status
   * @param success {bool}
   * @param message {string}
   */
  const sendStatus = function({success, message}){
    socket.emit('status', {success, message});
  }

  socket.on('msg_sf_to_line', (data) => {
    const lineId = data.lineId;
    const message = data.message;
    console.log("lineId:"+lineId);
    console.log("message:"+message);
    if (!lineId || !message) {
      sendStatus({
        success: false,
        message: 'Please enter a lineId and message'
      });
    } else {
        lineChat.pushMessage(lineId, {
            type: "text",
            text: message
        })
      sendStatus({
        success: true,
        message: 'Message updating...'
      });
    }
  })
  socket.on('disconnect', () => console.log('Client disconnected'));
});