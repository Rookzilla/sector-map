import { useI18n } from "../../i18n";
import {
  Eyebrow,
  HeroCopy,
  HeroPanel,
  LanguagePicker,
  Lede,
  StatusCard,
  Title,
  TopRow,
} from "./heroSection.styles";

export function HeroSection() {
  const { locale, setLocale, catalog } = useI18n();
  const { hero, language } = catalog.ui;

  return (
    <HeroPanel>
      <HeroCopy
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <TopRow>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <LanguagePicker>
            <span>{language.label}</span>
            <button type="button" className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")}>
              {language.english}
            </button>
            <button type="button" className={locale === "es" ? "active" : ""} onClick={() => setLocale("es")}>
              {language.spanish}
            </button>
          </LanguagePicker>
        </TopRow>
        <Title>{hero.title}</Title>
        <Lede>{hero.lede}</Lede>
      </HeroCopy>

      <StatusCard
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.7 }}
      >
        <span>{hero.statusLabel}</span>
        <strong>{hero.statusHeadline}</strong>
        <p>{hero.statusBody}</p>
      </StatusCard>
    </HeroPanel>
  );
}
