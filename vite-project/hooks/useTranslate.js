import { useState } from "react";

export default function useTranslate(language) {

  const [translated, setTranslated] = useState({});

  const translate = async (key, text) => {

    if (language === "en") {
      setTranslated(prev => ({ ...prev, [key]: text }));
      return;
    }

    const res = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        language
      })
    });

    const data = await res.json();

    setTranslated(prev => ({
      ...prev,
      [key]: data.translation
    }));
  };

  return { translated, translate };

}