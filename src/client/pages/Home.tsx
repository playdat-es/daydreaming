import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { API_ROUTES, type PingResponse } from "@shared/api";
import { APP_PRODUCT_NAME } from "@shared/branding";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

export default function Home() {
  const {
    data: ping,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["ping"],
    queryFn: () => apiClient.get<PingResponse>(API_ROUTES.ping),
  });

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Typography variant="h3" component="h1">
          {APP_PRODUCT_NAME}
        </Typography>
        <Typography color="text.secondary">
          Express + React + MUI starter. The card below pings the server.
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Server ping
          </Typography>
          {isLoading && <Typography variant="body2">Loading…</Typography>}
          {error && (
            <Typography color="error" variant="body2">
              Error: {error.message}
            </Typography>
          )}
          {ping && (
            <Stack spacing={0.5}>
              <Typography variant="body1">Message: {ping.message}</Typography>
              <Typography variant="body2" color="text.secondary">
                Timestamp: {ping.timestamp}
              </Typography>
            </Stack>
          )}
        </Paper>
      </Stack>
    </Container>
  );
}
