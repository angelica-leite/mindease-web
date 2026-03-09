"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Brain, LockKeyhole, Mail, User } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { useAuth } from "@/presentation/hooks/useAuth";
import { authPageClasses as styles } from "@/presentation/pages/auth/AuthPage.styles";

export default function RegisterClient() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const result = register({ name, email, password });
    if (!result.ok) {
      setError(result.error ?? "Nao foi possivel criar a conta.");
      return;
    }

    router.replace("/dashboard");
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
          <h2 className={styles.title}>Criar conta</h2>
          <p className={styles.subtitle}>Monte seu perfil e acompanhe seu progresso.</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.fieldLabel}>
                Nome
              </label>
              <div className={styles.inputWrap}>
                <User className={styles.fieldIcon} />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  className={styles.input}
                  required
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                  className={styles.input}
                  minLength={6}
                  required
                />
              </div>
              <p className={styles.hintBox}>Use uma senha com pelo menos 6 caracteres.</p>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <Button type="submit" className={styles.submitButton}>
              Cadastrar
            </Button>
          </form>

          <p className={styles.footer}>
            Já tem conta?{" "}
            <Link href="/login" className={styles.footerLink}>
              Entrar
            </Link>
          </p>
        </div>
      </motion.section>
    </div>
  );
}
