# -*- coding: utf-8 -*-
"""grid-model-2.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1szd-HLQXiawZvAVtkfhcmmAJqvNahGN3
"""

# Commented out IPython magic to ensure Python compatibility.
# %cd drive/My\ Drive/
!mkdir model2data
!cd model2data

!pip install dnspython

import requests
from pymongo import  MongoClient
conn = MongoClient("mongodb+srv://Vasu:htccg321@cluster0-miow4.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true")

db = conn['flipkart-grid']

!rm -rf trending -r
!mkdir trending

def download_image(pic_url, handle,id):
      img_data = requests.get(pic_url).content
      with open('./trending/{0}_{1}.jpg'.format(handle,id), 'wb') as handler:
          handler.write(img_data)

k = 0
for name in db.collection_names(include_system_collections=False):
  collection = db[name]
  docs = collection.find({})
  # print(docs)
  for doc in docs:
    if 'images' in doc.keys() and doc['images'] != []:
      for image in doc['images']:
        print(image)
        download_image(image,name,k)
        k += 1

    elif 'media_urls' in doc.keys() and doc['media_urls'] != []:
      for image in doc['media_urls']:
        print(image)
        download_image(image,name,k)
        k += 1

"""#Instance Segmentaion using Masked CNN"""

import requests
data = requests.get("https://www.kaggleusercontent.com/kf/14533916/eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..KRziOq_YXNRvuaLUppZ3yA.7ItepuqMXYqZBu70s9GBqG2-ZObZIBt5_Fu6Pe72mdRBfQiG8AaQZULdyz5KbtTdbEhDHBzAbgkrjR8dHpBH6npVwVqIEjRrMz7vU1ALB_2fETW9PxZPOBU60FedwcsKjPwHNWR9twpK5chxdWmXt6E_ddIK_1eyXmhlEU_8IyPoKlugAObpmthpXs_vZlFKYBjIUfaWA3WHsJJAGGfJNpwGToWNC-bL1TmNku9ZNuC-oILXwPz69DQVWvSBVMcNf6X7uxXNQhdiocIdiWcXqaBAJeMqMCp3G2N14M2x6cIGHDIKo5WHNsGy8q257q2E3TIDycNRh-67fgJQjPOQvzOtyl1R-snVe42vHhVjxFx6CtTlOk3AoUpdr53ps0EVRW0IjACy84KOYSNyz2z2MTdS3f4UJSUlfmxgboqyMYsXYd_5-xIhQpnI4enMtdCjeNINevk8Vqo5wMjXiOrqDapXep-uiSZeZQNyW18hCUb-msZKhgcn2L1VrCE9p0npu09YqhhqqBKje9_0FSHOsna4ey7qbi8vjygAzDD4v9DPJiVBeH8TGXtwyfItOiYg4VaPsRdlHHC65NjxempzoNSETxedLjUB2538sdAroaEGPPBw2qA6HZMRwhjZ4x9c_9TZX4QnnSbgTkIc-_sqfScGGYPZ5OTtp4YIIFvUtq4.7eCjkQXZETJYYe6QDasGQw/fashion20190522T1516/mask_rcnn_fashion_0007.h5").content
with open("mask_rcnn_fashion_0007.h5","wb") as file:
  file.write(data)

# Commented out IPython magic to ensure Python compatibility.
# %cd /content/

!mkdir drive/My\ Drive/instance_segmentation

# Commented out IPython magic to ensure Python compatibility.
# %cp mask_rcnn_fashion_0007.h5 drive/My\ Drive/

# Commented out IPython magic to ensure Python compatibility.
# %cd drive/My\ Drive/instance_segmentation

import os
!git clone https://www.github.com/matterport/Mask_RCNN.git
os.chdir('Mask_RCNN')

!rm -rf .git # to prevent an error when the kernel is committed
!rm -rf images assets # to prevent displaying images at the bottom of a kernel

# !wget --quiet https://github.com/matterport/Mask_RCNN/releases/download/v2.0/mask_rcnn_coco.h5
# !ls -lh mask_rcnn_coco.h5

# COCO_WEIGHTS_PATH = 'mask_rcnn_coco.h5'

!pip3 install -r requirements.txt

# import os
# os.chdir("Mask_RCNN")
from mrcnn.config import Config
from mrcnn import utils
import mrcnn.model as modellib
from mrcnn import visualize



model_path = "../mask_rcnn_fashion_0007.h5"

IMAGE_SIZE = 512
NUM_CATS = 46
class FashionConfig(Config):
    NAME = "fashion"
    NUM_CLASSES = NUM_CATS + 1 # +1 for the background class
    
    GPU_COUNT = 1
    IMAGES_PER_GPU = 4 # a memory error occurs when IMAGES_PER_GPU is too high
    
    BACKBONE = 'resnet50'
    
    IMAGE_MIN_DIM = IMAGE_SIZE
    IMAGE_MAX_DIM = IMAGE_SIZE    
    IMAGE_RESIZE_MODE = 'none'
    
    RPN_ANCHOR_SCALES = (16, 32, 64, 128, 256)
    #DETECTION_NMS_THRESHOLD = 0.0
    
    # STEPS_PER_EPOCH should be the number of instances 
    # divided by (GPU_COUNT*IMAGES_PER_GPU), and so should VALIDATION_STEPS;
    # however, due to the time limit, I set them so that this kernel can be run in 9 hours
    STEPS_PER_EPOCH = 1000
    VALIDATION_STEPS = 200
    
# config = FashionConfig()
# config.display()

class InferenceConfig(FashionConfig):
    GPU_COUNT = 1
    IMAGES_PER_GPU = 1

inference_config = InferenceConfig()

model = modellib.MaskRCNN(mode='inference', 
                          config=inference_config,
                          model_dir="../")

# assert model_path != '', "Provide path to trained weights"
print("Loading weights from ", model_path)
model.load_weights(model_path, by_name=True)

def resize_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (IMAGE_SIZE, IMAGE_SIZE), interpolation=cv2.INTER_AREA)  
    return img

import numpy as np
def refine_masks(masks, rois):
    areas = np.sum(masks.reshape(-1, masks.shape[-1]), axis=0)
    mask_index = np.argsort(areas)
    union_mask = np.zeros(masks.shape[:-1], dtype=bool)
    for m in mask_index:
        masks[:, :, m] = np.logical_and(masks[:, :, m], np.logical_not(union_mask))
        union_mask = np.logical_or(masks[:, :, m], union_mask)
    for m in range(masks.shape[-1]):
        mask_pos = np.where(masks[:, :, m]==True)
        if np.any(mask_pos):
            y1, x1 = np.min(mask_pos, axis=1)
            y2, x2 = np.max(mask_pos, axis=1)
            rois[m, :] = [y1, x1, y2, x2]
    return masks, rois

import json
with open("label_descriptions.json") as f:
    label_descriptions = json.load(f)

label_names = [x['name'] for x in label_descriptions['categories']]

import cv2
import numpy as np
# for i in range(9):
    # image_id = sample_df.sample()['ImageId'].values[0]
image = "blogs_12.jpg"
image_path = str("../../trending/{}".format(image))

img = cv2.imread(image_path)
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

result = model.detect([resize_image(image_path)])
r = result[0]

if r['masks'].size > 0:
    masks = np.zeros((img.shape[0], img.shape[1], r['masks'].shape[-1]), dtype=np.uint8)
    for m in range(r['masks'].shape[-1]):
        masks[:, :, m] = cv2.resize(r['masks'][:, :, m].astype('uint8'), 
                                    (img.shape[1], img.shape[0]), interpolation=cv2.INTER_NEAREST)
    
    y_scale = img.shape[0]/IMAGE_SIZE
    x_scale = img.shape[1]/IMAGE_SIZE
    rois = (r['rois'] * [y_scale, x_scale, y_scale, x_scale]).astype(int)
    
    masks, rois = refine_masks(masks, rois)
else:
    masks, rois = r['masks'], r['rois']
  

# print(roi_ext)
visualize.display_instances(img, rois, masks, r['class_ids'], 
                            ['bg']+label_names, r['scores'],
                            title=image, figsize=(12, 12))
# print(rois)

# img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
from google.colab.patches import cv2_imshow
mx = -1
max_area = 0
print(rois)
for i in range(len(rois)):
  y1,x1,y2,x2 = rois[i]
  area = abs((y2-y1)*(x2-x1))
  if area > max_area:
    max_area = area
    mx = i

y1,x1,y2,x2 = rois[mx]
# print(img.shape,rois[0])
roi_ext = img[y1:y2,x1:x2]
# print(roi_ext)
resized_image = cv2.resize(roi_ext, (256,256), interpolation = cv2.INTER_AREA)
cv2_imshow(resized_image)
resized_image = cv2.resize(img, (256,256), interpolation = cv2.INTER_AREA)
cv2_imshow(resized_image)

!pip install tensorflow==1.14.0
!pip install keras==2.2.0

# Commented out IPython magic to ensure Python compatibility.
# %cd drive/My\ Drive

# Commented out IPython magic to ensure Python compatibility.
# %mkdir non_trending
!cp flipkart/data/trending\ dress/* ./non_trending
!cp flipkart/data/trending\ jeans/* ./non_trending
!cp flipkart/data/trending\ suits/* ./non_trending
!cp flipkart/data/trending\ t-shirts/* ./non_trending

!cp nordstorm/data/Designer\ Mens/* ./trending
!cp nordstorm/data/New\ Arrivals/* ./trending

!cp flipkart/data/trending\ tshirts/* ./non_trending



"""## Model for predicting Trends"""



# USAGE
# python train_mask_detector.py --dataset dataset

# import the necessary packages
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.layers import AveragePooling2D
from tensorflow.keras.layers import Dropout
from tensorflow.keras.layers import Flatten
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import Input
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.utils import to_categorical
from sklearn.preprocessing import LabelBinarizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from imutils import paths
import matplotlib.pyplot as plt
import numpy as np
import argparse
import os

INIT_LR = 1e-4
EPOCHS = 20
BS = 32


imagePaths = list(paths.list_images("./trend_prediction_data"))
data = []
labels = []
k = 0
# loop over the image paths

for imagePath in imagePaths:
  try:
    label = imagePath.split(os.path.sep)[-2]
    # load the input image (224x224) and preprocess it
    image = load_img(imagePath, target_size=(224, 224))
    image = img_to_array(image)
    image = preprocess_input(image)

    # update the data and labels lists, respectively
    data.append(image)
    labels.append(label)
  except:
    print(imagePath)

# convert the data and labels to NumPy arrays
data = np.array(data, dtype="float32")
labels = np.array(labels)

# perform one-hot encoding on the labels
lb = LabelBinarizer()
labels = lb.fit_transform(labels)
labels = to_categorical(labels)

# partition the data into training and testing splits using 75% of
# the data for training and the remaining 25% for testing
(trainX, testX, trainY, testY) = train_test_split(data, labels,
	test_size=0.20, stratify=labels, random_state=42)

# construct the training image generator for data augmentation
aug = ImageDataGenerator(
	rotation_range=20,
	zoom_range=0.15,
	width_shift_range=0.2,
	height_shift_range=0.2,
	shear_range=0.15,
	horizontal_flip=True,
	fill_mode="nearest")

# load the MobileNetV2 network, ensuring the head FC layer sets are
# left off
baseModel = ResNet50(weights="imagenet", include_top=False,
	input_tensor=Input(shape=(224, 224, 3)))

# construct the head of the model that will be placed on top of the
# the base model
headModel = baseModel.output
headModel = AveragePooling2D(pool_size=(7, 7))(headModel)
headModel = Flatten(name="flatten")(headModel)
headModel = Dense(128, activation="relu")(headModel)
headModel = Dropout(0.5)(headModel)
headModel = Dense(2, activation="softmax")(headModel)

# place the head FC model on top of the base model (this will become
# the actual model we will train)
model = Model(inputs=baseModel.input, outputs=headModel)

# loop over all layers in the base model and freeze them so they will
# *not* be updated during the first training process
for layer in baseModel.layers:
	layer.trainable = False

# place the head FC model on top of the base model (this will become
# the actual model we will train)
model = Model(inputs=baseModel.input, outputs=headModel)

# loop over all layers in the base model and freeze them so they will
# *not* be updated during the first training process
for layer in baseModel.layers:
	layer.trainable = False

# compile our model
print("[INFO] compiling model...")
opt = Adam(lr=INIT_LR, decay=INIT_LR / EPOCHS)
model.compile(loss="binary_crossentropy", optimizer=opt,
	metrics=["accuracy"])

# train the head of the network
print("[INFO] training head...")
H = model.fit(
	aug.flow(trainX, trainY, batch_size=BS),
	steps_per_epoch=len(trainX) // BS,
	validation_data=(testX, testY),
	validation_steps=len(testX) // BS,
	epochs=EPOCHS)

# make predictions on the testing set
print("[INFO] evaluating network...")
predIdxs = model.predict(testX, batch_size=BS)

# for each image in the testing set we need to find the index of the
# label with corresponding largest predicted probability
predIdxs = np.argmax(predIdxs, axis=1)

# show a nicely formatted classification report
print(classification_report(testY.argmax(axis=1), predIdxs,
	target_names=lb.classes_))

# serialize the model to disk
print("[INFO] saving mask detector model...")
model.save("trend.model", save_format="h5")

# plot the training loss and accuracy
N = EPOCHS
plt.style.use("ggplot")
plt.figure()
plt.plot(np.arange(0, N), H.history["loss"], label="train_loss")
plt.plot(np.arange(0, N), H.history["val_loss"], label="val_loss")
plt.plot(np.arange(0, N), H.history["accuracy"], label="train_acc")
plt.plot(np.arange(0, N), H.history["val_accuracy"], label="val_acc")
plt.title("Training Loss and Accuracy")
plt.xlabel("Epoch #")
plt.ylabel("Loss/Accuracy")
plt.legend(loc="lower left")
plt.savefig("plot_trend.png")

labels = ['mask','non-mask']
labels = np.array(labels)
print(labels)
# perform one-hot encoding on the labels
lb = LabelBinarizer()
labels = lb.fit_transform(labels)
print(labels)
labels = to_categorical(labels)
print(labels)

