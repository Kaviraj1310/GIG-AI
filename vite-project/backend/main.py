from fastapi import FastAPI
from pydantic import BaseModel
from report.report_generator import generate_report

app = FastAPI()


class UserData(BaseModel):
    name: str
    platform: str
    income: int
    expenses: int
    emi: int
    score: int
    status: str
    explanation: str
    loans: list
    suggestions: list
    documents: list


@app.post("/generate-report")
def create_report(data: UserData):

    file_path = generate_report(data.dict())

    return {
        "message": "Report generated successfully",
        "file": file_path
    }