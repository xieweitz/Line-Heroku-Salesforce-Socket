#!/bin/sh
#アクセストークン設定
heroku config:set LINE_ACCESS_TOKEN=q9xwOo3sXk+8o0wOv3iiuLoEfnAhTGfIkltvlXyYwU/e3umF9uJuGGzhEB004RXks2ydbcW2xNDS9xLXWMcwowoXbP5mGDtE2ndKF2jv70qo0bEXypHgpn0a2Sx0BcCrLkf53EaEeBUJFrUaWogBWQdB04t89/1O/w1cDnyilFU= -a line-heroku-salesforce-socket
#チャネル設定
heroku config:set LINE_CHANNEL_SECRET=9c646c36e68300afb2a546b96a02541b -a line-heroku-salesforce-socket