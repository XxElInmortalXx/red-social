import type { DocumentData } from "firebase/firestore";

export type firebaseResponse = {
    error: boolean;
    message: string;
    data?: DocumentData;
}