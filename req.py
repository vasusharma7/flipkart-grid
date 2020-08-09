import requests
import json
from bs4 import BeautifulSoup


def extract(newspaper, id):
    data = None
    k = 0
    # while data != []:
    url = 'https://www.pecanreams.com/notice_data.php?draw=4&columns%5B0%5D%5Bdata%5D=0&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=1&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=' + \
        str(k*100)+'&length=100&search%5Bvalue%5D=&search%5Bregex%5D=false&notice_type_id=0&newspaper=' + \
        str(id) + '&from_date = &to_date = &keyword ='
    data = requests.get(url)
    json_str = json.loads(data.__dict__['_content'].decode("utf-8"))
    # print(json_str['data'][0][1])
    soup = BeautifulSoup(
        str(json_str['data'][0][1]), features="html.parser")
    img = soup.a.href

    k += 1
    print(soup.prettify())


extract("", 9)
