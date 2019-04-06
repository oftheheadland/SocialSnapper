from bs4 import BeautifulSoup
import requests


# multiple example
# url = "https://twitter.com/Cernovich/status/1112424401872416768"

# nyannyan example
url = "https://twitter.com/nyannyancosplay/status/1112227719251742720"

# url = "https://twitter.com/Themya47/status/1112228193543561216"

# get contents from url
content = requests.get(url).content

# get soup
soup = BeautifulSoup(content, 'lxml')  # choose lxml parser

# find all images
image_tags = soup.findAll('img')


# print out image urls
for image_tag in image_tags:
    # print(image_tag)
    # try:
    #     if 'media' in image_tag.get('src'):
    #         print(image_tag)
    #         print(image_tag.get('src'))
    #         print()
    # except:
    #     pass
    try:
        if 'media' in image_tag.get('src'):
            print(image_tag.get('src'))
    except:
        pass
