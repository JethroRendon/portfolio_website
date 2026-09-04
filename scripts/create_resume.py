from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


OUTPUT = Path(__file__).resolve().parents[1] / "output" / "pdf" / "your-name-resume.pdf"

INK = HexColor("#111411")
PAPER = HexColor("#F4F1E8")
LIME = HexColor("#B8F35A")
BLUE = HexColor("#7E9CFF")
CORAL = HexColor("#FF5A48")
MUTED = HexColor("#5F645F")
LINE = HexColor("#CFD0C8")


def label(pdf, text, x, y, color=MUTED, size=7.5):
    pdf.setFillColor(color)
    pdf.setFont("Helvetica-Bold", size)
    pdf.drawString(x, y, text.upper())


def rule(pdf, x1, y, x2, color=LINE, width=0.6):
    pdf.setStrokeColor(color)
    pdf.setLineWidth(width)
    pdf.line(x1, y, x2, y)


def paragraph(pdf, text, x, y, width, size=9.2, leading=13, color=INK, bold=False):
    style = ParagraphStyle(
        "body",
        fontName="Helvetica-Bold" if bold else "Helvetica",
        fontSize=size,
        leading=leading,
        textColor=color,
        alignment=TA_LEFT,
        spaceAfter=0,
    )
    story = Paragraph(text, style)
    _, height = story.wrap(width, 200 * mm)
    story.drawOn(pdf, x, y - height)
    return y - height


def draw_entry(pdf, x, y, width, year, title, role, note, accent):
    pdf.setFillColor(accent)
    pdf.circle(x + 3.2 * mm, y - 2.2 * mm, 2.2 * mm, stroke=0, fill=1)
    label(pdf, year, x + 8 * mm, y, MUTED, 7.2)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 10.5)
    pdf.drawString(x + 8 * mm, y - 5.5 * mm, title)
    pdf.setFont("Helvetica-Bold", 8.1)
    pdf.setFillColor(accent)
    pdf.drawString(x + 8 * mm, y - 10.1 * mm, role)
    bottom = paragraph(pdf, note, x + 8 * mm, y - 12.4 * mm, width - 8 * mm, 7.8, 10.2, MUTED)
    return bottom - 6 * mm


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=A4)
    width, height = A4
    margin = 17 * mm

    pdf.setTitle("YOUR NAME - Resume")
    pdf.setAuthor("YOUR NAME")
    pdf.setFillColor(PAPER)
    pdf.rect(0, 0, width, height, stroke=0, fill=1)

    # Header field
    pdf.setFillColor(INK)
    pdf.rect(0, height - 58 * mm, width, 58 * mm, stroke=0, fill=1)
    pdf.setFillColor(LIME)
    pdf.rect(margin, height - 16 * mm, 20 * mm, 3 * mm, stroke=0, fill=1)
    label(pdf, "Portfolio field file / Resume", margin + 24 * mm, height - 14.4 * mm, PAPER, 8)

    pdf.setFillColor(PAPER)
    pdf.setFont("Helvetica-Bold", 31)
    pdf.drawString(margin, height - 31 * mm, "YOUR NAME")
    pdf.setFont("Helvetica", 14)
    pdf.drawString(margin, height - 41 * mm, "Creative Developer + Frontend Engineer")
    pdf.setFillColor(LIME)
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(margin, height - 49 * mm, "PHILIPPINES / GMT +08")

    contact_x = width - margin
    contacts = ["hello@example.com", "github.com", "linkedin.com"]
    pdf.setFont("Helvetica", 8)
    pdf.setFillColor(PAPER)
    for index, contact in enumerate(contacts):
        pdf.drawRightString(contact_x, height - (28 + index * 7) * mm, contact)

    # Intro
    content_top = height - 70 * mm
    label(pdf, "Profile / 01", margin, content_top, CORAL)
    intro = (
        "I design expressive interfaces and build them with production-grade code - "
        "finding the useful path between systems, stories, and curiosity. My practice "
        "connects product thinking, visual systems, accessible interaction, and careful frontend engineering."
    )
    intro_bottom = paragraph(pdf, intro, margin, content_top - 5 * mm, width - 2 * margin, 10.2, 14.5, INK)
    rule(pdf, margin, intro_bottom - 6 * mm, width - margin)

    # Two-column content
    gap = 11 * mm
    left_w = 106 * mm
    right_x = margin + left_w + gap
    right_w = width - margin - right_x
    column_top = intro_bottom - 14 * mm

    label(pdf, "Experience / 02", margin, column_top, BLUE)
    y = column_top - 8 * mm
    y = draw_entry(pdf, margin, y, left_w, "2025 - NOW", "Independent Studio", "Creative Developer", "Design systems, product interfaces, and expressive production builds.", BLUE)
    y = draw_entry(pdf, margin, y, left_w, "2023 - 2025", "Product Team", "Frontend Engineer", "Shipped clear, resilient tools used by people across time zones.", LIME)
    y = draw_entry(pdf, margin, y, left_w, "2021 - 2023", "Digital Practice", "Designer / Developer", "Connected brand, interaction, and production code into cohesive systems.", CORAL)

    rule(pdf, margin, y + 2 * mm, margin + left_w)
    label(pdf, "Education / 03", margin, y - 6 * mm, CORAL)
    edu_y = y - 14 * mm
    edu_y = draw_entry(pdf, margin, edu_y, left_w, "2020 - 2024", "Computer Science", "B.Sc. / Software Systems", "Human-computer interaction, software systems, and the web.", CORAL)

    label(pdf, "Capabilities / 04", right_x, column_top, LIME)
    skills = [
        "TypeScript", "React", "Next.js", "Node.js", "Design systems",
        "Motion", "Figma", "Accessibility", "Product thinking", "Creative code",
    ]
    chip_y = column_top - 10 * mm
    cursor_x = right_x
    pdf.setFont("Helvetica-Bold", 7.2)
    for skill in skills:
        chip_w = stringWidth(skill.upper(), "Helvetica-Bold", 7.2) + 7 * mm
        if cursor_x + chip_w > right_x + right_w:
            cursor_x = right_x
            chip_y -= 9 * mm
        pdf.setFillColor(INK)
        pdf.roundRect(cursor_x, chip_y - 5.2 * mm, chip_w, 7 * mm, 2 * mm, stroke=0, fill=1)
        pdf.setFillColor(PAPER)
        pdf.drawCentredString(cursor_x + chip_w / 2, chip_y - 2.7 * mm, skill.upper())
        cursor_x += chip_w + 2 * mm

    project_y = chip_y - 18 * mm
    rule(pdf, right_x, project_y + 6 * mm, right_x + right_w)
    label(pdf, "Selected work / 05", right_x, project_y, BLUE)
    projects = [
        ("SIGNAL / 01", "Product intelligence", "Turns noisy live metrics into useful decisions."),
        ("ATLAS / 02", "Travel memory system", "Collects routes, notes, places, and discoveries."),
        ("FORMA / 03", "Interface language", "Gives multiple products one recognizable voice."),
    ]
    py = project_y - 9 * mm
    for index, (title, kind, note) in enumerate(projects):
        accent = [BLUE, LIME, CORAL][index]
        pdf.setFillColor(accent)
        pdf.rect(right_x, py - 1.5 * mm, 4 * mm, 4 * mm, stroke=0, fill=1)
        pdf.setFillColor(INK)
        pdf.setFont("Helvetica-Bold", 9.4)
        pdf.drawString(right_x + 7 * mm, py, title)
        label(pdf, kind, right_x + 7 * mm, py - 5.2 * mm, MUTED, 6.7)
        py = paragraph(pdf, note, right_x + 7 * mm, py - 7.5 * mm, right_w - 7 * mm, 7.6, 9.8, MUTED) - 7 * mm

    # Footer
    footer_y = 15 * mm
    rule(pdf, margin, footer_y + 10 * mm, width - margin, INK, 0.8)
    label(pdf, "Available for thoughtful projects", margin, footer_y + 4 * mm, INK, 7.4)
    pdf.setFillColor(CORAL)
    pdf.circle(width - margin - 3 * mm, footer_y + 5.2 * mm, 2.6 * mm, stroke=0, fill=1)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 7.5)
    pdf.drawRightString(width - margin - 8 * mm, footer_y + 3.8 * mm, "HELLO@EXAMPLE.COM")

    pdf.showPage()
    pdf.save()


if __name__ == "__main__":
    build()
