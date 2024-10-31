// utils/dateHelpers.ts
export function convertToWIB(timestamp: number): string {
  // Mengonversi timestamp detik ke milidetik dan membuat objek Date
  const date = new Date(timestamp * 1000);
  const wibOffset = 7 * 60 * 60 * 1000; // WIB is UTC+7 in milliseconds
  const localDate = new Date(date.getTime() + wibOffset);

  const day = String(localDate.getDate()).padStart(2, "0");
  const month = String(localDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const year = localDate.getFullYear();
  const hours = String(localDate.getHours()).padStart(2, "0");
  const minutes = String(localDate.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes} WIB`;
}
