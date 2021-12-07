import os
from pydub import AudioSegment
import speechpy
import scipy.io.wavfile as wavy
import numpy as np
import pandas as pd 
from python_speech_features import mfcc
from python_speech_features import logfbank
from python_speech_features import delta
from numpy import savetxt
import scipy.signal as sps

# import tensorflow as tf
# from tensorflow import keras
# from tensorflow.keras.models import load_model

def correction(mat):
    correct_mat=[]
    for i in mat:
        v=[]
        for j in i:
            v.append(j[0])
        correct_mat.append(v)
    return correct_mat


def extract_features(file_loc): 
    (fs,signal) = wavy.read(file_loc)
    # req_sample_rate=fs
    signal= np.asarray([p[0] for p in signal])
    print(file_loc)
    req_sample_rate=8000
    number_of_samples = round(len(signal) * float(req_sample_rate)/ fs)
    #signal = sps.resample(signal, number_of_samples)
    print(signal)
    feat = speechpy.feature.mfcc(signal, sampling_frequency=req_sample_rate, frame_length=0.025, frame_stride=0.01, num_filters=40, fft_length=512, low_frequency=0, high_frequency=None)   
    print(fs)
    mfcc_d = delta(feat,1)
    mfcc_dd = delta(mfcc_d,1)
    final_feat = np.concatenate((feat,mfcc_d,mfcc_dd),axis=1)
    
    print(len(final_feat[0]))
    # final_feat=correction(final_feat)
    print(final_feat)
    a,b = np.shape(final_feat)
    final_feat = np.reshape(final_feat,(a,b,1))
    # final_feat=np.mean(final_feat,axis=0)
    y=np.asarray([0]*len(final_feat)).T
    # y=0
    return final_feat,y

