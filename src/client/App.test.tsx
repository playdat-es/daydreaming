// @vitest-environment jsdom

import { APP_PRODUCT_NAME } from "@shared/branding";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import App from "./App";

const server = setupServer(
  http.get("/api/ping", () =>
    HttpResponse.json({
      message: "pong",
      timestamp: "2026-01-01T00:00:00.000Z",
    }),
  ),
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderWithProviders(ui: ReactNode, initialPath = "/") {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 0 } },
  });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[initialPath]}>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("App", () => {
  test("renders app title", () => {
    renderWithProviders(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: APP_PRODUCT_NAME }),
    ).toBeInTheDocument();
  });

  test("shows ping response after fetch resolves", async () => {
    renderWithProviders(<App />);
    await waitFor(() => {
      expect(screen.getByText(/message: pong/i)).toBeInTheDocument();
    });
  });

  test("shows error message when the server returns 500", async () => {
    server.use(
      http.get("/api/ping", () =>
        HttpResponse.json({ error: "Internal Server Error" }, { status: 500 }),
      ),
    );
    renderWithProviders(<App />);
    await waitFor(() => {
      expect(screen.getByText(/error:/i)).toBeInTheDocument();
    });
  });
});
