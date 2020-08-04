from selenium import webdriver, common
from selenium.webdriver import ActionChains
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from collections import defaultdict
import sys
import time
import os
import csv
import requests
import pickle
from pymongo import MongoClient


client = MongoClient(
    "mongodb+srv://Vasu:htccg321@cluster0-miow4.mongodb.net/flipkart-grid?retryWrites=true&w=majority")

database = client["flipkart-grid"]
collection = database["blogs"]

# username = "ubuntu"


options = webdriver.ChromeOptions()
# options.add_argument(
#     "--user-data-dir=/home/{0}/.config/google-chrome/Default".format(username))
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument('--disable-notifications')
options.add_argument("--mute-audio")

# driver = webdriver.Chrome(
#     ChromeDriverManager().install(), chrome_options=options)

# tab = webdriver.Chrome(
#     ChromeDriverManager().install(), chrome_options=options)
tab = webdriver.Chrome("./chromedriver", options=options)
driver = webdriver.Chrome("./chromedriver", options=options)

URL = 'https://www.apetogentleman.com/category/fashion/'

driver.get(URL)

elements = driver.find_elements_by_xpath("//*[@class = 'btn-link']")
for _ in elements:
    print(_.get_attribute("href"))


data = {}
k = 0
# elements = [
#     'file:///mnt/38EA2500EA24BC4E/VIRUS/Projects/flipkart-grid/scrapers/blog/pages/gents/temp']
# elements = ['https://www.apetogentleman.com/oxford-cloth-button-down-shirt/']
for i, ele in enumerate(elements, 1):
    # for i in range(1, 22):
    # obj = defaultdict(list)
    tab.get(ele.get_attribute("href"))
    # tab.get(elements[0] + str(i) + ".html")
    # tab.get(ele)

    title = tab.find_element_by_xpath(
        "//h1[@class = '\"entry-title\"']").text
    author = tab.find_element_by_xpath(
        "//div[@class='author-description']").find_element_by_tag_name("span").text
    # obj['date'] = ""
    main = tab.find_element_by_xpath(
        "//section[@class= 'content entry-content']")
    sub = defaultdict(lambda: [])

    sub['title'] = title
    sub['author'] = author
    sub['date'] = ""
    text = []
    try:
        for tag in main.find_elements_by_css_selector("*"):
            print(tag.tag_name)
            if tag.tag_name == "h2":
                sub['text'] = " ".join(sub['text'])
                data[str(k)] = dict(sub)
                # collection.insert_one(sub)
                k += 1
                sub = defaultdict(lambda: [])
                sub['title'] = tag.text
                sub['author'] = author
                sub['date'] = ""
            else:
                if tag.tag_name == "p":
                    sub['text'].append(tag.text)

                elif tag.tag_name == "img":
                    sub['images'].append(tag.get_attribute("src"))

        sub['text'] = " ".join(sub['text'])
        data[str(k)] = dict(sub)
        # collection.insert_one(sub)
        k += 1
    except:
        print(sys.exc_info())
        print("problem at ", ele, k)
    # data[i] = dict(obj)
    # os.system("clear")

    print("Done ", i)
print(data)

with open("mens_dump.json", 'w+') as file:
    file.write(str(data))
# data-test-id="ArticleBodyContent"
# data-test-id = "SideBySideTopper"
