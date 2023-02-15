import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

type Props = {};

const Main = (props: Props) => {
  const queryClient = useQueryClient();
  const [intervalMs, setIntervalMs] = React.useState(1000 * 60 * 60);
  const [value, setValue] = React.useState("");

  const { status, data, error, isFetching }: any = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      return res.data;
    },
    // Refetch the data every second
    refetchInterval: intervalMs,
  });
  console.log("this is data", data);
  // const addMutation = useMutation({
  //   mutationFn: (add) => fetch(`https://jsonplaceholder.typicode.com/posts/${add}`),
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts', ] }),
  // })

  // const clearMutation = useMutation({
  //   mutationFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/1/comments`),
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  // })

  if (status === "loading") return <h1>Loading...</h1>;
  if (status === "error") return <span>Error: {error.message}</span>;

  return (
    <div>
      <h1>Auto Refetch with stale-time set to 1s</h1>
      <p>
        This example is best experienced on your own machine, where you can open
        multiple tabs to the same localhost server and see your changes
        propagate between the two.
      </p>
      <label>
        Query Interval speed (ms):{" "}
        <input
          value={intervalMs}
          onChange={(ev) => setIntervalMs(Number(ev.target.value))}
          type="number"
          step="100"
        />{" "}
        <span
          style={{
            display: "inline-block",
            marginLeft: ".5rem",
            width: 10,
            height: 10,
            background: isFetching ? "green" : "transparent",
            transition: !isFetching ? "all .3s ease" : "none",
            borderRadius: "100%",
            transform: "scale(2)",
          }}
        />
      </label>
      <h2>post List</h2>
      <ul>
        {data.map((item: any, index: number) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>

      {/* <form
      onSubmit={(event) => {
        event.preventDefault()
        addMutation.mutate(value as any, {
          onSuccess: () => {
            setValue('')
          },
        })
      }}
    >
      <input
        placeholder="enter something"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />
    </form>
    <ul>
      {data.map((item :any) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
    <div>
      <button
        onClick={() => {
          clearMutation.mutate()
        }}
      >
        Clear All
      </button>
    </div> */}
    </div>
  );
};

export default Main;
