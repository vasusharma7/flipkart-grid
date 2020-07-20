#from tweepy import Stream
from tweepy import OAuthHandler
#from tweepy.streaming import StreamListener
from tweepy import API
from tweepy import Cursor
from . import credentials


def authenticate():
    auth = OAuthHandler(credentials.api_key, credentials.api_key_secret)
    auth.set_access_token(credentials.access_token,
                          credentials.access_token_secret)
    return auth


def twitter_client(num, twitter_user=None):
    auth = authenticate()
    client_handler = API(auth)
    tweets = []
    for tweet in Cursor(client_handler.user_timeline, id=twitter_user).items(num):
        tweets.append(tweet)

    return tweets
