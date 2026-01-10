import os
import re
from faster_whisper import WhisperModel

# Optional Google Translate
try:
    from googletrans import Translator
    TRANSLATOR_AVAILABLE = True
except ImportError:
    TRANSLATOR_AVAILABLE = False

# ---------------- PATHS ----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
audio_file = os.path.join(BASE_DIR, "audio_mono.wav")
output_file = os.path.join(BASE_DIR, "transcription.txt")

# ---------------- LOAD WHISPER ----------------
model = WhisperModel(
    "small",
    device="cpu",       # use "cuda" if GPU is available
    compute_type="float32"
)

# ---------------- TRANSCRIBE ----------------
# Let Whisper auto-detect the language
segments, info = model.transcribe(
    audio_file,
    language=None,
    task="transcribe"
)

# ---------------- COLLECT AND CLEAN TEXT ----------------
full_text = " ".join([seg.text.strip() for seg in segments])

# Remove filler tokens (like अलो, अम, etc.)
# Keep words longer than 2 chars
cleaned_text = " ".join([word for word in full_text.split() if len(word) > 2])
# Remove short 1-2 char non-words (mostly noise)
cleaned_text = re.sub(r'\b[अ-ह]{1,2}\b', '', cleaned_text)
cleaned_text = re.sub(r'\s+', ' ', cleaned_text).strip()

# ---------------- TRANSLATE IF HINDI ----------------
if TRANSLATOR_AVAILABLE and info.language.startswith("hi"):
    translator = Translator()
    translated = translator.translate(cleaned_text, src='hi', dest='en')
    final_text = translated.text
    print("---- ENGLISH TRANSCRIPTION (from Hindi) ----")
    print(final_text)
else:
    final_text = cleaned_text
    print(f"---- TRANSCRIPTION ({info.language}) ----")
    print(final_text)

# ---------------- SAVE TO TXT ----------------
with open(output_file, "w", encoding="utf-8") as f:
    f.write(final_text.strip())

print("\nSaved to:", output_file)
print("Detected language by Whisper:", info.language)
