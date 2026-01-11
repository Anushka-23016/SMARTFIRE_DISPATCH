import os
import json
import numpy as np
from sentence_transformers import SentenceTransformer

# ---------------- PATHS ----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
text_file = os.path.join(BASE_DIR, "transcription.txt")

# ---------------- LOAD MODEL ----------------
model = SentenceTransformer("all-MiniLM-L6-v2")

# ---------------- READ TEXT ----------------
with open(text_file, "r", encoding="utf-8") as f:
    text = f.read().strip()

if not text:
    print("No voice recorded")
    exit()

# ---------------- GENERATE EMBEDDING ----------------
embedding = model.encode(text)

# ---------------- CONVERT FOR BACKEND ----------------
embedding_list = embedding.tolist()

payload = {
    "text": text,
    "embedding": embedding_list
}

# ---------------- SAVE JSON ----------------
output_path = os.path.join(BASE_DIR, "embedding_payload.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(payload, f)

print("Embedding payload ready for backend")
print("Saved to:", output_path)
