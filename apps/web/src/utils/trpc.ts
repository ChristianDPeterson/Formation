import { createTRPCReact } from "@trpc/react-query"
import type { AppRouter } from "@formation/api"

export const trpc = createTRPCReact<AppRouter>()
