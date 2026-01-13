import os
import requests
import json
from faster_whisper import WhisperModel
from fakeVoiceCheck import check_fake_voice

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
AUDIO_FILE = os.path.join(BASE_DIR, "audio_mono.wav")
OUTPUT_FILE = os.path.join(BASE_DIR, "transcription.txt")


model = WhisperModel(
    "small",
    device="cpu",          # change to "cuda" if GPU exists
    compute_type="float32"
)
# -------- FAKE VOICE CHECK --------
fake_result = check_fake_voice(AUDIO_FILE)

if fake_result["is_fake"]:
    print("❌ Fake / AI-generated voice detected")
    print("Confidence:", fake_result["confidence"])

    # Optional: send fake status to backend
    requests.post(
        "http://localhost:5000/api/incident/fake",
        json={
            "voice_authenticity": "fake",
            "confidence": fake_result["confidence"]
        }
    )

    exit()  # STOP PIPELINE
else:
    print("✅ Voice verified as real")


segments, info = model.transcribe(
    AUDIO_FILE,
    language=None,         # auto-detect Hindi / English
    task="translate",     
    vad_filter=True        
)

text = " ".join(segment.text.strip() for segment in segments).strip()

if not text or text in [".", "…"]:
    final_text = "No voice recorded"
else:
    final_text = text


with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(final_text)


print("Detected language:", info.language)
print("Final transcription:")
print(final_text)
print("\nSaved to:", OUTPUT_FILE)



payload = {
    "text": final_text,
    "voice_authenticity": "real",
    "voice_confidence": fake_result["confidence"]
}


requests.post(
    "http://localhost:5000/api/incident",
    json=payload
)
