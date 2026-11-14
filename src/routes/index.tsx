import { createFileRoute } from "@tanstack/react-router";

import { PeepalApp } from "@/features/peepal/PeepalApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PEEPAL — City Bus & Transit" },
      { name: "description", content: "Find routes, explore transit tools, and view live bus tracking when verified PEEPAL service data is available." },
      { property: "og:title", content: "PEEPAL — City Bus & Transit" },
      { property: "og:description", content: "Passenger, student, driver, and transit administration tools for PEEPAL." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PeepalApp,
});