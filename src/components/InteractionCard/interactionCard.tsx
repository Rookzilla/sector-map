import { useI18n } from "../../i18n";
import { Card } from "./interactionCard.styles";

export function InteractionCard() {
  const { catalog } = useI18n();

  return (
    <Card initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}>
      <span>{catalog.ui.interaction.title}</span>
      <p>{catalog.ui.interaction.description}</p>
    </Card>
  );
}
