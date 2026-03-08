import React, { useState } from "react";

export default function FraudDetection(){

const [income,setIncome] = useState("");
const [expenses,setExpenses] = useState("");
const [emi,setEmi] = useState("");
const [transactions,setTransactions] = useState("");
const [result,setResult] = useState("");

const checkFraud = () => {

let warnings = [];

const i = Number(income);
const e = Number(expenses);
const m = Number(emi);
const t = Number(transactions);

/* RULES */

if(e > i){
warnings.push("Expenses exceed income");
}

if(m > i * 0.6){
warnings.push("EMI is unusually high compared to income");
}

if(i > 100000 && t < 10){
warnings.push("Low digital activity for high income");
}

if(i < 15000 && t > 120){
warnings.push("Very high transactions for low income");
}

/* RESULT */

if(warnings.length === 0){

setResult({
type:"safe",
message:"Data looks consistent. No fraud risk detected."
});

}else{

setResult({
type:"risk",
message:warnings.join(". ")
});

}

};

return(

<div className="card" style={{marginTop:"30px"}}>

<h2>Fraud Detection</h2>

<input
type="number"
placeholder="Monthly Income ₹"
value={income}
onChange={(e)=>setIncome(e.target.value)}
className="fraudInput"
/>

<input
type="number"
placeholder="Monthly Expenses ₹"
value={expenses}
onChange={(e)=>setExpenses(e.target.value)}
className="fraudInput"
/>

<input
type="number"
placeholder="Existing EMI ₹"
value={emi}
onChange={(e)=>setEmi(e.target.value)}
className="fraudInput"
/>

<input
type="number"
placeholder="Monthly Transactions"
value={transactions}
onChange={(e)=>setTransactions(e.target.value)}
className="fraudInput"
/>

<button
style={{marginTop:"15px"}}
onClick={checkFraud}
>
Check Risk
</button>

{result && (

<div
className={`fraudResult ${result.type}`}
>

{result.type === "safe" ? "✅" : "⚠"} {result.message}

</div>

)}

</div>

);

}