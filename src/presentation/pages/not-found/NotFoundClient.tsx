"use client";

import Link from "next/link";

import { notFoundClientClasses as styles } from "@/presentation/pages/not-found/NotFoundClient.styles";

export default function NotFoundClient() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <p className={styles.description}>Ops! Pagina nao encontrada</p>

        <Link href="/" className={styles.homeLink}>
          Voltar para o inicio
        </Link>
      </div>
    </div>
  );
}
