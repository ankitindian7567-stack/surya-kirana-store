import os
import sys
import subprocess

# Ensure Pillow is installed
try:
    from PIL import Image, ImageDraw, ImageFont, ImageFilter
except ImportError:
    print("Installing pillow...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])
    from PIL import Image, ImageDraw, ImageFont, ImageFilter

image_path = r"C:\Users\ankit\.gemini\antigravity\brain\d4b04660-c9d2-4caf-ae50-923a28a70030\media__1782030245933.jpg"
output_path = r"C:\Users\ankit\.gemini\antigravity\scratch\surya-kirana-store\public\harfor_dal.png"

# Ensure output directory exists
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# Open the image
img = Image.open(image_path)

# Crop to a square from the center
width, height = img.size
min_dim = min(width, height)
left = (width - min_dim) / 2
top = (height - min_dim) / 2
right = (width + min_dim) / 2
bottom = (height + min_dim) / 2
img_cropped = img.crop((left, top, right, bottom))

# Resize to standard size (e.g. 600x600)
img_resized = img_cropped.resize((600, 600), Image.Resampling.LANCZOS)

# Create a drawing canvas
draw = ImageDraw.Draw(img_resized)

# Draw a premium border
border_width = 12
draw.rectangle(
    [border_width, border_width, 600 - border_width, 600 - border_width],
    outline="#d97706", # amber-600 gold color
    width=6
)

# Draw a label banner at the bottom (semi-transparent dark amber overlay)
overlay = Image.new('RGBA', img_resized.size, (0, 0, 0, 0))
draw_overlay = ImageDraw.Draw(overlay)
draw_overlay.rectangle(
    [border_width + 3, 600 - 130 - border_width, 600 - border_width - 3, 600 - border_width - 3],
    fill=(217, 119, 6, 210) # amber-600 gold color with 80% opacity
)

# Composite
img_res = Image.alpha_composite(img_resized.convert('RGBA'), overlay)
draw_res = ImageDraw.Draw(img_res)

# Add text labels
try:
    font_large = ImageFont.truetype("arial.ttf", 32)
    font_small = ImageFont.truetype("arial.ttf", 22)
except IOError:
    font_large = ImageFont.load_default()
    font_small = ImageFont.load_default()

# Draw Text (Hindi and English)
text_line1 = "★ SURYA PREMIUM SELECTION ★"
text_line2 = "स्थानीय हरफोर दाल (Harfor Dal)"
text_line3 = "Rate: ₹66 / Kg"

def get_text_width(text, font):
    try:
        return font.getbbox(text)[2] - font.getbbox(text)[0]
    except AttributeError:
        return draw_res.textsize(text, font=font)[0]

w1 = get_text_width(text_line1, font_small)
w2 = get_text_width(text_line2, font_large)
w3 = get_text_width(text_line3, font_small)

# Draw lines centered
draw_res.text(((600 - w1)/2, 600 - 115), text_line1, fill="#fef3c7", font=font_small)
draw_res.text(((600 - w2)/2, 600 - 80), text_line2, fill="#ffffff", font=font_large)
draw_res.text(((600 - w3)/2, 600 - 45), text_line3, fill="#fef3c7", font=font_small)

# Save as PNG
img_res.convert('RGB').save(output_path, "PNG")
print("Image saved successfully to", output_path)
