#!/bin/sh
#アクセストークン設定
heroku config:set LINE_CHANNEL_ACCESS_TOKEN=F/fW7KxeznENuu832IHhafdQgNlw92ym3W/uHXRd4jh+/4PGfkidxMLcE8XE5w5ps2ydbcW2xNDS9xLXWMcwowoXbP5mGDtE2ndKF2jv70p9WwadW6yAxtdqa7FLq9Sqo6pGvm/r8FRcc79eIWMVqAdB04t89/1O/w1cDnyilFU= -a line-heroku-salesforce-socket
#チャネル設定
heroku config:set LINE_CHANNEL_SECRET=9c646c36e68300afb2a546b96a02541b -a line-heroku-salesforce-socket
heroku config:set LINE_CHANNEL_ID=1654880549 -a line-heroku-salesforce-socket

heroku config:get LINE_CHANNEL_ACCESS_TOKEN -a line-heroku-salesforce-socket
heroku config:get LINE_CHANNEL_SECRET -a line-heroku-salesforce-socket
heroku config:get LINE_CHANNEL_ID -a line-heroku-salesforce-socket