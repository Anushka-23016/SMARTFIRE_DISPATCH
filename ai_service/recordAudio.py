import sounddevice as sd
from scipy.io.wavfile import write

fs = 16000  # Sample rate
seconds = 8 # Duration of recording

print("Recording started... Speak now!")
audio = sd.rec(int(seconds * fs), samplerate=fs, channels=1, dtype='int16')
sd.wait()  # Wait until recording is finished

write("audio.wav", fs, audio)  # Save as WAV file
print("Recording saved as audio.wav (mono, 16kHz)")

