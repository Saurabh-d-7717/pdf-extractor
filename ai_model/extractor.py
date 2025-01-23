import sys
import json
import fitz 
import re

def extract_text(file_path):
    document = fitz.open(file_path)
    text = ""
    for page in document:
        text += page.get_text()
    return text

def extract_details(text):
    details = {}
    
    phone_regex = r"\+\d{1,3}\s?\(?\d{3}\)?\s?\d{3}-?\d{4}"
    name_regex = r"Name\s*:\s*(.*)"
    address_regex = r"Address\s*:\s*(.*)"
    role_regex = r"Role\s*:\s*(.*)"  

    
    phone_match = re.search(phone_regex, text)
    name_match = re.search(name_regex, text)
    address_match = re.search(address_regex, text)
    role_match = re.search(role_regex, text)  

    if phone_match:
        details['Phone'] = phone_match.group(0)
    if name_match:
        details['Name'] = name_match.group(1)
    if address_match:
        details['Address'] = address_match.group(1)
    if role_match:
        details['Role'] = role_match.group(1)  

    return details

def main(file_path):
    text = extract_text(file_path)
    details = extract_details(text)
    print(json.dumps(details))  

if __name__ == "__main__":
    file_path = sys.argv[1]  
    main(file_path)
