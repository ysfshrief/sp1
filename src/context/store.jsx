import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { seedGroups, seedStudents, seedLessons, seedAnnouncements, DEMO_STUDENT } from "../data/seed.js";

const StoreCtx = createContext(null);
export const useStore = () => useContext(StoreCtx);

const todayISO = () => new Date().toISOString().slice(0, 10);

export function StoreProvider({ children }) {
  const [route, setRoute] = useState({ name: "landing", params: {} });
  const [session, setSession] = useState(null); // {role:'student'|'admin', id}

  const [groups, setGroups] = useState(seedGroups);
  const [students, setStudents] = useState(seedStudents);
  const [lessons, setLessons] = useState(seedLessons);
  const [announcements, setAnnouncements] = useState(seedAnnouncements);
  // attendance: { [date]: { [studentId]: { method:'qr'|'manual', at:'HH:MM' } } }
  const [attendance, setAttendance] = useState({});
  // grades: list of {id, studentId, label, score, max, date}
  const [grades, setGrades] = useState(() => {
    const out = [];
    const labels = ["Reported Speech quiz", "Crime & Society vocab", "Unit 3 writing"];
    seedStudents.slice(0, 60).forEach((s, i) => {
      labels.forEach((label, j) => {
        const max = 20;
        out.push({ id: `gr${i}-${j}`, studentId: s.id, label, score: 12 + ((i + j * 3) % 9), max, date: "2026-06-1" + (j + 2) });
      });
    });
    return out;
  });

  const go = useCallback((name, params = {}) => {
    setRoute({ name, params });
    window.scrollTo(0, 0);
  }, []);

  /* ---------- auth ---------- */
  const login = useCallback((role, email, password) => {
    if (role === "admin" && email === "secretary@special1.com" && password === "123456") {
      setSession({ role: "admin", id: "admin" }); go("a-overview"); return true;
    }
    if (role === "student" && email === "student@special1.com" && password === "123456") {
      setSession({ role: "student", id: DEMO_STUDENT.id }); go("s-home"); return true;
    }
    return false;
  }, [go]);
  const logout = useCallback(() => { setSession(null); go("landing"); }, [go]);

  /* ---------- derived ---------- */
  const studentsByGroup = useCallback((gid) => students.filter((s) => s.groupId === gid), [students]);
  const groupById = useCallback((gid) => groups.find((g) => g.id === gid), [groups]);
  const lessonsByGroup = useCallback((gid) => lessons.filter((l) => l.groupId === gid).sort((a, b) => b.date.localeCompare(a.date)), [lessons]);
  const currentStudent = useMemo(() => students.find((s) => s.id === session?.id), [students, session]);

  /* ---------- groups ---------- */
  const saveGroup = useCallback((g) => {
    setGroups((prev) => g.id ? prev.map((x) => x.id === g.id ? g : x) : [...prev, { ...g, id: "g" + Date.now() }]);
  }, []);
  const deleteGroup = useCallback((gid) => {
    setGroups((prev) => prev.filter((g) => g.id !== gid));
    setStudents((prev) => prev.map((s) => s.groupId === gid ? { ...s, groupId: null } : s));
  }, []);
  const mergeGroups = useCallback((fromId, intoId) => {
    setStudents((prev) => prev.map((s) => s.groupId === fromId ? { ...s, groupId: intoId } : s));
    setGroups((prev) => prev.filter((g) => g.id !== fromId));
  }, []);

  /* ---------- students ---------- */
  const saveStudent = useCallback((s) => {
    setStudents((prev) => {
      if (s.id && prev.some((x) => x.id === s.id)) return prev.map((x) => x.id === s.id ? s : x);
      const id = s.id || ("S" + Date.now());
      return [...prev, { ...s, id, code: id }];
    });
  }, []);
  const deleteStudent = useCallback((id) => setStudents((prev) => prev.filter((s) => s.id !== id)), []);
  const moveStudent = useCallback((id, gid) => setStudents((prev) => prev.map((s) => s.id === id ? { ...s, groupId: gid } : s)), []);

  /* ---------- lessons (post-lesson publish workflow) ---------- */
  const publishLesson = useCallback((lesson) => {
    setLessons((prev) => {
      if (lesson.id && prev.some((l) => l.id === lesson.id)) return prev.map((l) => l.id === lesson.id ? lesson : l);
      return [{ ...lesson, id: "L" + Date.now(), published: true, publishedBy: "Secretary" }, ...prev];
    });
  }, []);
  const deleteLesson = useCallback((id) => setLessons((prev) => prev.filter((l) => l.id !== id)), []);

  /* ---------- announcements ---------- */
  const saveAnnouncement = useCallback((a) => {
    setAnnouncements((prev) => a.id ? prev.map((x) => x.id === a.id ? a : x) : [{ ...a, id: "A" + Date.now() }, ...prev]);
  }, []);
  const deleteAnnouncement = useCallback((id) => setAnnouncements((prev) => prev.filter((a) => a.id !== id)), []);

  /* ---------- attendance ---------- */
  const mark = useCallback((studentId, method = "manual", date = todayISO()) => {
    const at = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    setAttendance((prev) => {
      const day = { ...(prev[date] || {}) };
      const already = !!day[studentId];
      day[studentId] = { method, at };
      return { ...prev, [date]: day };
    });
    return true;
  }, []);
  const unmark = useCallback((studentId, date = todayISO()) => {
    setAttendance((prev) => {
      const day = { ...(prev[date] || {}) };
      delete day[studentId];
      return { ...prev, [date]: day };
    });
  }, []);
  // attendance percentage per student across recorded days where their group met
  const attendanceRate = useCallback((studentId) => {
    const dates = Object.keys(attendance);
    if (!dates.length) return null;
    let present = 0;
    dates.forEach((d) => { if (attendance[d][studentId]) present++; });
    return Math.round((present / dates.length) * 100);
  }, [attendance]);

  const addGrade = useCallback((g) => setGrades((prev) => [...prev, { ...g, id: "gr" + Date.now() }]), []);

  const value = {
    route, go, session, login, logout,
    groups, students, lessons, announcements, attendance, grades,
    studentsByGroup, groupById, lessonsByGroup, currentStudent,
    saveGroup, deleteGroup, mergeGroups,
    saveStudent, deleteStudent, moveStudent,
    publishLesson, deleteLesson,
    saveAnnouncement, deleteAnnouncement,
    mark, unmark, attendanceRate, addGrade,
    todayISO,
  };
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}
