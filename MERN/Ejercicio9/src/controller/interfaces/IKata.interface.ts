export enum KataLevel {
  EASY = "Fácil",
  MEDIUM = "Media",
  HIGH = "Difícil"
}

export interface IKata {
  name: string,
  description: string,
  level: KataLevel,
  date: Date,
  chances: number,
  creator: string,
  stars: object[],
  participants: string[],
  solution: string
}

export interface IKataValoration {
  id: string,
  stars: number
}
