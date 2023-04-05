import { type NextPage } from "next";
import Head from "next/head";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const SinglePost: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl"></div>
      </main>
    </>
  );
};

export default SinglePost;
