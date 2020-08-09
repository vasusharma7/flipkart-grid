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
import time
from urllib.parse import parse_qs
driver = webdriver.Chrome('../../../chromedriver')

def getSimilarProducts(product_looks):
    similar_products = []
    for product in product_looks:
        url = product.get_attribute('href')
        parsed = urlparse.urlparse(url)
        urlpath = parsed.path
        url_path_array = urlpath.split('/')
        similar_products.append(url_path_array[2])
    return similar_products

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

#category="Topman & Men's Trend Clothing"
url = "https://www.nordstrom.com/s/comme-des-garcons-play-cotton-jersey-crewneck-t-shirt/4316766?origin=category-personalizedsort&breadcrumb=Home%2FMen%2FTopman%20%26%20Men%27s%20Trend%2FClothing&color=black%201"

with open("nordstrom_links.json", 'r') as file:
    inp = json.load(file);

extraction = {}
for category in inp:
    extraction[category] = []
    products = inp[category]
    for product in products:
    #for i in range(1):
        #url = products[i]
        url = product
        #print(url)
        parsed = urlparse.urlparse(url)

        urlpath = parsed.path
        url_path_array = urlpath.split('/')

        pid = url_path_array[3]
        print(pid)

        stars = ''
        ratings = ''
        price = ''
        images = []
        product_name = ""
        product_brand = ""
        product_description = ""
        product_details = ""
        no_of_people_viewing = ""
        product_looks = []

        driver.get(url);
        time.sleep(10)

#get the element containing stars
        stars = driver.find_elements_by_class_name('bqXGTW')

#get the element containing rating
        rating = driver.find_elements_by_class_name('a0xpF')

#get the element containing price 
        try:
            price = driver.find_element_by_id('current-price-string')
        except:
            print('no price found')

#get the image url
        imageUrls = []
        images_li = driver.find_elements_by_class_name('BIgNz')
        for images in images_li:
            imageUrls.append(images.find_elements_by_class_name('_3fwsO')[0].get_attribute('src'))

        download_image(imageUrls, category, pid)

#get the product name
        product_name = driver.find_elements_by_class_name('_2OMMP')

#get the product brand 
        product_brand = driver.find_elements_by_class_name('_1i-_6')

#get the product description 
        try:
            product_description = driver.find_element_by_id('product-page-selling-statement')
        except:
            print('product descriptinn not found')

#get the product details 
        product_details = driver.find_elements_by_class_name('_1D4Qk')

#get the no of people viewing 
        try:
            no_of_people_viewing_elem = driver.find_elements_by_class_name('_18pI8')
            no_of_people_viewing = no_of_people_viewing_elem[0].find_elements_by_tag_name('strong')
        except:
            print('num of people viewing not found')

#get the product looks
        product_looks = driver.find_elements_by_class_name('_2_ZZl')


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
            obj['rating'] = rating[1].text
        except:
            obj['rating'] = None

        try:
            obj['price'] = price.text
        except:
            obj['price'] = None

        try:
            obj['product_name'] = product_name[0].text
        except:
            obj['product_name'] = None

        try:
            obj['product_brand'] = product_brand[0].text
        except:
            obj['product_brand'] = None

        try:
            obj['product_description'] = product_description.text
        except:
            obj['product_description'] = None

        try:
            obj['product_details'] = product_details[0].text
        except:
            obj['product_details'] = None

        try:
            obj['no_of_people_viewing'] = no_of_people_viewing[0].text
        except:
            obj['no_of_people_viewing'] = None

        try:
            obj['product_looks'] = getSimilarProducts(product_looks)
        except:
            obj['product_looks'] = None

        extraction[category].append(obj)
        print(pid)
        print(obj['stars'])
        print(obj['rating'])
        print(obj['price'])
        print(imageUrls)


with open("dump.json", 'a') as file:
    json.dump(extraction, file)

driver.quit()
"""
content = driver.page_source
soup = BeautifulSoup(content)
stars = content.find('div', attrs={'class':'hGSR34'})
print(stars)
"""


