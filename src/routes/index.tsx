import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "@/layouts/BasicLayout";
import SignupLayout from "@/layouts/SignupLayout";
import HomeLayout from "@/layouts/HomeLayout";
import EmployeeManagementLayout from "@/layouts/EmployeeManagementLayout";
import EducationLayout from "@/layouts/EducationLayout";
import { Test } from "@/pages/Test";
import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { TermsOfServicePage } from "@/pages/TermsOfServicePage";
import { SignupDetailsPage } from "@/pages/SignupDetailsPage";
import { HomePage } from "@/pages/HomePage";
import { EmployeeManagementPage } from "@/pages/EmployeeManagementPage";
import { EmployeeAddPage } from "@/pages/EmployeeAddPage";
import { EducationManagementPage } from "@/pages/EducationManagementPage";
import ScheduleLayout from "@/layouts/ScheduleLayout";
import { SchedulePage } from "@/pages/SchedulePage";

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
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
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
        path: ":role/terms",
        element: <TermsOfServicePage />,
        handle: { title: "이용약관 동의" },
      },
      {
        path: ":role/details",
        element: <SignupDetailsPage />,
        handle: { title: "회원정보 입력" },
      },
    ],
  },
  {
    path: "/home",
    element: <HomeLayout />,
    handle: {
      title: "가게 이름",
    },
    children: [
      {
        index: true,
        element: <HomePage />,
        handle: {
          title: "멋쟁이알통",
        },
      },
    ],
  },
  {
    path: "/employee-management",
    element: <EmployeeManagementLayout />,
    children: [
      {
        index: true,
        element: <EmployeeManagementPage />,
      },
      {
        path: "add",
        element: <EmployeeAddPage />,
      },
    ],
  },
  {
    path: "/education-management",
    element: <EducationLayout />,
    handle: {
      title: "교육생성",
    },
    children: [
      {
        index: true,
        element: <EducationManagementPage />,
        handle: {
          title: "교육생성",
        },
      },
    ],
  },
  {
    path: "/schedule",
    element: <ScheduleLayout />,
    handle: {
      title: "이다연",
    },
    children: [
      {
        index: true,
        element: <SchedulePage />,
        handle: {
          title: "이다연",
        },
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
