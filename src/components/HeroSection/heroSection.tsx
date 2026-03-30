import { Eyebrow, HeroCopy, HeroPanel, Lede, StatusCard, Title } from "./heroSection.styles";

export function HeroSection() {
  return (
    <HeroPanel>
      <HeroCopy
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Eyebrow>Gothic Sector - Sub Sector Ignacia</Eyebrow>
        <Title>Cowled Abyss</Title>
        <Lede>
          Pan the sector chart, track fortress systems, and inspect planet-level threats with high-command intelligence reveals.
        </Lede>
      </HeroCopy>

      <StatusCard
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.7 }}
      >
        <span>Astropathic Net</span>
        <strong>47 sub-sectors indexed</strong>
        <p>19 command systems are mocked below with live briefings for planetary war conditions.</p>
      </StatusCard>
    </HeroPanel>
  );
}
