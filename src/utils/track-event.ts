import { useSessionStore } from "@/store/session-store";
import posthog from "posthog-js";

export function trackEvent(name: string, properties = {}) {
  const user_id = useSessionStore.getState().id;
  const env = import.meta.env.VITE_PUBLIC_ENV;

  if (!user_id) {
    throw new Error("Posthog: user_id null");
  }

  if (!env) {
    throw new Error("Posthog: environment null");
  }

  posthog.capture(name, {
    ...properties,
    usuario_id: user_id,
    contexto: "web",
    ambiente: env,
    timestamp: new Date().toISOString(),
  });
}
