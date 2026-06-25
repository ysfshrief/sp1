// Initial data only — everything is editable from the admin console at runtime.

export const STAGES = [
  "First Preparatory",
  "Second Preparatory",
  "Third Preparatory",
  "First Secondary",
  "Second Secondary",
  "Third Secondary",
];

export const HALLS = ["Hall 1", "Hall 2", "Hall 3", "Revision Room"];

// Real-world starting groups from the centre.
export const seedGroups = [
  { id: "g1", code: "1P-EXP", stage: "First Preparatory", label: "Experimental Schools", days: ["Saturday", "Tuesday"], time: "17:30", hall: "Hall 1", capacity: 30 },
  { id: "g2", code: "1P-LNG", stage: "First Preparatory", label: "Private / Languages Schools", days: ["Monday", "Thursday"], time: "17:30", hall: "Hall 2", capacity: 30 },
  { id: "g3", code: "2P-LNG", stage: "Second Preparatory", label: "Private / Languages Schools", days: ["Saturday", "Tuesday"], time: "19:00", hall: "Hall 1", capacity: 30 },
  { id: "g4", code: "2P-EXG", stage: "Second Preparatory", label: "Experimental — Girls", days: ["Monday", "Thursday"], time: "16:00", hall: "Hall 3", capacity: 28 },
  { id: "g5", code: "2P-EXB", stage: "Second Preparatory", label: "Experimental — Boys", days: ["Monday", "Thursday"], time: "19:00", hall: "Hall 3", capacity: 28 },
  { id: "g6", code: "3P-EXB", stage: "Third Preparatory", label: "Experimental — Boys", days: ["Sunday", "Wednesday"], time: "14:30", hall: "Hall 1", capacity: 28 },
  { id: "g7", code: "3P-EXG", stage: "Third Preparatory", label: "Experimental — Girls", days: ["Sunday", "Wednesday"], time: "16:00", hall: "Hall 2", capacity: 28 },
  { id: "g8", code: "3P-LNG", stage: "Third Preparatory", label: "Private / Languages Schools", days: ["Sunday", "Wednesday"], time: "19:00", hall: "Hall 1", capacity: 30 },
  { id: "g9", code: "1S-A", stage: "First Secondary", label: "Group A", days: ["Saturday", "Tuesday"], time: "16:00", hall: "Hall 2", capacity: 32 },
  { id: "g10", code: "1S-B", stage: "First Secondary", label: "Group B", days: ["Monday", "Thursday"], time: "14:30", hall: "Hall 2", capacity: 32 },
  { id: "g11", code: "2S-A", stage: "Second Secondary", label: "Group A", days: ["Sunday", "Wednesday"], time: "17:30", hall: "Hall 1", capacity: 32 },
  { id: "g12", code: "2S-B", stage: "Second Secondary", label: "Group B", days: ["Monday", "Thursday"], time: "13:00", hall: "Hall 3", capacity: 32 },
  { id: "g13", code: "3S-A", stage: "Third Secondary", label: "Group A", days: ["Saturday", "Tuesday"], time: "14:30", hall: "Hall 1", capacity: 34 },
  { id: "g14", code: "3S-B", stage: "Third Secondary", label: "Group B", days: ["Sunday", "Wednesday"], time: "20:30", hall: "Hall 2", capacity: 34 },
];

const firstNames = ["Youssef", "Malak", "Omar", "Hana", "Ali", "Jana", "Mazen", "Lina", "Karim", "Salma", "Adam", "Nour", "Zeyad", "Farida", "Hamza", "Mariam", "Seif", "Layla", "Tarek", "Habiba", "Marwan", "Rital", "Khaled", "Dina", "Ziad", "Yara", "Amir", "Sara", "Fady", "Reem"];
const lastNames = ["Hassan", "Ibrahim", "Mahmoud", "Saad", "Fathy", "Gamal", "Nabil", "Sherif", "Adel", "Hamdy", "Mostafa", "Ragab", "Lotfy", "Sami", "Zaki"];

function makeStudents() {
  const out = [];
  let n = 1;
  seedGroups.forEach((g) => {
    const count = 8 + (parseInt(g.id.replace("g", ""), 10) % 5); // 8–12 per group
    for (let i = 0; i < count; i++) {
      const fn = firstNames[(n * 7 + i) % firstNames.length];
      const ln = lastNames[(n * 3 + i) % lastNames.length];
      const id = "S" + String(1000 + n);
      out.push({
        id,
        code: id, // QR payload = student code
        name: `${fn} ${ln}`,
        phone: "+20 1" + (Math.floor(Math.random() * 4)) + Math.floor(10000000 + Math.random() * 89999999),
        guardianPhone: "+20 12" + Math.floor(10000000 + Math.random() * 89999999),
        stage: g.stage,
        groupId: g.id,
        joined: "2025-09",
        status: "Active",
        balance: i % 6 === 0 ? "Due" : "Paid",
        avatar: null,
      });
      n++;
    }
  });
  return out;
}

export const seedStudents = makeStudents();

// One demo student we control for the student-side login.
export const DEMO_STUDENT = seedStudents.find((s) => s.groupId === "g13") || seedStudents[0];

// Lessons published per group (the post-lesson workflow output).
export const seedLessons = [
  {
    id: "L1", groupId: "g13", date: "2026-06-23", title: "Reported Speech — Statements & Questions",
    homework: "Finish exercises 4–9 on reported statements. Convert each direct quote, then check tense shift.",
    homeworkPdf: "reported-speech-hw.pdf",
    recitation: "Recite the 12 reporting verbs with one example sentence each.",
    recitationPdf: "reporting-verbs-list.pdf",
    examNext: true, examDetails: "Short quiz on reported speech (15 min) at the start of next lesson.",
    notes: "Strong session. Focus revision on backshift with modals — several students slipped on 'will → would'.",
    published: true, publishedBy: "Secretary",
  },
  {
    id: "L2", groupId: "g13", date: "2026-06-20", title: "Vocabulary — Crime & Society",
    homework: "Learn the 20-word set. Write 8 sentences using at least one collocation each.",
    homeworkPdf: "crime-society-vocab.pdf",
    recitation: "Recite the full 20-word set with meanings.",
    recitationPdf: null,
    examNext: false, examDetails: "",
    notes: "Bring your booklet next time — we start the writing task.",
    published: true, publishedBy: "Secretary",
  },
];

export const seedAnnouncements = [
  { id: "A1", date: "2026-06-23", scope: "All groups", title: "Centre closed on Friday 4 July", body: "The centre will be closed for the public holiday. All Friday-adjacent groups keep their normal times." },
  { id: "A2", date: "2026-06-21", scope: "Third Secondary", title: "Mock exam week begins Sunday", body: "Third Secondary groups sit a full mock paper next week. Arrive 15 minutes early with your candidate number." },
];

// Today's attendance log (per student per lesson date).
export const seedAttendance = []; // filled at runtime by the scanner

export const DAYS = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export function fmtTime(t) {
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${ap}`;
}
