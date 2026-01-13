from transformers import pipeline
import sys

classifier = pipeline(
    "audio-classification",
    model="s3prl/s3prl-deepfake-detection"
)

def check_fake_voice(audio_path):
    result = classifier(audio_path)

    label = result[0]["label"].lower()
    score = result[0]["score"]

    return {
        "is_fake": label == "spoof",
        "confidence": round(score, 2)
    }


if __name__ == "__main__":
    audio_path = sys.argv[1]
    print(check_fake_voice(audio_path))
