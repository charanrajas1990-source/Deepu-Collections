import os

def replace_theme_colors(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    content = f.read()

                # Hex code replacements
                content = content.replace('#381611', '#2A0845')  # Very dark purple
                content = content.replace('#722F37', '#5C167D')  # Thick Royal Purple
                content = content.replace('#5C262C', '#4A1066')  # Darker purple for hovers
                content = content.replace('#FBF8F1', '#F7F2FA')  # Soft lilac background
                
                # Tailwind class replacements (from orange back to purple)
                content = content.replace('bg-orange-', 'bg-purple-')
                content = content.replace('border-orange-', 'border-purple-')
                content = content.replace('text-orange-', 'text-purple-')
                content = content.replace('divide-orange-', 'divide-purple-')

                with open(filepath, 'w') as f:
                    f.write(content)

replace_theme_colors('src')
print("Theme colors updated successfully to thick purple!")
