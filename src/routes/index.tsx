import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import SignupLayout from "../layouts/SignupLayout";
import { Test } from "../pages/Test";
import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { TermsOfServicePage } from "../pages/TermsOfServicePage";

export const router = createBrowserRouter([
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignupLayout />,
    handle: {
      title: "회원 구분",
    },
    children: [
      {
        index: true,
        element: <SignupPage />,
        handle: {
          title: "회원 구분",
        },
      },
      {
        path: "terms",
        element: <TermsOfServicePage />,
        handle: { title: "이용약관 동의" },
      },
    ],
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
