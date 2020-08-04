from selenium import webdriver
from bs4 import BeautifulSoup
import urllib.parse as urlparse
import os
import json
import requests
import time
from urllib.parse import parse_qs
chrome_options = webdriver.ChromeOptions()
#chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
#chrome_options.add_argument('--disable-dev-shm-usage')
driver = webdriver.Chrome('../../../chromedriver', options=chrome_options)
#categories = ["red tshirts", "black trousers"]
#categories = ["red tshirts", "black jeans"]
#categories = ["Topman & Men's Trend Clothing"]
categories = ["Designer Mens"]
urls=["https://www.nordstrom.com/browse/designer/men/clothing?breadcrumb=Home%2FDesigner%2FMen%2FDesigner%20Clothing&origin=topnav"];

results = {}
#for category in categories:
for i in range(len(urls)):
 #   url = "https://www.nordstrom.com/browse/men/trend/clothing?breadcrumb=Home%2FMen%2FTopman%20%26%20Men%27s%20Trend%2FClothing"

 # https://www.nordstrom.com/browse/men/new?breadcrumb=Home%2FMen%2FNew%20Arrivals&origin=topnav
    results[categories[i]] = []
    for pageno in range(2,12):
        try:
            #url = "https://www.nordstrom.com/browse/men/trend/clothing?breadcrumb=Home%2FMen%2F" + category + "&page=" + str(pageno)
            url = urls[i]
            url = url + "&page=" + str(pageno)

            #url = "file:///data/Projects/flipkart/flipkart-gird/scrapers/flipkart/test.html"
            print(url)
            driver.get(url)
            time.sleep(2)
            items = driver.find_elements_by_class_name('QIjwE')
            #for i in range(5):
            for item in items:
                try:
                    item_elem = item.find_elements_by_class_name('_1av3_')
                    item_url = item_elem[0].get_attribute('href')
                    results[categories[i]].append(item_url)
                except:
                    print("error scraping this item")
            """
                #columns = row.find_elements_by_class_name('_3dqZjq')
                columns = rows[i].find_elements_by_class_name('_3dqZjq')
                for column in columns:
                        results[category].append(column.get_attribute('href'))
            """
        except:
            print("failecd for thispaage")

with open("nordstrom_links.json", 'w') as file:
    json.dump(results, file)

driver.close()

