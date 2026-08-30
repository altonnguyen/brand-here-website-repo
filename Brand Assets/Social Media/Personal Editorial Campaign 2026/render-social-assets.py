from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).parent
FONT_ROOT = Path('/Users/altonnguyen/Library/Fonts')
IVORY = '#F3F0E8'
RED = '#E03C31'


def font(name, size):
    return ImageFont.truetype(str(FONT_ROOT / name), size=size)


DISPLAY = lambda size: font('Italiana-Regular.ttf', size)
MONO = lambda size: font('DMMono-Regular.ttf', size)
BRAND = lambda size: font('CormorantGaramond-SemiBold.ttf', size)


def tracking(draw, xy, text, face, fill, spacing=3):
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=face, fill=fill, anchor='la')
        x += draw.textlength(char, font=face) + spacing


def brand_mark(draw, xy):
    x, y = xy
    face = BRAND(29)
    draw.text((x, y), 'BRAND', font=face, fill=IVORY, anchor='la')
    x += draw.textlength('BRAND', font=face) - 1
    draw.text((x, y), 'HERE', font=face, fill=RED, anchor='la')


def render_one():
    image = Image.open(ROOT / '01-more-than-an-agency-base.png').convert('RGBA')
    draw = ImageDraw.Draw(image)
    tracking(draw, (62, 66), 'BRAND HERE / REINTRODUCED', MONO(13), RED, 2.1)
    draw.text((58, 103), 'More than', font=DISPLAY(74), fill=IVORY, anchor='la')
    draw.text((58, 172), 'an agency.', font=DISPLAY(74), fill=IVORY, anchor='la')
    draw.line((62, 272, 296, 272), fill=RED, width=2)
    tracking(draw, (62, 292), 'STRATEGY / AI / BRAND / COMMERCE', MONO(10), IVORY, 2.2)
    brand_mark(draw, (62, 1300))
    tracking(draw, (728, 1314), 'FASHION · INTERIORS · LIFESTYLE · CONNECTION', MONO(8), IVORY, 1.6)
    image.convert('RGB').save(ROOT / '01-more-than-an-agency-final.png', quality=96)


def render_two():
    image = Image.open(ROOT / '02-business-can-have-taste-base.png').convert('RGBA')
    draw = ImageDraw.Draw(image)
    tracking(draw, (58, 58), 'CREATIVE CULTURE / 02', MONO(13), RED, 2.2)
    draw.text((56, 92), 'A business can', font=DISPLAY(68), fill=IVORY, anchor='la')
    draw.text((56, 157), 'have taste.', font=DISPLAY(68), fill=IVORY, anchor='la')
    tracking(draw, (60, 235), 'WHAT I LIKE SHAPES HOW I THINK.', MONO(10), IVORY, 2.2)
    brand_mark(draw, (62, 1300))
    tracking(draw, (785, 1314), 'HUMAN JUDGEMENT / CULTURAL CURIOSITY', MONO(8), IVORY, 1.6)
    image.convert('RGB').save(ROOT / '02-business-can-have-taste-final.png', quality=96)


render_one()
render_two()
