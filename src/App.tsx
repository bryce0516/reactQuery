import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, useRoutes } from "react-router-dom";
import Main from "./Main";
import First from "./First";
import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient(
    {
      defaultOptions: {
        queries: {
          staleTime: 0,
          cacheTime: 0
        },
      },
    }   
    // {
    //   defaultOptions: {
    //     queries: {
    //       cacheTime: 1000 * 60,
    //       staleTime: 1000 * 20,
    //       suspense: true,
    //     },
    //   },
    // }
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/1" element={<First />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
