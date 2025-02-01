export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("MyAppDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("verification")) {
        db.createObjectStore("verification", { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Failed to open IndexedDB");
  });
};

export const saveVerificationTime = async () => {
  const db = await openDB();
  const tx = db.transaction("verification", "readwrite");
  const store = tx.objectStore("verification");
  store.put({ id: "verified", time: Date.now() });
};

export const getVerificationTime = async () => {
  return new Promise(async (resolve) => {
    const db = await openDB();
    const tx = db.transaction("verification", "readonly");
    const store = tx.objectStore("verification");
    const request = store.get("verified");

    request.onsuccess = () => resolve(request.result?.time || null);
    request.onerror = () => resolve(null);
  });
};

export const clearVerification = async () => {
  const db = await openDB();
  const tx = db.transaction("verification", "readwrite");
  const store = tx.objectStore("verification");
  store.delete("verified");
};
