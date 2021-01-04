/* eslint-disable */
export type Weather = {
  weather?: "sunny" | "cloudy" | "rainy" | "rainyOrSnowy" | "snowy"
  rainfallRate?: number
  temperature?: number[]
  maxTemp?: number
  minTemp?: number
  description?: string
  clothing?: "superCool" | "cool" | "common" | "warm" | "superWarm"
}

export type Error = {
  code: number
  message: string
}
