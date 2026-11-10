#!/usr/bin/env python3
# Class diagram - Atlas Bank, paper style
import random
random.seed(11)

PEN = "#173a8f"
INK = "#1b1b1b"
GREY = "#5a6a94"
FONT = "'Patrick Hand','Comic Sans MS',cursive,sans-serif"

W, H = 1700, 1000

CLASSES = {
    "Client":      (165, 180, ["nom", "prenom", "email", "mot_de_passe", "telephone", "is_admin"]),
    "Compte":      (685, 180, ["numero_compte", "type", "solde", "devise", "statut"]),
    "Transaction": (1205, 180, ["type", "montant", "description", "solde_apres", "date_transaction"]),
}
BW = 330

def box_h(attrs):
    return 46 + len(attrs) * 31 + 10

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

def seg(parts, x1, y1, x2, y2, color=PEN, width=2.8):
    parts.append(f'<path d="{wob(x1, y1, x2, y2)}" fill="none" stroke="{color}" stroke-width="{width}"/>')

def txt(parts, x, y, s, size=22, color=INK, anchor="middle"):
    rot = random.uniform(-2, 2)
    parts.append(f'<text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}" fill="{color}" text-anchor="{anchor}" transform="rotate({rot:.1f} {x} {y})">{s}</text>')

parts = []
parts.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')
parts.append(f'<rect x="0" y="0" width="{W}" height="{H}" fill="#fffef8"/>')
parts.append(f'<text x="60" y="62" font-family="{FONT}" font-size="39" fill="{INK}">Diagramme de classes — Atlas Bank</text>')

# ---- associations
seg(parts, 495, 300, 685, 300)                     # Client - Compte
txt(parts, 520, 278, "1")
txt(parts, 660, 278, "0..*")
txt(parts, 590, 262, "possède", 22, GREY)

seg(parts, 1015, 300, 1205, 300)                   # Compte - Transaction
txt(parts, 1040, 278, "1")
txt(parts, 1180, 278, "0..*")
txt(parts, 1110, 262, "enregistre", 22, GREY)

# ---- destinataire loop: Transaction -> Compte
parts.append('<path d="M 1210 391 C 1150 600, 1080 600, 1015 391" fill="none" stroke="#173a8f" stroke-width="2.8"/>')
txt(parts, 1112, 590, "destinataire", 22, GREY)
txt(parts, 1195, 420, "0..1", 22, INK, "start")
txt(parts, 1000, 420, "*", 22, INK, "end")

# ---- class boxes
for name, (x, y, attrs) in CLASSES.items():
    h = box_h(attrs)
    parts.append(f'<path d="{wob_rect(x, y, BW, h)}" fill="#fffef8" stroke="{PEN}" stroke-width="3"/>')
    seg(parts, x + 3, y + 46, x + BW - 3, y + 46)
    txt(parts, x + BW // 2, y + 33, name, 27, INK)
    for i, a in enumerate(attrs):
        txt(parts, x + 18, y + 46 + 29 + i * 31, "- " + a, 23, INK, "start")

parts.append('</svg>')
with open('/home/hatch/workspace/atlas-bank/uml/classes.svg', 'w') as f:
    f.write('\n'.join(parts))
print('classes svg written')
