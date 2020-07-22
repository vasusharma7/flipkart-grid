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
# username = "ubuntu"

client = MongoClient(
    "mongodb+srv://Vasu:htccg321@cluster0-miow4.mongodb.net/flipkart-grid?retryWrites=true&w=majority")

database = client["flipkart-grid"]
collection = database["blogs"]

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

URL = 'https://www.vogue.co.uk/fashion/fashion-trends'

driver.get(URL)

elements = driver.find_elements_by_xpath("//*[@data-test-id = 'Anchor']")
for _ in elements:
    print(_.get_attribute("href"))

data = {}
# elements = [
#     'file:///mnt/38EA2500EA24BC4E/VIRUS/Projects/flipkart-grid/scrapers/blog/pages/vogue/temp']
for i, ele in enumerate(elements, 1):
    # for i in range(1, 22):
    obj = defaultdict(list)
    tab.get(ele.get_attribute("href"))
    # tab.get(elements[0] + str(i) + ".html")
    obj['title'] = tab.find_element_by_xpath(
        "//h1[@data-test-id = 'Hed']").text
    obj['author'] = tab.find_element_by_xpath(
        "//*[@data-test-id='Name']").text
    obj['date'] = tab.find_element_by_tag_name("time").text
    # try:
    #     top = tab.find_element_by_xpath(
    #         "//div[@data-test-id='SideBySideTopper']")
    #     for img in top.find_elements_by_tag_name("img"):
    #         obj["images"].append(img.get_attribute(
    #             "srcset").split(",")[-1].split()[0])
    #     print(obj)
    # except:
    #     print("not found 1")
    for p in tab.find_elements_by_xpath("//*[@data-test-id= 'Paragraph']"):
        obj['content'].append(p.text)
    obj['content'] = " ".join(obj['content'])
    try:
        # main = tab.find_element_by_xpath(
        #     "//section[@data-test-id='ArticleBodyContent']")
        # for img in tab.find_elements_by_tag_name("img"):
        #     # print(len(img))
        #     imgs = None
        #     try:
        #         imgs = img.get_attribute("srcset").split(",")[-1].split()[0]
        #         time.sleep(1)
        #     except:
        #         print("error")
        #         pass
        #     if not imgs:
        #         imgs = img.get_attribute("src")
        #     obj["images"].append(imgs)

        for img in tab.find_elements_by_xpath("//*[@data-test-id='Img']"):
            print(img)
            imgs = None
            try:
                imgs = img.get_attribute("srcset").split(",")[-1].split()[0]
                print(img)
                time.sleep(1)
            except:
                print("error")
                pass
            if not imgs:
                imgs = img.get_attribute("src")
            obj["images"].append(imgs)

        print(obj)
    except:
        print("not found 2")
    obj['source'] = "Vogue"
    # collection.insert_one(obj)

    data[str(i)] = dict(obj)
    # os.system("clear")
    print("Done ", i)
print(data)
with open("blog_dump.json", 'w+') as file:
    file.write(str(data))
# data-test-id="ArticleBodyContent"
# data-test-id = "SideBySideTopper"
