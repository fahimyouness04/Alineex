#!/usr/bin/env python3
# Architecture diagram - Atlas Bank, paper style
import random
random.seed(3)

PEN = "#173a8f"
INK = "#1b1b1b"
GREY = "#5a6a94"
FONT = "'Patrick Hand','Comic Sans MS',cursive,sans-serif"

W, H = 1600, 620

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

def txt(parts, x, y, s, size=24, color=INK, anchor="middle"):
    rot = random.uniform(-2, 2)
    parts.append(f'<text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}" fill="{color}" text-anchor="{anchor}" transform="rotate({rot:.1f} {x} {y})">{s}</text>')

parts = []
parts.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">')
parts.append(f'<rect x="0" y="0" width="{W}" height="{H}" fill="#fffef8"/>')

boxes = [
    (80, 180, 380, 220, "Frontend", "React 18", "Login, Dashboard, Virement"),
    (610, 180, 380, 220, "Backend", "Express (MVC)", "Routes, Controllers, Models"),
    (1140, 180, 380, 220, "Base de données", "MySQL", "clients, comptes, transactions"),
]
for x, y, w, h, t1, t2, t3 in boxes:
    parts.append(f'<path d="{wob_rect(x, y, w, h)}" fill="#fffef8" stroke="{PEN}" stroke-width="3"/>')
    txt(parts, x + w // 2, y + 55, t1, 30)
    txt(parts, x + w // 2, y + 110, t2, 26, PEN)
    txt(parts, x + w // 2, y + 160, t3, 22, GREY)

# arrows between boxes
for x1, x2 in [(460, 610), (990, 1140)]:
    parts.append(f'<path d="{wob(x1, 290, x2 - 8, 290)}" fill="none" stroke="{PEN}" stroke-width="3"/>')
    parts.append(f'<path d="M {x2 - 8} 290 l -18 -9 v 18 z" fill="{PEN}"/>')
    txt(parts, (x1 + x2) // 2, 260, "fetch /api", 22, GREY)

txt(parts, 800, 520, "Authentification JWT + bcrypt  •  Déploiement Vercel", 26, PEN)
parts.append('</svg>')
with open('/home/hatch/workspace/atlas-bank/uml/architecture.svg', 'w') as f:
    f.write('\n'.join(parts))
print('architecture svg written')
