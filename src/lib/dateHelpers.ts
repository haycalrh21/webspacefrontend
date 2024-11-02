// utils/dateHelpers.ts
export function convertToWIB(timestamp: number | string): string {
  let date: Date;

  if (typeof timestamp === "string") {
    // Jika timestamp adalah string, konversi ke objek Date
    date = new Date(timestamp);
  } else {
    // Jika timestamp adalah number, buat objek Date
    date = new Date(timestamp * 1000);
  }

  // Pastikan date adalah valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  const wibOffset = 7 * 60 * 60 * 1000; // WIB is UTC+7 in milliseconds
  const localDate = new Date(date.getTime() + wibOffset);

  const day = String(localDate.getUTCDate()).padStart(2, "0");
  const month = String(localDate.getUTCMonth() + 1).padStart(2, "0");
  const year = localDate.getUTCFullYear();
  const hours = String(localDate.getUTCHours()).padStart(2, "0");
  const minutes = String(localDate.getUTCMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes} WIB`;
}
