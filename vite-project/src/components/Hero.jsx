import { useTranslation } from "react-i18next";

function Hero() {

  const { t } = useTranslation();

  return (
    <section className="hero">
      <h1>{t("welcome")}</h1>
      <p>{t("description")}</p>
    </section>
  );
}