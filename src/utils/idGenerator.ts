export function generateWorkerId(role: string, sequence: number): string {
  // Format: [Role Initial]-[Year]-[5-digit sequence]
  const roleInitial = role.charAt(0).toUpperCase();
  const year = new Date().getFullYear().toString().slice(-2);
  const seq = sequence.toString().padStart(5, '0');
  return `${roleInitial}${year}${seq}`;
}