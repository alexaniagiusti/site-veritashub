import heroImage from "../../assets/hero.png";
import styles from "./AboutTeam.module.css";

const photos = Array.from({ length: 8 }, (_, index) => index + 1);

export function AboutTeam() {
  return (
    <section id="quem-somos" className={styles.section} aria-labelledby="about-team-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span>Movidos pelo propósito de transformar vidas</span>
          <h2 id="about-team-title">Pessoas apaixonadas pelo que fazem</h2>
          <p>
            Somos uma equipe de aproximadamente 289 especialistas apaixonados por transformar
            vidas e democratizar o acesso àquilo que é direito.
          </p>
          <p>
            Nosso propósito ganha força através dos resultados que construímos todos os dias.
            Já atendemos mais de 20 mil clientes em todo o Brasil, mantemos uma base ativa
            superior a 10 mil pessoas e realizamos mais de 2 mil atendimentos mensais.
          </p>
          <p>
            Mais do que uma empresa, somos um movimento que conecta conhecimento, tecnologia e
            pessoas para garantir que cada brasileiro tenha acesso aos seus direitos.
          </p>
        </div>

        <div className={styles.gallery} aria-label="Equipe Veritas Hub">
          {photos.map((photo) => (
            <img key={photo} src={heroImage} alt="" />
          ))}
        </div>
      </div>
    </section>
  );
}
