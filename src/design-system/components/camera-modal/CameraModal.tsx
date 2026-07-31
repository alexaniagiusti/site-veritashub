import { useState } from "react";

import styles from "./CameraModal.module.css";
import axios from "axios";
import client from "../../../api/client";
import { Button, Icon, Input } from "../..";

interface CameraModalProps {
  onClose: () => void;
}

interface CameraResponse {
  valido: boolean;
  nome: string;
  link: string;
}

function formatarCpf(valor: string) {
  const digits = valor.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function CameraModal({ onClose }: CameraModalProps) {
  const [cpf, setCpf] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleValidar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cpfLimpo = cpf.replace(/\D/g, "");
    if (cpfLimpo.length !== 11) {
      setError("Digite um CPF válido com 11 dígitos.");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await client.get<CameraResponse>("/cameras", {
        params: { cpf: cpfLimpo },
      });

      window.open(data.link, "_blank", "noopener,noreferrer");
      onClose();
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Não foi possível validar seu acesso no momento. Tente novamente em instantes.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} role="presentation" onClick={onClose}>
      <section
        aria-labelledby="camera-modal-title"
        aria-modal="true"
        className={styles.cameraModal}
        role="dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2 id="camera-modal-title">Ao vivo</h2>
          <button
            aria-label="Fechar modal"
            className={styles.closeButton}
            onClick={onClose}
            type="button"
          >
            <Icon name="close" size={24} />
          </button>
        </div>

        <p className={styles.modalDescription}>
          Deseja visualizar nossa operação ao vivo? Caso seja cliente do Veritas Hub, informe
          seu CPF para validar seu acesso.
        </p>

        <form className={styles.cameraForm} onSubmit={handleValidar}>
          <Input
            label="CPF"
            placeholder="000.000.000-00"
            value={formatarCpf(cpf)}
            onChange={(e) => setCpf(e.target.value)}
            inputMode="numeric"
            disabled={isLoading}
            required
          />

          {error ? (
            <p className={styles.errorMessage} role="alert">
              {error}
            </p>
          ) : null}

          <div className={styles.modalActions}>
            <Button
              className={styles.cancelButton}
              onClick={onClose}
              size="md"
              variant="secondary"
              type="button"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button className={styles.confirmButton} size="md" type="submit" disabled={isLoading}>
              {isLoading ? "Validando..." : "Validar acesso"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}