import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mi_proyecto.settings')  # cambia 'tu_proyecto' por el nombre de tu proyecto
django.setup()

from mi_app.models import BandaPop  

bandas = [
        "ABBA", "Adele", "Ariana Grande", "Backstreet Boys", "Bananarama",
        "Beyoncé", "Billie Eilish", "Blackpink", "Britney Spears", "Bruno Mars",
        "Camila Cabello", "Carly Rae Jepsen", "Coldplay", "Dua Lipa", "Ed Sheeran",
        "Ellie Goulding", "Enrique Iglesias", "Fifth Harmony", "Florence + The Machine", "George Michael",
        "Gwen Stefani", "Harry Styles", "Halsey", "Imagine Dragons", "INXS",
        "James Blunt", "Janet Jackson", "Jason Mraz", "Jennifer Lopez", "Jessie J",
        "Jonas Brothers", "Justin Bieber", "Katy Perry", "Kelly Clarkson", "Kylie Minogue",
        "Lady Gaga", "Lana Del Rey", "Little Mix", "Lorde", "Luis Fonsi",
        "Madonna", "Mariah Carey", "Maroon 5", "Miley Cyrus", "Niall Horan",
        "NSYNC", "Olivia Rodrigo", "One Direction", "OneRepublic", "P!nk",
        "Paramore", "Pharrell Williams", "Post Malone", "Rihanna", "Robbie Williams",
        "Rosalía", "Sabrina Carpenter", "Sam Smith", "Selena Gomez", "Shakira",
        "Shawn Mendes", "Sia", "Spice Girls", "Sugababes", "Take That",
        "Taylor Swift", "The Chainsmokers", "The Weeknd", "Tove Lo", "Troye Sivan",
        "Twice", "U2", "Usher", "Vance Joy", "Vanessa Carlton",
        "Walk The Moon", "Whitney Houston", "Zara Larsson", "Zayn Malik", "BTS",
        "EXO", "Red Velvet", "TXT", "Super Junior", "Monsta X",
        "CNCO", "Morat", "Reik", "Ha*Ash", "Jesse & Joy",
        "Axel", "Lali", "Tini", "Karol G", "RBD",
        "Camilo", "Danny Ocean", "Sebastián Yatra", "Danna Paola", "Aitana"
    ]

for nombre in bandas:
    BandaPop.objects.get_or_create(nombre=nombre)

print("¡Bandas cargadas exitosamente!")
