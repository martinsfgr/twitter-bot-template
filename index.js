const Twit = require('twit');

const config = {
  consumer_key: '',
  consumer_secret: '',
  access_token: '',
  access_token_secret: '',
};

const keyWord = 'anything';

const botScreenName = 'bot';

const bot = new Twit(config);
const stream = bot.stream('statuses/filter', { track: keyWord });

try {
  stream.on('tweet', function (tweet) {
    if (tweet.user.screen_name === botScreenName) {
      return
    }

    else if (!tweet.retweeted_status) {
      bot.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data) {
        if (err) {
          console.log(`O bot não conseguiu retweetar. ${err}`);
        } else {
          console.log(`O bot retweetou: @${tweet.user.screen_name - tweet.text}`);
        }
      })
    }
  })
} catch (_) {
  console.log('Ocorreu um erro.');
  process.exit();
}
