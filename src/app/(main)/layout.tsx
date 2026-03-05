import MainLayoutClient from "@/presentation/layouts/MainLayoutClient";

export default function MainLayout({ children }: { readonly children: React.ReactNode }) {
  return <MainLayoutClient>{children}</MainLayoutClient>;
}
