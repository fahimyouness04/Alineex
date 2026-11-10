#!/usr/bin/env python3
# Atlas Bank presentation - professional palette (dark blue / teal / light orange accent)
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

DARK = RGBColor(0x0F, 0x2A, 0x4A)
TEAL = RGBColor(0x0E, 0x7C, 0x7B)
ORANGE = RGBColor(0xF5, 0x9E, 0x0B)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
INK = RGBColor(0x1B, 0x1B, 0x1B)
GREY = RGBColor(0x5A, 0x6A, 0x7A)

BASE = "/home/hatch/workspace/atlas-bank"
UML = BASE + "/uml"

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
BLANK = prs.slide_layouts[6]

def bg(slide, color):
    slide.background.fill.solid()
    slide.background.fill.fore_color.rgb = color

def rect(slide, x, y, w, h, color):
    sh = slide.shapes.add_shape(1, Inches(x), Inches(y), Inches(w), Inches(h))
    sh.fill.solid()
    sh.fill.fore_color.rgb = color
    sh.line.fill.background()
    return sh

def text(slide, x, y, w, h, s, size=20, color=INK, bold=False, align=PP_ALIGN.LEFT):
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = s
    p.font.size = Pt(size)
    p.font.color.rgb = color
    p.font.bold = bold
    p.alignment = align
    return box

def content_slide(title, body, image=None, img_h=4.3):
    s = prs.slides.add_slide(BLANK)
    bg(s, WHITE)
    rect(s, 0, 0, 13.333, 0.12, TEAL)
    rect(s, 0, 0.12, 0.28, 7.38, DARK)
    text(s, 0.7, 0.45, 12.0, 0.8, title, size=30, color=DARK, bold=True)
    rect(s, 0.7, 1.25, 1.6, 0.06, ORANGE)
    if image:
        from PIL import Image as PILImage
        iw, ih = PILImage.open(image).size
        w_in = img_h * iw / ih
        x_in = (13.333 - w_in) / 2
        s.shapes.add_picture(image, Inches(x_in), Inches(1.55), height=Inches(img_h))
        text(s, 0.7, 1.55 + img_h + 0.15, 12.0, 0.9, body, size=17, color=INK)
    else:
        text(s, 0.7, 1.6, 12.0, 4.5, body, size=19, color=INK)
    return s

# ---- Slide 1 : titre
s = prs.slides.add_slide(BLANK)
bg(s, WHITE)
rect(s, 0, 0, 13.333, 7.5, DARK)
rect(s, 0, 3.55, 13.333, 0.08, ORANGE)
text(s, 1.0, 1.3, 11.3, 1.2, "Atlas Bank", size=54, color=WHITE, bold=True)
text(s, 1.0, 2.5, 11.3, 0.8, "Banque en ligne", size=30, color=TEAL)
text(s, 1.0, 4.2, 11.3, 0.8, "Projet de fin de cycle — Développement Full Stack", size=22, color=WHITE)
text(s, 1.0, 5.0, 11.3, 0.8, "React • Express • MySQL • Jira • Vercel", size=18, color=GREY)

# ---- Slide 2 : contexte
content_slide(
    "Contexte et objectifs",
    "Atlas Bank est une banque en ligne fictive, développée comme projet de fin de cycle "
    "en 2ème année de développement. L'objectif est de permettre à un client de gérer ses "
    "comptes en ligne en toute sécurité : consulter ses soldes, déposer et retirer de "
    "l'argent, et faire des virements. Un administrateur dispose d'une vue d'ensemble des "
    "clients et des comptes. Le projet couvre l'ensemble des compétences étudiées cette "
    "année : React, Node.js et Express, MySQL, Git et GitHub, Scrum et Jira, UML et "
    "déploiement sur Vercel."
)

# ---- Slide 3 : fonctionnalités
content_slide(
    "Fonctionnalités",
    "Côté client : inscription et connexion sécurisée avec un jeton JWT, consultation des "
    "comptes courants et épargne avec leurs soldes, création d'un nouveau compte, dépôt et "
    "retrait d'argent, virement vers un autre compte par son numéro, et historique complet "
    "des transactions avec le solde après chaque opération. Côté administrateur : "
    "consultation de la liste des clients et de leurs comptes. Les règles de gestion "
    "protègent le solde : un retrait ou un virement est refusé si le solde est insuffisant, "
    "et le solde ne peut jamais devenir négatif."
)

# ---- Slide 4 : architecture
content_slide(
    "Architecture technique",
    "L'application suit une architecture en trois couches. Le frontend en React affiche les "
    "écrans et envoie des requêtes fetch vers l'API. Le backend en Express suit le modèle "
    "MVC : les routes reçoivent les requêtes, les contrôleurs appliquent les règles de "
    "gestion, et les modèles parlent à la base MySQL. L'authentification utilise un jeton "
    "JWT et les mots de passe sont hashés avec bcrypt.",
    image=UML + "/architecture_crop.png", img_h=2.8
)

# ---- Slide 5 : base de données
content_slide(
    "Base de données",
    "La base MySQL contient trois tables. La table clients stocke les informations des "
    "clients et le hash de leur mot de passe. La table comptes stocke le numéro de compte, "
    "le type (courant ou épargne) et le solde. La table transactions enregistre chaque "
    "opération avec son type, son montant et le solde après l'opération. Un client possède "
    "plusieurs comptes, et un compte enregistre plusieurs transactions.",
    image=UML + "/classes_crop.png", img_h=3.4
)

# ---- Slide 6 : cas d'utilisation
content_slide(
    "Cas d'utilisation",
    "Deux acteurs utilisent l'application. Le client s'inscrit, se connecte, consulte ses "
    "comptes, crée un compte, dépose et retire de l'argent, fait des virements et consulte "
    "son historique. Le virement inclut la vérification du solde. L'administrateur gère les "
    "clients et consulte toutes les transactions.",
    image=UML + "/use_case_crop.png", img_h=4.2
)

# ---- Slide 7 : Scrum / Jira
content_slide(
    "Organisation Scrum et Jira",
    "Le projet est organisé en un Epic, « Plateforme bancaire en ligne Atlas Bank », découpé "
    "en trois sprints. Le sprint 1 couvre l'authentification et les comptes, le sprint 2 les "
    "transactions (dépôt, retrait, virement, historique), et le sprint 3 l'administration, "
    "le déploiement et la présentation. Chaque story est découpée en tâches et sous-tâches, "
    "et les bugs rencontrés, comme le solde négatif après un retrait, sont corrigés et suivis "
    "dans Jira."
)

# ---- Slide 8 : déploiement et conclusion
content_slide(
    "Déploiement et conclusion",
    "Le code est versionné sur GitHub avec des branches et des commits réguliers, et le "
    "frontend est déployé sur Vercel pour être testable en ligne par le jury. Atlas Bank "
    "montre qu'une application bancaire complète peut être construite avec des technologies "
    "modernes et simples : React, Express, MySQL et JWT. Le projet est fonctionnel, "
    "sécurisé et prêt à être présenté."
)

prs.save(BASE + "/presentation/Atlas_Bank_Presentation.pptx")
print("deck saved, slides:", len(prs.slides._sldIdLst))
