import { initDialog } from "./dialog.js";
import { eventTimeToDate } from "./event.js";

const eventDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

const eventTimeFormatter = new Intl.DateTimeFormat("fr-FR", {
  hour: '2-digit',
  minute: '2-digit'
});

export function initEventDetailsDialog() {
  const dialog = initDialog("event-details");

  const deleteButtonElemenet = dialog.dialogElement.querySelector("[data-event-details-delete-button]");

  const editButtonElement = dialog.dialogElement.querySelector("[data-event-details-edit-button]");

  let currentEvent = null;

  document.addEventListener("event-click", (event) => {
    currentEvent = event.detail.event;
    fillEventDetailsDialog(dialog.dialogElement, event.detail.event);
    dialog.open();
  });

  deleteButtonElemenet.addEventListener("click", () => {
    dialog
      .close()
      .then(() => {
        deleteButtonElemenet.dispatchEvent(new CustomEvent("event-delete-request", {
          detail: {
            event: currentEvent
          },
          bubbles: true
        }));
      });
  });

  editButtonElement.addEventListener("click", () => {
    dialog
      .close()
      .then(() => {
        editButtonElement.dispatchEvent(new CustomEvent("event-edit-request", {
          detail: {
            event: currentEvent
          },
          bubbles: true
        }));
      });
  });
}

function fillEventDetailsDialog(parent, event) {
  const eventDetailsElement = parent.querySelector("[data-event-details]");
  const eventDetailsTitleElement = eventDetailsElement.querySelector("[data-event-details-title]");
  const eventDetailsDateElement = eventDetailsElement.querySelector("[data-event-details-date]");
  const eventDetailsStartTimeElement = eventDetailsElement.querySelector("[data-event-details-start-time]");
  const eventDetailsEndTimeElement = eventDetailsElement.querySelector("[data-event-details-end-time]");
  const eventDetailsDescriptionElement = eventDetailsElement.querySelector("[data-event-details-description]");

  eventDetailsTitleElement.textContent = event.title;
  eventDetailsDateElement.textContent = eventDateFormatter.format(event.date);
  eventDetailsStartTimeElement.textContent = eventTimeFormatter.format(
    eventTimeToDate(event, event.startTime)
  );
  eventDetailsEndTimeElement.textContent = eventTimeFormatter.format(
    eventTimeToDate(event, event.endTime)
  );

  eventDetailsDescriptionElement.textContent = event.description || "";

  eventDetailsElement.style.setProperty("--event-color", event.color);
}