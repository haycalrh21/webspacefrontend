// utils/dateHelpers.ts
export function convertToWIB(timestamp: string): string {
  const date = new Date(timestamp); // Mengonversi string timestamp menjadi objek Date

  const wibOffset = 7 * 60 * 60 * 1000; // WIB adalah UTC+7 dalam milidetik
  const localDate = new Date(date.getTime() + wibOffset);

  const day = String(localDate.getUTCDate()).padStart(2, "0");
  const month = String(localDate.getUTCMonth() + 1).padStart(2, "0");
  const year = localDate.getUTCFullYear();
  const hours = String(localDate.getUTCHours()).padStart(2, "0");
  const minutes = String(localDate.getUTCMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes} WIB`;
}
