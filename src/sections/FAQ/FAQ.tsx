import { useId, useState } from "react";
import headingArtwork from "../../assets/faq-heading.svg";
import { Icon } from "../../design-system/components/Icon/Icon";
import styles from "./FAQ.module.css";

const questions = [
  {
    question: "A Veritas é confiável?",
    answer:
      "Sim. Trabalhamos com contratos claros, parceiros jurídicos registrados na OAB e seguimos padrões rígidos de ética e segurança.",
  },
  {
    question: "Quanto custa para realizar a analise do meu caso?",
    answer: "A análise é totalmente gratuita e sem compromisso.",
  },
  {
    question: "Como é feito o atendimento da Veritas?",
    answer:
      "Todo o atendimento é feito de forma online, por telefone, WhatsApp, e-mail ou vídeo chamada, garantindo mais agilidade.",
  },
  {
    question: "Vocês cobram algum valor antecipado?",
    answer:
      "Não. Nenhum pagamento é solicitado de forma antecipada. Os contratos dos nossos parceiros seguem o modelo ad exitum, ou seja, só haverá custos caso o cliente obtenha êxito na ação.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const id = useId();

  return (
    <section id="perguntas-frequentes" className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.inner}>
        <img className={styles.headingArtwork} src={headingArtwork} alt="" aria-hidden="true" />

        <div className={styles.intro}>
          <h2 id={`${id}-title`} className={styles.title}>FAQs</h2>
          <p>Perguntas frequentes sobre a Veritas Hub</p>
        </div>

        <div className={styles.accordion}>
          {questions.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            const triggerId = `${id}-question-${index}`;
            const panelId = `${id}-answer-${index}`;

            return (
              <div className={styles.item} key={question}>
                <h3 className={styles.question}>
                  <button
                    id={triggerId}
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{question}</span>
                    <span className={styles.arrow}>
                      <Icon name="arrow-down-s" size={18} />
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen}>
                  <p className={styles.answer}>{answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
