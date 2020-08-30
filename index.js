// モジュールのインポート
const express = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート
const socketIO = require('socket.io');
socketId='';

// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};
// APIコールのためのクライアントインスタンスを作成
const lineChat = new line.Client(line_config);

// Webサーバー設定
const server = express.listen(process.env.PORT || 4000);
// Socket通信設定
const io = socketIO(server);
io.on('connection', (socket) => {
  socketId = socket.id;
  console.log("接続する時のsocketId:"+socketId);
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
    if (!lineId || !message) {
      sendStatus({
        success: false,
        message: 'Please enter a lineId and message'
      });
    } else {
        lineChat.pushMessage(lineId, {
            type: 'text',
            text: message,
        }).catch(error => {
          console.error('error', error);
        });
      sendStatus({
        success: true,
        message: 'Message updating...'
      });
    }
  })
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// ルーター設定
express.post('/line', line.middleware(line_config), (req, res, next) => {
  // 先行してLINE側にステータスコード200でレスポンスする。
  res.sendStatus(200);

  // イベントオブジェクトを順次処理。
  req.body.events.forEach((event) => {
      // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
      if (event.type == "message" && event.message.type == "text"){
          console.log("Lineから送信する時のsocketId:"+socketId);
          console.log("event.message.text:"+event.message.text);
          io.to(socketId).emit('msg_line_to_sf', event.message.text);
      }
  });
});