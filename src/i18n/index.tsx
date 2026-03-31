import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { enCatalog } from "./locales/en/catalog";
import { esCatalog } from "./locales/es/catalog";
import { type AppLocale, type I18nCatalog } from "./types";

type I18nContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  catalog: I18nCatalog;
};

const CATALOG_BY_LOCALE: Record<AppLocale, I18nCatalog> = {
  en: enCatalog,
  es: esCatalog,
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

type I18nProviderProps = {
  children: ReactNode;
};

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocale] = useState<AppLocale>("en");

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      catalog: CATALOG_BY_LOCALE[locale],
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}

export type { AppLocale, I18nCatalog, UiCopy } from "./types";
