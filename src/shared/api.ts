export interface PingResponse {
  message: string;
  timestamp: string;
}

export interface HealthResponse {
  ok: boolean;
  uptimeSeconds: number;
  startedAt: string;
}

export interface ApiError {
  error: string;
}

export const API_ROUTES = {
  ping: "/api/ping",
  health: "/api/health",
} as const;
