import { ref } from "vue";
import { defineStore } from "pinia";

// Define la interfaz para un modal
type Modal = {
  id: number;
  name: string;
  show: boolean;
};

type ModalName =
  | "request-friends"
  | "messages"
  | "message-friends"
  | "profile"
  | "settings"
  | "search-friends"
  | "search"

export const useShowModalStore = defineStore("showModal", () => {
  const showModal = ref(<Modal[]>[
    {
      id: 0,
      name: "request-friends",
      show: false,
    },
    {
      id: 1,
      name: "messages",
      show: false,
    },
    {
      // deleted
      id: 2,
      name: "notifications",
      show: false,
    },
    {
      id: 3,
      name: "message-friends",
      show: false,
    },
    {
      id: 4,
      name: "profile",
      show: false,
    },
    {
      id: 5,
      name: "settings",
      show: false,
    },
     {
      id: 6,
      name: "search",
      show: false,
     }
  ]);

  const setActiveModal = (modalName: ModalName, action: 'open' | 'close' | null): void => {
    showModal.value.forEach((modal) => {
      if (modal.name !== modalName) {
        modal.show = false;
      }
      if (modal.name === modalName) {
        showModal.value[modal.id].show = !showModal.value[modal.id].show;
      }
      // message-friends
      if (modal.name === "message-friends" && action === "close") {
        showModal.value[3].show = false;
      }
      if (modal.name === "message-friends" && action === "open") {
        showModal.value[3].show = true;
      }
    });
  };

  return { showModal, setActiveModal };
});
