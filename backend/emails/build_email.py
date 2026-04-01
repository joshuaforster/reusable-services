def build_email(leads):
    sections = []

    for lead in leads:
        section = f"""
        <div>
            <p><strong>Address:</strong> {lead["address"]}</p>
            <p><strong>Description:</strong> {lead["description"]}</p>
        </div>
        <hr/>
        """
        sections.append(section)

    html = f"""
    <html>
        <body>
            <h2>New Opportunities</h2>
            {''.join(sections)}
        </body>
    </html>
    """

    return html