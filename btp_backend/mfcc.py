import os
#import amfm_decompy.pYAAPT as pYAAPT
#import amfm_decompy.basic_tools as basic
#from matplotlib import pyplot as plt
from pydub import AudioSegment
import librosa
import speechpy
import scipy.io.wavfile as wavy
import csv
import numpy as np
import pandas as pd 
from python_speech_features import mfcc
from python_speech_features import logfbank
import seaborn as sns
from python_speech_features import delta
from numpy import savetxt

file_path = "./Audio_Files/."
data=[]
folder=os.listdir(file_path)
final_feat=[]
final_lab=[]

for file in folder:
    wav=file_path+'/'+file
    newAudio = AudioSegment.from_wav(wav)
    #(rate,sig) = wavy.read(wav)
    #feat = mfcc(sig,rate,numcep=13,nfilt=40,preemph=0.97)
    fs, signal = wavy.read(wav)
    feat = speechpy.feature.mfcc(signal, sampling_frequency=fs, frame_length=0.025, frame_stride=0.01, num_filters=40, fft_length=512, low_frequency=0, high_frequency=None)
    final_feat.append(feat)
