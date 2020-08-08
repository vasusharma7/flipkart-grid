import cv2
from base64 import b64encode
import numpy as np
import urllib

#img = cv2.imread("./example_images/red_tshirt.jpg", cv2.IMREAD_COLOR)
def changeColour(inp_color):
    inp_color = "red"
    inp_dir = "./example_images/"
    inp_name = "red_tshirt"
    inp_extension = ".jpg"

    inp_file = inp_dir + inp_name + inp_extension

    out_color = "blue" # None to just crop the picture
    out_dir = "./output/"
    out_name = inp_name + "_out"
    out_extension = inp_extension

    out_file_cut = out_dir + out_name + out_extension
    out_file_changed = out_dir + out_name + "_to_" + out_color + out_extension

    im = cv2.imread(inp_file, 1)
    hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV)

    """
# lower mask (0-10)
    lower_red = np.array([0,50,50])
    upper_red = np.array([10,255,255])
    mask0 = cv2.inRange(hsv, lower_red, upper_red)

# upper mask (170-180)
    lower_red = np.array([170,50,50])
    upper_red = np.array([180,255,255])
    mask1 = cv2.inRange(hsv, lower_red, upper_red)

# join my masks
    mask = mask0+mask1

# set my output img to zero everywhere except my mask
    output_img = hsv.copy()
    output_img[np.where(mask==0)] = 0
    """

    if(inp_color == "red"):
        lower = np.array([155,25,0])
        upper = np.array([179,255,255])
    if(inp_color == "black"):
        lower = np.array([0,0,0])
        upper = np.array([180, 255, 50])

    if(inp_color == "blue"):
        lower = np.array([94, 80, 2])
        upper = np.array([126, 255, 255])

    if(inp_color == "green"):
        lower = np.array([25, 52, 72])
        upper = np.array([102, 255, 255])

    mask = cv2.inRange(hsv, lower, upper)
    output_img = im.copy()

#output_img = cv2.bitwise_and(output_img, output_img, mask=mask)
    output_img[np.where(mask==0)] = [0]
    changed_img = output_img.copy()

    if(inp_color != "none"):
        changed_img[np.where(mask != 0)] = [255, 0, 0]

    #cv2.imshow('result', output_img)
    cv2.waitKey(0)# This closes all open windows 
    cv2.imwrite(out_file_cut, output_img)
    cv2.imwrite(out_file_changed, changed_img)
    """
    print(im.shape) # (830, 1245, 3)# Let's print each dimension of the image
    print('Height of Image:', int(im.shape[0]), 'pixels')
    print('Width of Image: ', int(im.shape[1]), 'pixels')# save images
# lower mask (0-10)
    lower_red = np.array([0,50,50])
    upper_red = np.array([10,255,255])
    mask0 = cv2.inRange(hsv, lower_red, upper_red)
# upper mask (170-180)
    lower_red = np.array([170,50,50])
    upper_red = np.array([180,255,255])
    mask1 = cv2.inRange(hsv, lower_red, upper_red)

# join my masks
    mask = mask0+mask1

# set my output img to zero everywhere except my mask
    output_img = hsv.copy()
    output_img[np.where(mask==0)] = 0
    """

def changeColourAPI(img, inp_colour, out_colour):
    #inp_color = "red"
    inp_dir = "./example_images/"
    inp_name = "red_tshirt"
    inp_extension = ".jpg"

    inp_file = inp_dir + inp_name + inp_extension

    out_color = "blue" # None to just crop the picture
    out_dir = "./output/"
    out_name = inp_name + "_out"
    out_extension = inp_extension

    out_file_cut = out_dir + out_name + out_extension
    out_file_changed = out_dir + out_name + "_to_" + out_color + out_extension

    im = cv2.imread(inp_file, 1)

    req = urllib.request.urlopen(img)
    arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
    im = cv2.imdecode(arr, -1) 

    hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV)

    """
# lower mask (0-10)
    lower_red = np.array([0,50,50])
    upper_red = np.array([10,255,255])
    mask0 = cv2.inRange(hsv, lower_red, upper_red)

# upper mask (170-180)
    lower_red = np.array([170,50,50])
    upper_red = np.array([180,255,255])
    mask1 = cv2.inRange(hsv, lower_red, upper_red)

# join my masks
    mask = mask0+mask1

# set my output img to zero everywhere except my mask
    output_img = hsv.copy()
    output_img[np.where(mask==0)] = 0
    """

    if(inp_colour == "red"):
        lower = np.array([155,25,0])
        upper = np.array([179,255,255])

    if(inp_colour == "black"):
        lower = np.array([0,0,0])
        upper = np.array([180, 255, 50])

    if(inp_colour == "blue"):
        lower = np.array([94, 80, 2])
        upper = np.array([126, 255, 255])

    if(inp_colour == "green"):
        lower = np.array([25, 52, 72])
        upper = np.array([102, 255, 255])

    if(out_colour == "blue"):
        out = [255, 0, 0]

    if(out_colour == "red"):
        out = [0, 0, 255]

    if(out_colour == "green"):
        out = [40, 230, 40]

    mask = cv2.inRange(hsv, lower, upper)
    output_img = im.copy()

#output_img = cv2.bitwise_and(output_img, output_img, mask=mask)
    output_img[np.where(mask==0)] = [0]
    changed_img = output_img.copy()

    if(out_colour != "none"):
        changed_img[np.where(mask != 0)] = out

    #cv2.imwrite(out_file_cut, output_img)
    #cv2.imwrite(out_file_changed, changed_img)
    _, im_arr = cv2.imencode('.jpg', changed_img)  # im_arr: image in Numpy one-dim array format.
    im_bytes = im_arr.tobytes()
    im_b64 = b64encode(im_bytes)
    return im_b64;
    """
    print(im.shape) # (830, 1245, 3)# Let's print each dimension of the image
    print('Height of Image:', int(im.shape[0]), 'pixels')
    print('Width of Image: ', int(im.shape[1]), 'pixels')# save images
# lower mask (0-10)
    lower_red = np.array([0,50,50])
    upper_red = np.array([10,255,255])
    mask0 = cv2.inRange(hsv, lower_red, upper_red)
# upper mask (170-180)
    lower_red = np.array([170,50,50])
    upper_red = np.array([180,255,255])
    mask1 = cv2.inRange(hsv, lower_red, upper_red)

# join my masks
    mask = mask0+mask1

# set my output img to zero everywhere except my mask
    output_img = hsv.copy()
    output_img[np.where(mask==0)] = 0
    """
