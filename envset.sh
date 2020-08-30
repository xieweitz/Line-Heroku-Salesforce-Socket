#!/bin/sh
#アクセストークン設定
heroku config:set LINE_ACCESS_TOKEN=q9xwOo3sXk+8o0wOv3iiuLoEfnAhTGfIkltvlXyYwU/e3umF9uJuGGzhEB004RXks2ydbcW2xNDS9xLXWMcwowoXbP5mGDtE2ndKF2jv70qo0bEXypHgpn0a2Sx0BcCrLkf53EaEeBUJFrUaWogBWQdB04t89/1O/w1cDnyilFU= -a line-heroku-salesforce-socket
#チャネル設定
heroku config:set LINE_CHANNEL_SECRET=9c646c36e68300afb2a546b96a02541b -a line-heroku-salesforce-socket
heroku config:set LINE_CHANNEL_ID=1654880549 -a line-heroku-salesforce-socket

#アクセストークン設定
#heroku config:set LINE_ACCESS_TOKEN=/PytQxc7HdBUt3d/Te/1piF80yQTSs9Tg0253pcgw2fh9Xv16cx50YMS5lhX8DskUQ29ktnx97yf2EnIC7ZYpe2jBmapSuyYfkYxnycqhwWZ2IlYLMC+382410fSk2LlTtZhWz8olNs8cMeepOKHWQdB04t89/1O/w1cDnyilFU= -a line-heroku-salesforce-socket
#チャネル設定
#heroku config:set LINE_CHANNEL_SECRET=0fe5307409be59e89f27d8d17a7b7b59 -a line-heroku-salesforce-socket
#heroku config:set LINE_CHANNEL_ID=1654573028 -a line-heroku-salesforce-socket

heroku config:get LINE_ACCESS_TOKEN -a line-heroku-salesforce-socket
heroku config:get LINE_CHANNEL_SECRET -a line-heroku-salesforce-socket
heroku config:get LINE_CHANNEL_ID -a line-heroku-salesforce-socket