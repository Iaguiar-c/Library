export function convertToImageUrl(byteArray) {
    const blob = new Blob([new Uint8Array(byteArray)], { type: "image/jpeg" });
    return URL.createObjectURL(blob);
}
  