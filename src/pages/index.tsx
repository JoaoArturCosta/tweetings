import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";

import { api } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { LoadingPage, LoadingSpinner } from "~/components/loading";
import { useState } from "react";
import toast from "react-hot-toast";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postsView";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) toast.error(errorMessage[0]);
      else toast.error("Failed to Post! Please try again");
    },
  });

  if (!user) return null;

  return (
    <div className="flex w-full gap-3 p-8">
      <Image
        src={user.profileImageUrl}
        alt="Profile Image"
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <input
        placeholder="Type some Shit Posting"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
        disabled={isPosting}
      />
      {input !== "" && !isPosting && (
        <button
          onClick={() => mutate({ content: input })}
          className="rounded-full bg-blue-500 px-6 font-bold text-white hover:bg-blue-700"
        >
          Post
        </button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading)
    return (
      <div className="flex grow">
        <LoadingPage />
      </div>
    );

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col overflow-y-auto">
      {data?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: usersLoaded, isSignedIn } = useUser();

  // Start fetching asap
  api.posts.getAll.useQuery();

  //Return empty div if user isn't loaded
  if (!usersLoaded) return <div />;

  return (
    <>
      <PageLayout>
        <div className="border-b border-slate-400 p-4">
          <div className="  text-4xl font-bold ">Home</div>
          {isSignedIn ? (
            <CreatePostWizard />
          ) : (
            <div className="p-4 text-xl"> Hi , Sign In to Start Posting ! </div>
          )}
        </div>
        <Feed />
      </PageLayout>
    </>
  );
};

export default Home;
