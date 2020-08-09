# Fashion Intelligence System 

## Introduction
This fashion intelligent system was developed by Vasu Sharma and Pranav Joglekar as part of Flipkart Data Grind 2020. The aim of this system is to help fashion retailers in designing and identifying trend-setting and best selling products.

## Design
This system is broken down into 3 important parts:

### Scrapers
* Used to scrape data from various fashion sites. Currently sites which are scraped include Google Images, Duck Duck go, Flipkart, Nordstrom, blogs like vogue & trending tweets from twitter.  
* All this raw scraped data is currently stored on Drive, with links to it being stored on an Atlas database
* These scrapers are designed to run automatically after a fixed amount of time, so that fresh trending data is always being scraped
* Implemented using libraries like selenium, bs4 etc in python.
### Models
* Our solution consists of 2 Models. The first model is the colour and category detection model which takes an image as input and helps in determining the type of clothing(Tshirt, trousers) and the colour of the clothing. 
	* Knowing the type of clothing helps in classifying the clothes, and since this is based on images, the internal category name given to the object does not hamper with our classification(E.g. the site may be classifying tshirts as T-shirts, but this does not affect the image detection model, it will classify all tshirt data into the 'tshirt' category)
	* Knowing the colour of the model helps in preprocessing the image before passing it to the trendiness detection model. This is done using OpenCV techniques like colour detection, image segmentation, face detection. Using these techniques, during preprocessing, the backgrounds are removed and the image is cropped to just the object of interest.
* The second model is the one used to find trending products. This is done by assigning a score( Trendiness score) to each product. The products with a high score have a higher chance of being in trend. The model takes these parameters as input to determine the trendiness score:
	* Preprocessed image
	* Date when product was released/scraped
	* No of likes/Ratings/ views
	* No of sites referring this product
	* Comments/Reviews

### Web Application
* Consists of a client-server application in MERN. The client side, built in react will be used by fashion retailers to get access to the latest scraped / processed data. Express server is used to connect the frontend to the MongoDB database.
* Along with data access, some other actions that can be performed by retailers, which will help them in developing the best product are:-
	 * Ability to change the colours/shade of a garment to view how it looks in different colours
	 * Ability to drag and drop the clothes on a virtual human model to view how these clothes look on humans

## Datasets
Scraped Data(till today): https://drive.google.com/drive/u/1/folders/134GDKE7i0MdBYcIyab3mKH6LdxFl-ci0

Processed Scraped Data: https://drive.google.com/drive/u/1/folders/134GDKE7i0MdBYcIyab3mKH6LdxFl-ci0
