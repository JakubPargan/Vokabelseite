from PIL import Image
import pytesseract

def extract_text(image_path):
    text = pytesseract.image_to_string(Image.open(image_path), lang='deu')
    return text

if __name__ == "__main__":
    extracted_text = extract_text('uploads/beispielbild.jpg')
    print("Extrahierter Text:", extracted_text)
