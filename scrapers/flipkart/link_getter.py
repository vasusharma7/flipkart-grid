from selenium import webdriver
from bs4 import BeautifulSoup
import urllib.parse as urlparse
import os
import json
import requests
from urllib.parse import parse_qs

driver = webdriver.Chrome('../../../chromedriver')
#categories = ["red tshirts", "black trousers"]
categories = ["red tshirts", "black jeans"]

results = {}
for category in categories:
    url = "https://www.flipkart.com/search?q={0}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off".format(category)
    #url = "file:///data/Projects/flipkart/flipkart-gird/scrapers/flipkart/test.html"
    results[category] = []
    print(url)
    driver.get(url);
    rows = driver.find_elements_by_class_name('_3O0U0u')
    #for row in rows:
    for i in range(2):
        #columns = row.find_elements_by_class_name('_3dqZjq')
        columns = rows[i].find_elements_by_class_name('_3dqZjq')
        for column in columns:
                results[category].append(column.get_attribute('href'))

with open("links.json", 'w') as file:
    json.dump(results, file)

driver.close()

