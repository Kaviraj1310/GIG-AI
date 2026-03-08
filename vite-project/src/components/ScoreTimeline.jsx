import React, { useState, useEffect } from "react";

function ScoreTimeline(){

  const [history,setHistory] = useState([]);

  useEffect(()=>{

    const stored = JSON.parse(localStorage.getItem("scoreHistory")) || [];
    setHistory(stored);

  },[]);

  return(

    <div className="timelineCard">

      <h3>Score History Timeline</h3>

      {history.length === 0 ? (
        <p>No history yet.</p>
      ) : (

        <ul>

          {history.map((item,index)=>(
            <li key={index}>
              <strong>{item.score}/100</strong> — {item.date}
            </li>
          ))}

        </ul>

      )}

    </div>

  );

}

export default ScoreTimeline;