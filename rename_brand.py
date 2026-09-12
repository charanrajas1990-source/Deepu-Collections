import os
import re

def replace_brand_name(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    content = f.read()

                # Replace standard capitalization
                new_content = content.replace('Deepu Saree', "Deepu's Collection")
                new_content = new_content.replace('Deepu saree', "Deepu's collection")
                
                # Check if it was modified
                if content != new_content:
                    with open(filepath, 'w') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")

replace_brand_name('src')
print("Brand name updated successfully!")
