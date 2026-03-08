import { useTranslation } from "react-i18next";

function Hero({ language }) {

  const [text, setText] = useState({
    title: "AI Micro-Loans for India's Gig Workers",
    description:
      "Designed for Swiggy delivery partners, Uber drivers and freelancers."
  });

  const translate = async () => {

    if (language === "en") return;

    const res = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: text.description,
        language
      })
    });

    const data = await res.json();

    setText(prev => ({
      ...prev,
      description: data.translation
    }));

  };

  useEffect(() => {
    translate();
  }, [language]);

  return (

    <section className="hero">

      <h1>{text.title}</h1>

      <p>{text.description}</p>

    </section>

  );
}