import spacy

# Load the English NLP model
nlp = spacy.load("en_core_web_sm")

def extract_keywords_from_file(file_path):
    """
    Reads a transcript file and extracts keywords (nouns, proper nouns, named entities)
    """
    # Read the text from file
    with open(file_path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    doc = nlp(text.lower())
    
    # Extract nouns and proper nouns
    keywords = [token.text for token in doc if token.pos_ in ["NOUN", "PROPN"] and token.is_alpha]
    
    # Include named entities
    entities = [ent.text.lower() for ent in doc.ents]
    
    # Combine and remove duplicates
    all_keywords = list(set(keywords + entities))
    
    return all_keywords

# Example usage
file_path = "ai_service/transcription.txt"  # <-- your transcript file path
keywords = extract_keywords_from_file(file_path)

print("Keywords:", keywords)
