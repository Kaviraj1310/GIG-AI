from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from datetime import datetime

def generate_report(data, file_path="loan_report.pdf"):

    c = canvas.Canvas(file_path, pagesize=letter)

    y = 750

    c.setFont("Helvetica-Bold", 18)
    c.drawString(200, y, "Loan Eligibility Report")

    y -= 40
    c.setFont("Helvetica", 12)

    # User Profile
    c.drawString(50, y, "User Profile")
    y -= 20

    c.drawString(60, y, f"Name: {data['name']}")
    y -= 20
    c.drawString(60, y, f"Platform: {data['platform']}")
    y -= 20
    c.drawString(60, y, f"Monthly Income: ₹{data['income']}")
    y -= 20
    c.drawString(60, y, f"Monthly Expenses: ₹{data['expenses']}")
    y -= 20
    c.drawString(60, y, f"EMI: ₹{data['emi']}")

    y -= 40

    # Eligibility Result
    c.drawString(50, y, "Loan Eligibility Result")
    y -= 20
    c.drawString(60, y, f"Eligibility Score: {data['score']}/100")
    y -= 20
    c.drawString(60, y, f"Status: {data['status']}")

    y -= 40

    # AI Explanation
    c.drawString(50, y, "AI Explanation")
    y -= 20
    c.drawString(60, y, data['explanation'])

    y -= 40

    # Loan Recommendations
    c.drawString(50, y, "Recommended Loan Products")
    y -= 20

    for loan in data['loans']:
        c.drawString(60, y, f"- {loan}")
        y -= 20

    y -= 20

    # Improvement Suggestions
    c.drawString(50, y, "Improvement Suggestions")
    y -= 20

    for tip in data['suggestions']:
        c.drawString(60, y, f"- {tip}")
        y -= 20

    y -= 20

    # Document Checklist
    c.drawString(50, y, "Required Documents")
    y -= 20

    for doc in data['documents']:
        c.drawString(60, y, f"- {doc}")
        y -= 20

    y -= 40

    c.drawString(50, y, f"Generated on: {datetime.now()}")

    c.save()

    return file_path