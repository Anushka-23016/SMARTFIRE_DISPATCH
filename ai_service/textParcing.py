import spacy

nlp = spacy.load("en_core_web_sm")

def extract_keywords_from_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        text = f.read().lower()

    doc = nlp(text)

    entities = set(ent.text for ent in doc.ents)

    entity_tokens = set()
    for ent in doc.ents:
        for token in ent:
            entity_tokens.add(token.text)

    keywords = set()
    for token in doc:
        if (
            token.is_alpha
            and not token.is_stop
            and token.text not in entity_tokens
            and token.pos_ in ["NOUN", "PROPN", "NUM"]
        ):
            keywords.add(token.text)

    return list(entities.union(keywords))


if __name__ == "__main__":
    file_path = "ai_service/transcription.txt"
    keywords = extract_keywords_from_file(file_path)
    print("Keywords:", keywords)

