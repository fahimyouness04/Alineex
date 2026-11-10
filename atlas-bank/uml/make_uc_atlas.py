#!/usr/bin/env python3
# Use-case diagram - Atlas Bank, paper style
import random
random.seed(7)

PEN = "#173a8f"
INK = "#1b1b1b"
GREY = "#5a6a94"
FONT = "'Patrick Hand','Comic Sans MS',cursive,sans-serif"

W, H = 1700, 1100

def wob(x1, y1, x2, y2, amp=4):
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2
    dx, dy = x2 - x1, y2 - y1
    L = max((dx * dx + dy * dy) ** 0.5, 1)
    off = random.uniform(-amp, amp)
    return f"M {x1:.0f} {y1:.0f} Q {mx - dy / L * off:.0f} {my + dx / L * off:.0f} {x2:.0f} {y2:.0f}"

def wob_rect(x, y, w, h, j=2.5):
    pts = [(x + random.uniform(-j, j), y + random.uniform(-j, j)),
           (x + w + random.uniform(-j, j), y + random.uniform(-j, j)),
           (x + w + random.uniform(-j, j), y + h + random.uniform(-j, j)),
           (x + random.uniform(-j, j), y + h + random.uniform(-j, j))]
    return f"M {pts[0][0]:.0f} {pts[0][1]:.0f} L {pts[1][0]:.0f} {pts[1][1]:.0f} L {pts[2][0]:.0f} {pts[2][1]:.0f} L {pts[3][0]:.0f} {pts[3][1]:.0f} Z"

def seg(parts, x1, y1, x2, y2, color=PEN, width=2.8, dash=None):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    parts.append(f'<path d="{wob(x1, y1, x2, y2)}" fill="none" stroke="{color}" stroke-width="{width}"{d}/>')

def txt(parts, x, y, s, size=22, color=INK, anchor="middle"):
    rot = random.uniform(-2, 2)
    parts.append(f'<text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}" fill="{color}" text-anchor="{anchor}" transform="rotate({rot:.1f} {x} {y})">{s}</text>')

def acteur(parts, x, y, nom):
    parts.append(f'<circle cx="{x}" cy="{y}" r="26" fill="none" stroke="{INK}" stroke-width="3"/>')
    seg(parts, x, y + 26, x, y + 110, color=INK)
    seg(parts, x - 45, y + 60, x + 45, y + 60, color=INK)
    seg(parts, x, y + 110, x - 35, y + 185, color=INK)
    seg(parts, x, y + 110, x + 35, y + 185, color=INK)
    txt(parts, x, y + 225, nom, 24)

def ellipse(parts, x, y, rx, ry, label, size=22):
    parts.append(f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="#fffef8" stroke="{PEN}" stroke-width="3"/>')
    txt(parts, x, y + 7, label, size)

parts = []
parts.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')
parts.append(f'<rect x="0" y="0" width="{W}" height="{H}" fill="#fffef8"/>')
parts.append(f'<text x="60" y="62" font-family="{FONT}" font-size="39" fill="{INK}">Diagramme de cas d&apos;utilisation — Atlas Bank</text>')

# ---- system rectangle
parts.append(f'<path d="{wob_rect(400, 120, 940, 900)}" fill="none" stroke="{PEN}" stroke-width="3"/>')
txt(parts, 870, 160, "Atlas Bank", 28)

# ---- actors
acteur(parts, 170, 480, "Client")
acteur(parts, 1540, 480, "Administrateur")

# ---- use cases (left column: client)
UC_G = [(640, 230, "S'inscrire"), (640, 340, "Se connecter"),
        (640, 450, "Consulter ses comptes"), (640, 560, "Créer un compte")]
# ---- use cases (right column: client)
UC_D = [(1050, 230, "Déposer de l'argent"), (1050, 340, "Retirer de l'argent"),
        (1050, 450, "Faire un virement"), (1050, 560, "Consulter l'historique"),
        (1050, 670, "Vérifier le solde")]
# ---- use cases (bottom: admin)
UC_B = [(700, 810, "Gérer les clients"), (1010, 810, "Consulter les transactions")]

for x, y, label in UC_G + UC_D + UC_B:
    ellipse(parts, x, y, 155, 42, label, 21)

# ---- associations: client -> left + right column
for x, y, _ in UC_G:
    seg(parts, 200, 540, x - 150, y)
for x, y, _ in UC_D:
    seg(parts, 200, 540, x - 150, y)

# ---- associations: admin -> bottom use cases
seg(parts, 1510, 540, 1010 + 120, 810 - 30)
seg(parts, 1510, 540, 700 + 120, 810 - 30)

# ---- include: Faire un virement -> Vérifier le solde
seg(parts, 1050, 492, 1050, 628, color=GREY, dash="10 8")
txt(parts, 1038, 612, "«include»", 20, GREY, "end")

parts.append('</svg>')
with open('/home/hatch/workspace/atlas-bank/uml/use_case.svg', 'w') as f:
    f.write('\n'.join(parts))
print('use case svg written')
