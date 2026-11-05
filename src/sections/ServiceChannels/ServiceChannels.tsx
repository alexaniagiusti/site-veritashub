import { Button } from "../../design-system/components/button";
import moldBottom from "../../assets/mold1.svg";
import moldTop from "../../assets/mold2.svg";
import feedbackIcon from "../../assets/atlas-feedback.svg";
import shieldIcon from "../../assets/atlas-shield.svg";
import headphoneIcon from "../../assets/atlas-headphone.svg";
import phoneIcon from "../../assets/atlas-phone.svg";
import whatsappIcon from "../../assets/atlas-whatsapp.svg";
import phoneActionIcon from "../../assets/atlas-phone-action.svg";
import styles from "./ServiceChannels.module.css";

const channels = [
  {
    title: "Canal de Reclamação",
    description: "Sentimos muito por sua experiência não ter sido positiva. 💚 Queremos entender melhor o motivo da sua insatisfação para que possamos ajudá-lo da melhor forma. Conte-nos o que aconteceu. Estamos aqui para ouvir você e buscar uma solução!",
    action: "Fazer reclamação",
    icon: feedbackIcon,
    actionIcon: whatsappIcon,
  },
  {
    title: "Canal de Denuncias",
    description: "Sentimos muito se você vivenciou alguma situação que precisa ser denunciada. 💚 Levamos todas as denúncias a sério e queremos ouvir você. Conte-nos o que aconteceu para que possamos analisar o caso com atenção e tomar as medidas necessárias.",
    action: "Fazer denuncia",
    icon: shieldIcon,
    actionIcon: whatsappIcon,
  },
  {
    title: "Canal de Atendimento",
    description: "Olá! 💚 Estamos aqui para ajudar você! Para tirar dúvidas, solicitar informações ou falar com nossa equipe. Será um prazer atender você!",
    action: "Fale conosco",
    icon: headphoneIcon,
    actionIcon: whatsappIcon,
  },
  {
    title: "Suspeita de golpe?",
    description: "Golpistas podem se passar por nossos advogados para solicitar pagamentos. Verifique se o número é oficial.",
    action: "Verificar número",
    icon: phoneIcon,
    actionIcon: phoneActionIcon,
  },
];

export function ServiceChannels() {
  return (
    <section id="canais-de-atendimento" className={styles.section} aria-labelledby="service-channels-title">
      <img className={styles.moldTop} src={moldTop} alt="" aria-hidden="true" />
      <img className={styles.moldBottom} src={moldBottom} alt="" aria-hidden="true" />
      <div className={styles.inner}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Canais de Atendimento</p>
          <h2 id="service-channels-title">Conheça o Atlas Veritas Hub</h2>
          <p className={styles.introduction}>Estamos aqui para te dar suporte completo e garantir a proteção do seu direito.</p>
        </header>
        <div className={styles.cards}>
          {channels.map((channel) => (
            <article className={styles.card} key={channel.title}>
              <img className={styles.cardIcon} src={channel.icon} alt="" aria-hidden="true" />
              <h3>{channel.title}</h3>
              <p className={styles.description}>{channel.description}</p>
              <Button
                variant="accent"
                size="lg"
                className={styles.action}
                iconRight={<img src={channel.actionIcon} alt="" aria-hidden="true" />}
                onClick={() => { window.location.hash = "rodape"; }}
              >
                {channel.action}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
