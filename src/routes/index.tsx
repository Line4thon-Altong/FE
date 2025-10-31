import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "@/layouts/BasicLayout";
import SignupLayout from "@/layouts/SignupLayout";
import HomeLayout from "@/layouts/HomeLayout";
import EmployeeManagementLayout from "@/layouts/EmployeeManagementLayout";
import EducationLayout from "@/layouts/EducationLayout";
import EducationDetailsLayout from "@/layouts/EducationDetailsLayout";
import { Test } from "@/pages/Test";
import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { TermsOfServicePage } from "@/pages/TermsOfServicePage";
import { SignupDetailsPage } from "@/pages/SignupDetailsPage";
import { HomePageOwner } from "@/pages/HomePageOwner";
import { HomePageEmployee } from "@/pages/HomePageEmployee";
import { EmployeeManagementPage } from "@/pages/EmployeeManagementPage";
import { EmployeeAddPage } from "@/pages/EmployeeAddPage";
import { EducationManagementPage } from "@/pages/EducationManagementPage";
import { EducationDetailsPage } from "@/pages/EducationDetailsPage";
import { MyPage } from "@/pages/MyPage";
import { AccountPage } from "@/pages/AccountPage";
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
      // --- 사장님용 홈 ---
      {
        path: "owner",
        element: <HomePageOwner />,
        handle: {
          title: "멋쟁이알통",
        },
      },
      // --- 직원용 홈 ---
      {
        path: "employee",
        element: <HomePageEmployee />,
        handle: {
          title: "이다연",
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
    path: "/education-details",
    element: <EducationDetailsLayout />,
    handle: {
      title: "교육 상세",
    },
    children: [
      {
        index: true,
        element: <EducationDetailsPage />,
        handle: {
          title: "주문받고 결제하는 기본 교육",
        },
      },
    ],
  },
  {
    path: "/mypage",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <MyPage />,
        handle: {
          title: "멋쟁이알통",
        },
      },
    ],
  },
  {
    path: "/mypage/account",
    element: <SignupLayout isLogo={false} />,
    handle: {
      title: "계정",
    },
    children: [
      {
        index: true,
        element: <AccountPage />,
        handle: {
          title: "계정",
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
