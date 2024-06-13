import { useCustomHook } from "@/hooks/useCustumHook";
import { QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const { result } = renderHook(() => useCustomHook(), { wrapper });

await waitFor(() => expect(result.current.isSuccess).toBe(true));