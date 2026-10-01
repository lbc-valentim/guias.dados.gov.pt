"use client";

import { CardGeneral } from "@ama-pt/agora-design-system";

export function GuideCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <CardGeneral
      variant="white"
      titleText={title}
      descriptionText={description}
      anchor={{
        href,
        children: "Abrir",
        "aria-label": `Abrir: ${title}`,
      }}
    />
  );
}
