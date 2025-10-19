import { createBrowserRouter } from "react-router-dom";
import { Test } from "../pages/Test";

export const router = createBrowserRouter([
  {
    path: "/test",
    element: <Test />,
  },
  // 향후 페이지 추가 시 아래 형식에 맞춰서 사용
  // {
  //   path: "/",
  //   element: <Layout />,
  //   children: [
  //     {
  //       path: "/",
  //       element: <Page />,
  //     },
  //   ],
  // },
]);
