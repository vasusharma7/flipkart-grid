from selenium import webdriver
import time
import urllib.request
import os
from selenium.webdriver.common.keys import Keys

browser = webdriver.Chrome('../../../chromedriver')
browser.get('https://www.google.com/search?q=red+tshirt&authuser=0&sxsrf=ALeKk01QekdHQIfFGkxvh4O8qPJ7oXAFsw:1595389554883&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiNzcmd-d_qAhVKyzgGHVyHBAYQ_AUoAXoECAwQAw&biw=1364&bih=578')

try:
    os.mkdir("downloads")
except:
    print("Error creating downloads")

"""
value = 0
browser.execute_script("scrollBy(" + str(value) + ", +1000);")
value += 1000
time.sleep(3)
"""

elem1 = browser.find_elements_by_class_name('islir')
print(elem1)
# for elem in  elem1:
num = 0
for i in range(4):
    num = num + 1
    try:
        sub = elem1[i].find_elements_by_tag_name('img')
        print(sub)
    except:
        print(elem1[i].text)
        print("No element found")
        continue

    #count = 5
    for j in sub:
        src = j.get_attribute('src')
        try:
            if src != None:
                src = str(src)
                print(src)
                urllib.request.urlretrieve(src, os.path.join(
                    'downloads', 'image' + str(num) + '.jpg'))
            else:
                raise TypeError
        except:
            print('failed for current url')
