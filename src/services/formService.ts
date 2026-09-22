import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

/**
 * Sauvegarde une demande générique dans Firestore
 * @param collectionName Le nom de la collection (ex: 'quotes', 'emergencies', etc.)
 * @param data L'objet de données à sauvegarder
 */
export const submitFormRequest = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      status: "nouveau" // statut par défaut
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error(`Erreur lors de la sauvegarde dans ${collectionName}:`, error);
    return { success: false, error };
  }
};
