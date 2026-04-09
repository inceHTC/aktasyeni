import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  initializeFirestore,
  getFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-3XT66CBNn7NtS1TmeHtdaA6pXNl8WNU",
  authDomain: "aktaspeynir.firebaseapp.com",
  projectId: "aktaspeynir",
  storageBucket: "aktaspeynir.firebasestorage.app",
  messagingSenderId: "1087494912467",
  appId: "1:1087494912467:web:b37dd931411f0625a1d726",
};

// Next.js hot reload'da çift init'i önle
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);

// Tarayıcıda IndexedDB cache'i aktif et (tekrar ziyarette ürünler anında gelir)
let db;
try {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
    }),
  });
} catch {
  // Zaten initialize edilmiş ise mevcut instance'ı kullan
  db = getFirestore(app);
}

export { db };
export default app;
