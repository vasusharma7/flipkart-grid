# https://www.flipkart.com/womens-tshirts/pr?sid=clo%2Cash%2Cank%2Cloi&q=red%20tshirt&otracker=categorytree
# https://www.flipkart.com/search?q=red,tshirt&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=off&as=off
# https://www.flipkart.com/search?q=phone&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=off&as=off

#url = 'https://www.flipkart.com/beltly-solid-men-round-neck-red-t-shirt/p/itm4371634ccb29a?pid=TSHFNG2ZXM4D2B2H&lid=LSTTSHFNG2ZXM4D2B2HX7LO5C&marketplace=FLIPKART&srno=s_1_7&otracker=search&otracker1=search&fm=organic&iid=a8c90edf-845a-4557-ba6b-a6f2cbd3f3b3.TSHFNG2ZXM4D2B2H.SEARCH&ppt=sp&ppn=sp&ssid=c4wuta6df9alz7y81595325988773&qH=1d2b6a760c2e6c83'

from selenium import webdriver
from bs4 import BeautifulSoup
import urllib.parse as urlparse
import os
import json
import requests
from urllib.parse import parse_qs
driver = webdriver.Chrome('../../../chromedriver')

def download_image(pic_urls, category, pid):
    try:
        if not os.path.exists("./data"):
            os.mkdir("./data")
        if not os.path.exists("./data/{0}".format(category)):
            os.mkdir("./data/{0}".format(category))
        for i, pic_url in enumerate(pic_urls):
            img_data = requests.get(pic_url).content
            with open('./data/{0}/{1}_{2}.jpg'.format(category, pid, i), 'wb') as handler:
                handler.write(img_data)
    except:
        print("This image failed to download")

#url = 'https://www.flipkart.com/metronaut-striped-men-polo-neck-red-t-shirt/p/itmfcg4yz4h8fmfe?pid=TSHFCG4Y6QEXCDRE&lid=LSTTSHFCG4Y6QEXCDREFYJBFG&marketplace=FLIPKART&srno=s_1_12&otracker=search&otracker1=search&fm=organic&iid=a8c90edf-845a-4557-ba6b-a6f2cbd3f3b3.TSHFCG4Y6QEXCDRE.SEARCH&ppt=sp&ppn=sp&ssid=c4wuta6df9alz7y81595325988773&qH=1d2b6a760c2e6c83'
#category="thirts_red"

with open("links.json", 'r') as file:
    inp = json.load(file);

extraction = {}
for category in inp:
    extraction[category] = []
    products = inp[category]
    #for product in products:
    for i in range(5):
        url = products[i]
        print(url)
        parsed = urlparse.urlparse(url)

        pid = parse_qs(parsed.query)['pid'][0];
        ratings = ''
        stars = ''
        images = []

        driver.get(url);

#get the element containing stars
        stars = driver.find_elements_by_class_name('bqXGTW')

#get the element containing rating
        rating = driver.find_elements_by_class_name('_38sUEc')

#get the element containing price 
        price = driver.find_elements_by_class_name('_3qQ9m1')

#get the image url
        imageUrls = []
        imageUrls.append(driver.find_elements_by_class_name('_3wp706')[0].get_attribute('src'))
        download_image(imageUrls, category, pid)

        obj = {}
        try:
            obj['pid'] = pid
        except:
            obj['pid'] = None

        try:
            obj['stars'] = stars[0].text
        except:
            obj['stars'] = None

        try:
            obj['rating'] = rating[0].text
        except:
            obj['rating'] = None 

        try:
            obj['price'] = price[0].text
        except:
            obj['price'] = None 

        extraction[category].append(obj)
        print(pid)
        print(obj['stars'])
        print(obj['rating'])
        print(obj['price'])
        print(imageUrls)


with open("dump.json", 'w') as file:
    json.dump(extraction, file)

driver.quit()
"""
content = driver.page_source
soup = BeautifulSoup(content)
stars = content.find('div', attrs={'class':'hGSR34'})
print(stars)
"""


