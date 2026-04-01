from database.queries.select.select_application_by_id import select_application_by_id


def build_letter_data(lead_id):
    lead = select_application_by_id(lead_id)

    letter_count = lead["letter_count"] or 0

    # --- content logic ---
    def get_body():
        if letter_count == 0:
            return f"""Dear Occupier,

We noticed your application: {lead["proposal"]}.

We specialise in helping with projects like this.

Kind regards,"""

        elif letter_count == 1:
            return f"""Dear Occupier,

Just following up on your application: {lead["proposal"]}.

Happy to chat if useful.

Kind regards,"""

        else:
            return f"""Dear Occupier,

Final follow-up regarding your application: {lead["proposal"]}.

Kind regards,"""

    body = get_body()

    # --- structure ---
    data = {
        "company_name": "Lambert & Wright",
        "logo_path": "placeholder_logo.png",

        "sender": [
            "123 Street Road",
            "Spixworth",
            "Norwich",
            "Norfolk",
            "SW1A HH2"
        ],

        "recipient": [
            "The Occupier",
            lead["address"],
            lead["postcode"]
        ],

        "subject": "Subject: Project enquiry",
        "body": body,

        "contact": [
            "www.site.com",
            "email@site.com",
            "0123456789"
        ],

        "qr_url": "https://site.com"
    }

    return data