from email.mime import image
import os
from time import sleep
import requests
import io 
import cv2
from matplotlib import pyplot as plt
from dotenv import load_dotenv

load_dotenv()

def send_image(array):
    buf = io.BytesIO()
    plt.imsave(buf, array, format='jpg')
    image_data = buf.getvalue()
    url = 'http://localhost:3000'
    files = {'photo': image_data}
    headers = {'token': os.environ['SECRET']}
    data = {'text': 'Hola'}
    requests.post(url, files=files, data=data, headers=headers)

cap = cv2.VideoCapture(0)
sleep(1)
ret, frame = cap.read()
send_image(frame)