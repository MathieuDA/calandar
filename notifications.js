import { initToaster } from "./toaster.js";

export function initNotifications() {
  const toaster = initToaster(document.body);

  document.addEventListener("event-create", () => {
    toaster.success("Événement créé");
  });

  document.addEventListener("event-delete", () => {
    toaster.success("Événement supprimé");
  });

  document.addEventListener("event-edit", () => {
    toaster.success("Événement modifié");
  });
}