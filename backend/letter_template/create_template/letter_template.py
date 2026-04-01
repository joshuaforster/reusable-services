from fpdf import FPDF
from letter_template.create_template.create_qr import create_qr_code
import os
import re
from datetime import datetime


class UKLetter(FPDF):
    def __init__(self, data):
        super().__init__(orientation='P', unit='mm', format='A4')
        self.data = data
        self.set_margins(22, 20, 20)

        # Address positioning (Pingen safe)
        self.address_x = 22
        self.address_y = 60
        self.address_line_height = 4
        self.address_gap_after = 8

        # Fonts
        self.font_family = 'Helvetica'
        self.font_size_normal = 10
        self.font_size_small = 8
        self.font_size_heading = 12

        # Logo
        self.logo_path = self.data.get("logo_path", "placeholder_logo.png")

        # CHANGE: auto date
        self.date = datetime.now().strftime("%d %B %Y")

    def header(self):
        logo_x = 22
        logo_y = 15
        logo_width = 30

        # CHANGE: logo OR fallback text
        if self.logo_path and os.path.exists(self.logo_path):
            self.image(self.logo_path, x=logo_x, y=logo_y, w=logo_width)
        else:
            # fallback text instead of logo
            self.set_xy(logo_x, logo_y)
            self.set_font(self.font_family, 'B', 16)
            self.cell(logo_width, 10, self.data["company_name"], align='L')

        # Company name (top right)
        self.set_font(self.font_family, 'B', self.font_size_heading)
        self.set_xy(22, 15)
        self.cell(0, 10, self.data["company_name"], ln=True, align='R')

        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font(self.font_family, '', self.font_size_small)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

    def _setup_page(self):
        self.add_page()
        self.set_font(self.font_family, '', self.font_size_normal)

    def _create_qr(self):
        create_qr_code(self.data["qr_url"], "temp_qr.png")

    def _render_sender(self):
        self.set_font(self.font_family, '', self.font_size_normal)

        for line in self.data["sender"]:
            self.cell(0, 5, line, ln=True, align='R')

        self.ln(10)

    def _clean_recipient(self):
        lines = []

        for line in self.data["recipient"]:
            line = str(line).strip()
            if not line:
                continue

            if line.lower() in ['united kingdom', 'uk', 'england']:
                continue

            lines.append(line)

        # Force postcode formatting
        if lines:
            lines[-1] = re.sub(r'\s+', ' ', lines[-1].upper())

        return lines

    def _render_recipient(self):
        self.set_xy(self.address_x, self.address_y)
        self.set_font(self.font_family, '', 10)

        lines = self._clean_recipient()

        for line in lines:
            self.cell(0, self.address_line_height, line, ln=True)

        block_height = len(lines) * self.address_line_height
        return self.address_y + block_height + self.address_gap_after

    def _render_date(self, y):
        self.set_xy(22, y)
        self.set_font(self.font_family, '', self.font_size_normal)
        self.cell(0, 5, self.date, ln=True)
        self.ln(10)

    def _render_subject(self):
        self.set_font(self.font_family, 'B', self.font_size_normal)
        self.cell(0, 5, self.data["subject"], ln=True)
        self.ln(5)

    def _render_body(self):
        self.set_font(self.font_family, '', self.font_size_normal)
        self.multi_cell(0, 5, self.data["body"])
        self.ln(10)

    def _render_signature(self):
        self.set_font(self.font_family, 'B', self.font_size_normal)
        self.cell(0, 5, self.data["company_name"], ln=True)

        self.set_font(self.font_family, '', self.font_size_normal)
        for line in self.data["contact"]:
            self.cell(0, 6, line, ln=True)

    def _render_qr(self):
        if os.path.exists("temp_qr.png"):
            self.image("temp_qr.png", x=150, w=30)
            os.remove("temp_qr.png")

    def render_letter(self):
        self._create_qr()
        self._setup_page()
        self._render_sender()

        next_y = self._render_recipient()
        self._render_date(next_y + 10)

        self._render_subject()
        self._render_body()
        self._render_signature()
        self._render_qr()

    def get_pdf_bytes(self):
        return self.output(dest="S").encode("latin1")