import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { api } from "~/utils/api";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { PageLayout } from "~/components/layout";
import Image from "next/image";

dayjs.extend(relativeTime);

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>404 Page not Found</div>;

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>

      <PageLayout>
        <div className=" relative h-48 border-b border-slate-400 bg-slate-600">
          <Image
            src={data.profilePicture}
            alt={`${data.username ?? ""}'s profile pic`}
            width={64}
            height={64}
            className="absolute bottom-0 left-0 -mb-8 ml-4"
          />
          <div>{data.username}</div>
        </div>
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson,
  });

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const username = slug.replace("@", "");
  console.log(username);

  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpc: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [""], fallback: "blocking" };
};

export default ProfilePage;
