import { Card } from "./interactionCard.styles";

export function InteractionCard() {
  return (
    <Card initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}>
      <span>Interaction</span>
      <p>
        Drag across the chart to pan, use zoom controls for range, and click a system to lock its dossier. Connected routes brighten;
        hostile alignment at the far endpoint marks in red.
      </p>
    </Card>
  );
}
