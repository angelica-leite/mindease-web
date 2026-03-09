"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Brain, LockKeyhole, Mail } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { useAuth } from "@/presentation/hooks/useAuth";
import { authPageClasses as styles } from "@/presentation/pages/auth/AuthPage.styles";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function resolveRedirectPath() {
    const next = searchParams.get("next");
    if (!next || !next.startsWith("/")) {
      return "/dashboard";
    }

    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const result = login({ email, password });
    if (!result.ok) {
      setError(result.error ?? "Nao foi possivel entrar.");
      return;
    }

    router.replace(resolveRedirectPath());
  }

  return (
    <div className={styles.page}>
      <div className={styles.background} />
      <motion.section
        className={styles.card}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className={styles.cardSheen} />
        <div className={styles.cardBody}>
          <div className={styles.brandRow}>
            <div className={styles.brandIconWrap}>
              <Brain className={styles.brandIcon} />
            </div>
            <h1 className={styles.brand}>MindEase</h1>
          </div>
          <h2 className={styles.title}>Entrar</h2>
          <p className={styles.subtitle}>Organize sua rotina com foco e leveza.</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.fieldLabel}>
                E-mail
              </label>
              <div className={styles.inputWrap}>
                <Mail className={styles.fieldIcon} />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.fieldLabel}>
                Senha
              </label>
              <div className={styles.inputWrap}>
                <LockKeyhole className={styles.fieldIcon} />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.actions}>
              <Button type="submit" className={styles.submitButton}>
                Entrar
              </Button>
            </div>
          </form>

          <p className={styles.footer}>
            Não tem conta?{" "}
            <Link href="/cadastro" className={styles.footerLink}>
              Criar cadastro
            </Link>
          </p>
        </div>
      </motion.section>
    </div>
  );
}
