export function getFramePath(sequence: "sequence-1" | "sequence-2", index: number) {
  const frame = String(index).padStart(3, "0");
  return `/${sequence}/ezgif-frame-${frame}.jpg`;
}

export function getFrameList(sequence: "sequence-1" | "sequence-2", count: number) {
  return Array.from({ length: count }, (_, i) => getFramePath(sequence, i + 1));
}
