import os
import re

def replace_theme_colors(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    content = f.read()

                # Hex code replacements
                content = content.replace('#2c0c38', '#381611')  # Very dark warm brown/black
                content = content.replace('#4a1d5c', '#722F37')  # Rich Maroon
                content = content.replace('#3d164d', '#5C262C')  # Darker Maroon (for hovers)
                content = content.replace('#f5f0f8', '#FBF8F1')  # Cream/Warm background
                
                # Tailwind class replacements
                content = content.replace('bg-purple-', 'bg-orange-')
                content = content.replace('border-purple-', 'border-orange-')
                content = content.replace('text-purple-', 'text-orange-')
                content = content.replace('divide-purple-', 'divide-orange-')

                with open(filepath, 'w') as f:
                    f.write(content)

replace_theme_colors('src')
print("Theme colors updated successfully!")
