import os
from faster_whisper import WhisperModel

# ---------------- PATHS ----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
AUDIO_FILE = os.path.join(BASE_DIR, "audio_mono.wav")
OUTPUT_FILE = os.path.join(BASE_DIR, "transcription.txt")

# ---------------- LOAD WHISPER ----------------
model = WhisperModel(
    "small",
    device="cpu",          # change to "cuda" if GPU exists
    compute_type="float32"
)

# ---------------- TRANSCRIBE ----------------
segments, info = model.transcribe(
    AUDIO_FILE,
    language=None,         # auto-detect Hindi / English
    task="translate",      # 🔥 ALWAYS OUTPUT ENGLISH
    vad_filter=True        # 🔥 removes silence & laughter
)

# ---------------- COLLECT TEXT ----------------
text = " ".join(segment.text.strip() for segment in segments).strip()

# ---------------- HANDLE SILENCE ----------------
if not text or text in [".", "…"]:
    final_text = "No voice recorded"
else:
    final_text = text

# ---------------- SAVE OUTPUT ----------------
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(final_text)

# ---------------- PRINT RESULT ----------------
print("Detected language:", info.language)
print("Final transcription:")
print(final_text)
print("\nSaved to:", OUTPUT_FILE)
