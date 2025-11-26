import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @deprecated TODO trazer filme id do backend
 */
export function mapMovieNameId(name: string) {
  const mapping: Record<string, number> = {
    "Ainda Estou Aqui": 1,
    "Kill Bill Vol 1": 2,
    "Laranja Mecânica": 3,
    "Saneamento Básico (o filme)": 4,
    "Blade Runner: O Caçador de Androides": 5,
    "Click": 6,
    "Shrek": 7,
    "Gato de Botas 2": 8,
    "Toy Story 1": 9,
    "Taxi de Nova Iorque": 10,
    "A Viagem de Chihiro": 11,
    "O Mundo dos Pequeninos": 12,
    "A Casa Monstro": 13,
    "O Serviço de Entregas da Kiki": 14,
    "O Fantástico Sr. Raposo": 15,
    "Ilha dos Cachorros": 16,
    "Submarine": 17,
    "Drive": 18,
    "Taxi Driver": 19,
    "Meu Amigo Totoro": 20,
  };

  return mapping[name];
}
