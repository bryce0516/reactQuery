import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useInterval from "../util/useInterval";
import MemoCount from "./MemoCount";

type Props = {};

const First = (props: Props) => {
  const [postId, setPostId] = React.useState(-1);

  return (
    <div>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
    </div>
  );
};

function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return data;
    },
    // staleTime: 10 * (60 * 1000), // 10 min
    staleTime: 3 * 1000, // 3 sec
    // cacheTime: 15 * (60 * 1000), // 15 min
    cacheTime: 10 * 1000, // 10 sec
  });
}

function Posts({ setPostId }: any) {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching }: any = usePosts();
  const [count, setCount] = React.useState(0);
  const [start, setStart] = React.useState(false);
  useInterval(
    () => {
      setCount((prev) => prev + 1);
    },
    1000,
    start
  );
  React.useEffect(() => {
    setStart(true)
  }, [])
  return (
    <div>
        <MemoCount count={count} setStart={setStart}/>

      <div style={{ flexDirection: "row" }}>
        <h1>Posts</h1>
      </div>

      <div>
        {status === "loading" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((post: any) => (
                <p key={post.id}>
                  <a
                    onClick={() => setPostId(post.id)}
                    href="#"
                    style={
                      // We can access the query data here to show bold links for
                      // ones that are cached
                      queryClient.getQueryData(["post", post.id])
                        ? {
                            fontWeight: "bold",
                            color: "green",
                          }
                        : {}
                    }
                  >
                    {post.title}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
}

const getPostById = async (id: any) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return data;
};

function usePost(postId: any) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
}

function Post({ postId, setPostId }: any) {
  const { status, data, error, isFetching }: any = usePost(postId);

  return (
    <div>
      <div>
        <a onClick={() => setPostId(-1)} href="#">
          Back
        </a>
      </div>
      {!postId || status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data.title}</h1>
          <div>
            <p>{data.body}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}

export default First;
