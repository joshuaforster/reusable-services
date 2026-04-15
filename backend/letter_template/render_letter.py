from letter_template.create_template.letter_template import UKLetter
from letter_template.create_template.letter_data import build_letter_data

def generate_letter_bytes(application_id: str):
    data = build_letter_data(application_id)
    letter = UKLetter(data)
    letter.render_letter()
    pdf_bytes = letter.get_pdf_bytes()

    return pdf_bytes