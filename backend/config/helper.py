import numpy as np
from PIL import Image
import pytesseract
import cv2
import matplotlib.pyplot as plt
import re
import os
import random
import jwt

#from apps.users.models import User
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from rest_framework.request import Request
from config import settings
import pyqrcode
import json

def generate_qr_code(info_json, directory_to_upload,filename_to_save):
    file_to_save = os.path.join(directory_to_upload,filename_to_save)+'.png'
    qr = pyqrcode.create(json.dumps(info_json))
    qr.png(file_to_save, scale=6)


def image_to_text(image_path):
	pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'
	os.environ['TESSDATA_PREFIX'] = '/usr/share/tesseract-ocr/5/tessdata/'
	image = Image.open(image_path)
	image_arr = np.asarray(image)
	gray_image = cv2.cvtColor(image_arr, cv2.COLOR_RGB2GRAY)
	denoised_image = cv2.fastNlMeansDenoising(gray_image, None, 30, 7, 21)
	adaptive_thresh_image = cv2.adaptiveThreshold(
	    denoised_image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
	)
	text = pytesseract.image_to_string(adaptive_thresh_image, lang='fra')
	return text

def face_recognition_save(image_path, directory_to_save, filename_to_save):
    image = cv2.imread(image_path)
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    face_classifier = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    
    faces = face_classifier.detectMultiScale(gray_image, scaleFactor=1.1, minNeighbors=5, minSize=(40, 40))

    if len(faces) > 0:
        (x, y, w, h) = faces[0]
        _, binary_image = cv2.threshold(gray_image, 128, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
        contours, _ = cv2.findContours(binary_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        for contour in contours:
            x_c, y_c, w_c, h_c = cv2.boundingRect(contour)
            
            if x >= x_c and y >= y_c and x + w <= x_c + w_c and y + h <= y_c + h_c:
                cropped_image = image[y_c:y_c + h_c, x_c:x_c + w_c]
                output_path = os.path.join(directory_to_save, filename_to_save)
                cv2.imwrite(output_path, cropped_image)
                return filename_to_save
        return False
    return False


def random_int(lower_bound,upper_bound):
	return random.randint(lower_bound, upper_bound)

def get_user(token):
    try:
        user_id = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.SIMPLE_JWT['ALGORITHM']])['user_id']
    except jwt.exceptions.DecodeError:
        return AnonymousUser()
    except jwt.ExpiredSignatureError:
        return AnonymousUser()
    try:
        return AnonymousUser() if user_id is None else User.objects.get(id=user_id)
    except User.DoesNotExist:
        return AnonymousUser()