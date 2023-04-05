import superjson from "superjson";
import { prisma } from "./../db";
import { appRouter } from "./../api/root";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";

export const generateSSGHelper = () =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson,
  });
