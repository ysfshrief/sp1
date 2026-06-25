import React from "react";
import { StoreProvider, useStore } from "./context/store.jsx";
import { ToastHost } from "./components/ui.jsx";
import { Landing } from "./pages/Landing.jsx";
import { Login } from "./pages/Login.jsx";
import {
  StudentHome, StudentWork, StudentPass, StudentSchedule, StudentProfile, StudentNotifications,
} from "./pages/Student.jsx";
import { AdminOverview } from "./pages/AdminOverview.jsx";
import { AdminAttendance } from "./pages/AdminAttendance.jsx";
import { AdminGroups } from "./pages/AdminGroups.jsx";
import { AdminStudents } from "./pages/AdminStudents.jsx";
import { AdminPublish } from "./pages/AdminPublish.jsx";
import { AdminLibrary } from "./pages/AdminLibrary.jsx";
import { AdminAnnounce } from "./pages/AdminAnnounce.jsx";

const STUDENT_ROUTES = {
  "s-home": StudentHome, "s-work": StudentWork, "s-pass": StudentPass,
  "s-schedule": StudentSchedule, "s-profile": StudentProfile, "s-notifications": StudentNotifications,
};
const ADMIN_ROUTES = {
  "a-overview": AdminOverview, "a-attendance": AdminAttendance, "a-groups": AdminGroups,
  "a-students": AdminStudents, "a-publish": AdminPublish, "a-library": AdminLibrary, "a-announce": AdminAnnounce,
};

function Router() {
  const { route, session, go } = useStore();
  const name = route.name;

  if (name === "landing") return <Landing />;
  if (name === "login") return <Login />;

  if (name in STUDENT_ROUTES) {
    if (session?.role !== "student") { go("login"); return null; }
    const Page = STUDENT_ROUTES[name];
    return <Page />;
  }
  if (name in ADMIN_ROUTES) {
    if (session?.role !== "admin") { go("login"); return null; }
    const Page = ADMIN_ROUTES[name];
    return <Page />;
  }
  return <Landing />;
}

export default function App() {
  return (
    <StoreProvider>
      <ToastHost>
        <Router />
      </ToastHost>
    </StoreProvider>
  );
}
