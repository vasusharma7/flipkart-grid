# from tweepy import Stream
from tweepy import OAuthHandler
# from tweepy.streaming import StreamListener
from tweepy import API
from tweepy import Cursor
import credentials
import json
import requests
import os


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

    # for tweet in tweepy.Cursor(api.search,q="#unitedAIRLINES",count=100,
    #                            lang="en",
    return tweets


fashion_handles = ['FASHlONABLE', 'SHEIN_official', 'VogueParis', 'Refinery29',
                   'TimesFashion', 'AmazonFashionIn']

num = 200


def download_image(pic_urls, handle, id):
    if not os.path.exists("./data"):
        os.mkdir("./data")
    if not os.path.exists("./data/{0}".format(handle)):
        os.mkdir("./data/{0}".format(handle))
    for i, pic_url in enumerate(pic_urls):
        img_data = requests.get(pic_url).content
        with open('./data/{0}/{1}_{2}.jpg'.format(handle, id, i), 'wb') as handler:
            handler.write(img_data)


extraction = {}
for handle in fashion_handles:
    extraction[handle] = {}
    data = twitter_client(num, handle)
    k = 0
    for i, tweet in enumerate(data):
        obj = {}
        json_str = tweet._json
        try:
            urls = []
            for twt in (json_str['extended_entities']['media']):
                urls.append(twt['media_url'])
            if not urls == []:
                download_image(urls, handle, json_str['id'])
                obj['id'] = json_str['id']
                obj['favorite_count'] = json_str['favorite_count']
                obj['text'] = json_str['text']
                obj['created_at'] = json_str['created_at']
                extraction[handle][k] = obj
                k += 1
        except:
            pass
        print(handle, "tweet", i)
    print("Completed - ", handle)

with open("dump.json", 'w+') as file:
    json.dump(extraction, file)
    # file.write(json.dumps(extraction))
