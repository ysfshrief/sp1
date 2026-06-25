import React, { useState } from "react";
import {
  ArrowRight, CheckCircle2, Star, Quote, ChevronDown, Phone, MapPin,
  ClipboardCheck, Mic2, FileText, QrCode, CalendarDays, GraduationCap, Menu, X, Clock,
} from "lucide-react";
import { useStore } from "../context/store.jsx";
import { Button, Wordmark, Seal, TeacherPhoto, Eyebrow, Card, Chip } from "../components/ui.jsx";
import { SecretaryContactModal, CENTRE } from "../components/Contact.jsx";
import { STAGES } from "../data/seed.js";
import { Footer } from "../components/Footer.jsx";

export function Landing() {
  const { go } = useStore();
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState(0);
  const [contact, setContact] = useState(false);

  const nav = [["About", "about"], ["Results", "results"], ["Stages", "stages"], ["Features", "features"], ["Contact", "contact"]];
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenu(false); };

  return (
    <div style={{ background: "var(--ivory)" }}>
      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(251,249,244,.82)", backdropFilter: "blur(14px)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 74 }}>
          <div onClick={() => go("landing")} style={{ cursor: "pointer" }}><Wordmark size={42} /></div>
          <nav style={{ display: "flex", alignItems: "center", gap: 30 }} className="lp-nav">
            {nav.map(([t, id]) => <span key={id} onClick={() => scrollTo(id)} style={{ fontSize: 14.5, fontWeight: 600, color: "var(--ink)", cursor: "pointer", opacity: .85 }}>{t}</span>)}
            <Button size="sm" onClick={() => go("login")}>Sign in</Button>
          </nav>
          <button onClick={() => setMenu(!menu)} className="lp-burger" style={{ display: "none", background: "var(--ivory-2)", border: "none", borderRadius: 10, width: 42, height: 42 }}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && (
          <div className="lp-mobile" style={{ display: "none", flexDirection: "column", gap: 6, padding: "8px 24px 18px", borderTop: "1px solid var(--line)" }}>
            {nav.map(([t, id]) => <span key={id} onClick={() => scrollTo(id)} style={{ padding: "12px 0", fontSize: 16, fontWeight: 600, borderBottom: "1px solid var(--line)" }}>{t}</span>)}
            <Button full onClick={() => go("login")} style={{ marginTop: 10 }}>Sign in</Button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div className="wrap hero-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 50, alignItems: "center", padding: "70px 24px 80px" }}>
          <div className="rise">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 99, padding: "7px 14px 7px 8px", marginBottom: 24, boxShadow: "var(--shadow-sm)" }}>
              <span style={{ display: "inline-flex", gap: 1 }}>{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--brass)" color="var(--brass)" />)}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--green)" }}>Trusted by 600+ families across the centre</span>
            </div>
            <h1 style={{ fontSize: "clamp(38px, 8vw, 62px)", color: "var(--green)", lineHeight: 1.02, marginBottom: 22 }}>
              English, taught<br />the way it <span style={{ fontStyle: "italic", color: "var(--brass)" }}>sticks.</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.62, color: "var(--ink)", opacity: .8, maxWidth: 500, marginBottom: 30 }}>
              Special 1 is the English centre of Mr. Hady Attia — a place where every group has a plan, every student is followed, and every parent can see the homework, recitation, grades and attendance in one tap.
            </p>
            <div style={{ display: "flex", gap: 13, flexWrap: "wrap", marginBottom: 34 }}>
              <Button size="lg" variant="brass" icon={ArrowRight} onClick={() => go("login")}>Open the student portal</Button>
              <Button size="lg" variant="ghost" onClick={() => scrollTo("about")}>Meet Mr. Hady</Button>
            </div>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              {[["14", "active groups"], ["6", "school stages"], ["98%", "attendance kept"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: 30, fontWeight: 600, color: "var(--green)" }}>{n}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher portrait with seal + floating proof cards */}
          <div style={{ position: "relative" }} className="rise">
            <div style={{ position: "absolute", inset: -10, background: "radial-gradient(circle at 60% 30%, var(--sage-soft), transparent 65%)", filter: "blur(8px)" }} />
            <TeacherPhoto eager rounded={26} style={{ width: "100%", aspectRatio: "4/5", boxShadow: "var(--shadow-lg)", position: "relative" }} />
            <div style={{ position: "absolute", top: 18, left: -18, background: "var(--paper)", borderRadius: 14, padding: "12px 16px", boxShadow: "var(--shadow)", border: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 11 }} className="float-card">
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--sage-soft)", display: "grid", placeItems: "center" }}><QrCode size={19} color="var(--green)" /></div>
              <div><div style={{ fontSize: 13, fontWeight: 700, color: "var(--green)" }}>Scan & you're in</div><div style={{ fontSize: 11.5, color: "var(--muted)" }}>QR attendance at the door</div></div>
            </div>
            <div style={{ position: "absolute", bottom: 24, right: -20, background: "var(--green)", color: "#FBF9F4", borderRadius: 14, padding: "14px 18px", boxShadow: "var(--shadow-lg)" }} className="float-card seal-grain">
              <div style={{ fontSize: 12, color: "#E4D2A8", fontWeight: 700, letterSpacing: 1 }}>THIS WEEK'S HOMEWORK</div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 18, marginTop: 4 }}>Reported Speech — Ex 4–9</div>
              <div style={{ fontSize: 12, color: "#C7D6CC", marginTop: 4 }}>Published to your group · PDF attached</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--paper)" }}>
        <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", padding: "20px 24px" }}>
          {[[ClipboardCheck, "Homework after every lesson"], [Mic2, "Recitation tracked weekly"], [QrCode, "Attendance by QR"], [FileText, "Every PDF in one place"]].map(([Ic, t]) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--green)", fontWeight: 600, fontSize: 14 }}>
              <Ic size={19} color="var(--brass)" /> {t}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="wrap" style={{ padding: "84px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: ".85fr 1.15fr", gap: 52, alignItems: "center" }} className="lp-2col">
          <div style={{ position: "relative" }}>
            <TeacherPhoto variant="filled" rounded={22} style={{ width: "100%", aspectRatio: "1", boxShadow: "var(--shadow)" }} tag="Mr. Hady Attia" />
            <div style={{ position: "absolute", bottom: -22, left: 22, right: 22, background: "var(--paper)", borderRadius: 14, padding: "14px 18px", boxShadow: "var(--shadow)", border: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 12 }}>
              <Seal size={42} />
              <div style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.4 }}><strong style={{ color: "var(--green)" }}>10+ years</strong> guiding prep & secondary students through English.</div>
            </div>
          </div>
          <div>
            <Eyebrow>About the teacher</Eyebrow>
            <h2 style={{ fontSize: "clamp(28px,5.5vw,42px)", color: "var(--green)", margin: "16px 0 18px", lineHeight: 1.1 }}>Mr. Hady Attia teaches English like it matters — because it does.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink)", opacity: .82, marginBottom: 16 }}>
              For more than a decade, Mr. Hady has built a reputation across the centre for turning English from a feared subject into a confident one. His lessons are structured but never rigid: the plan changes week to week to match exactly what each group needs next.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink)", opacity: .82, marginBottom: 24 }}>
              Behind every group sits a simple promise — clear homework, honest recitation, fair marking, and a parent who always knows where their child stands.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {["Prep & secondary specialist", "Exam-focused preparation", "Recitation discipline", "Parent-visible progress"].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14.5, fontWeight: 600, color: "var(--green)" }}>
                  <CheckCircle2 size={18} color="var(--brass)" /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" style={{ background: "var(--green)", color: "#FBF9F4", position: "relative", overflow: "hidden" }} className="seal-grain">
        <div className="wrap" style={{ padding: "84px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <Eyebrow center light>What students achieve</Eyebrow>
            <h2 style={{ fontSize: "clamp(28px,5.5vw,42px)", marginTop: 16 }}>Results the whole centre can see</h2>
          </div>

          {/* hero result */}
          <div style={{ textAlign: "center", marginBottom: 52, position: "relative" }}>
            <div style={{ display: "inline-block", position: "relative" }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 600, color: "#E4D2A8", fontSize: "clamp(56px, 11vw, 104px)", lineHeight: 1, letterSpacing: "-.02em" }}>
                98<span style={{ fontSize: ".5em" }}>%</span>
              </div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(18px,3.4vw,26px)", color: "#FBF9F4", marginTop: 2 }}>of the Full Mark</div>
              <div style={{ fontFamily: "'Fraunces',serif", fontStyle: "italic", fontSize: "clamp(14px,2.4vw,18px)", color: "#9DB3A7", marginTop: 12, letterSpacing: ".01em" }}>
                The 2% is on you.
              </div>
              <span style={{ display: "block", width: 64, height: 2, background: "var(--brass)", margin: "22px auto 0", borderRadius: 2 }} />
            </div>
          </div>

          {/* supporting achievements */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }} className="lp-4">
            {[
              ["A / A*", "typical secondary grade"],
              ["+23%", "average mark improvement"],
              ["94%", "homework completion"],
              ["600+", "students taught"],
            ].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center", padding: "26px 14px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 18 }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(34px,5vw,46px)", fontWeight: 600, color: "#E4D2A8", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 13.5, color: "#C7D6CC", marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAGES */}
      <section id="stages" className="wrap" style={{ padding: "84px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Eyebrow center>Educational stages</Eyebrow>
          <h2 style={{ fontSize: "clamp(28px,5.5vw,42px)", color: "var(--green)", marginTop: 16 }}>A group for every year</h2>
          <p style={{ fontSize: 16.5, color: "var(--muted)", maxWidth: 560, margin: "14px auto 0", lineHeight: 1.6 }}>Two lessons a week, small groups by school type, and a plan that adapts as the term moves.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="lp-3">
          {STAGES.map((stage, i) => (
            <Card key={stage} hover pad={26}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "var(--green)", display: "grid", placeItems: "center" }}><GraduationCap size={22} color="#E4D2A8" /></div>
                <span className="mono" style={{ fontSize: 30, color: "var(--ivory-2)", fontWeight: 600 }}>0{i + 1}</span>
              </div>
              <h3 style={{ fontSize: 23, color: "var(--green)", marginBottom: 8 }}>{stage}</h3>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
                Twice-weekly lessons with homework, recitation and regular exam practice tuned to {stage.toLowerCase()} students.
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ background: "var(--paper)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: "84px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Eyebrow center>Inside the platform</Eyebrow>
            <h2 style={{ fontSize: "clamp(28px,5.5vw,42px)", color: "var(--green)", marginTop: 16 }}>Built for how the centre actually runs</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }} className="lp-3">
            {[
              [ClipboardCheck, "Homework, every lesson", "The secretary publishes the homework the moment a lesson ends. It appears on every student's home screen with the PDF attached."],
              [Mic2, "Recitation (Tasmee3)", "See exactly what to recite next time, with the reference sheet to revise from."],
              [QrCode, "QR attendance", "Each student carries a unique QR. One scan at the door records them — with manual entry as backup."],
              [CalendarDays, "Group schedules", "Days, time and hall for every group, always current even when plans change mid-term."],
              [FileText, "All your PDFs", "Worksheets, booklets, revision files and exams — preview, open or download from one library."],
              [GraduationCap, "Grades & notes", "Marks and the teacher's notes land where parents and students can read them honestly."],
            ].map(([Ic, t, d]) => (
              <Card key={t} pad={26} hover>
                <div style={{ width: 48, height: 48, borderRadius: 13, background: "var(--sage-soft)", display: "grid", placeItems: "center", marginBottom: 16 }}><Ic size={23} color="var(--green)" /></div>
                <h3 style={{ fontSize: 21, color: "var(--green)", marginBottom: 9 }}>{t}</h3>
                <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.62, margin: 0 }}>{d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="wrap" style={{ padding: "84px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Eyebrow center>In their words</Eyebrow>
          <h2 style={{ fontSize: "clamp(28px,5.5vw,42px)", color: "var(--green)", marginTop: 16 }}>Parents and students on Special 1</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }} className="lp-3">
          {[
            ["My son finally does his English homework without a fight — he can see it on his phone the same night.", "Mrs. Heba", "Parent · Third Preparatory"],
            ["The recitation system kept me honest. I knew every week exactly what to memorise.", "Youssef K.", "Student · Third Secondary"],
            ["Marks and attendance in one place. As a parent that's all I ever wanted from a centre.", "Mr. Sherif", "Parent · First Secondary"],
          ].map(([q, n, r]) => (
            <Card key={n} pad={28}>
              <Quote size={30} color="var(--brass-soft)" />
              <p style={{ fontSize: 16, lineHeight: 1.66, color: "var(--ink)", margin: "12px 0 20px", fontStyle: "italic" }}>"{q}"</p>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: 14 }}>
                <div style={{ fontWeight: 700, color: "var(--green)" }}>{n}</div>
                <div style={{ fontSize: 13, color: "var(--brass)", fontWeight: 600 }}>{r}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--paper)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ padding: "80px 24px", maxWidth: 820 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Eyebrow center>Questions</Eyebrow>
            <h2 style={{ fontSize: "clamp(28px,5.5vw,40px)", color: "var(--green)", marginTop: 16 }}>How subscriptions work</h2>
          </div>
          {[
            ["How much does it cost?", "Students pay a monthly subscription per group. The exact fee is set at the centre and covers two lessons each week, all homework, recitation sheets and exams."],
            ["What do I get for the month?", "Two lessons weekly, every homework and recitation published to your portal, all PDFs, regular exams, your grades, and your attendance record."],
            ["Is there a fixed curriculum?", "No. Mr. Hady adjusts the plan each week to match what your group needs. After every lesson the secretary publishes exactly what was covered and what's next."],
            ["How is attendance taken?", "Every student has a personal QR code. You scan it at the door and you're marked present instantly. If a scan fails, the secretary records it by hand."],
            ["Can parents follow progress?", "Yes. Grades, attendance and the teacher's notes are all visible in the portal, so families always know where their child stands."],
          ].map(([q, a], i) => (
            <div key={q} style={{ borderBottom: "1px solid var(--line)" }}>
              <button onClick={() => setFaq(faq === i ? -1 : i)} style={{ width: "100%", background: "none", border: "none", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left", gap: 16 }}>
                <span style={{ fontFamily: "'Fraunces',serif", fontSize: 19, fontWeight: 600, color: "var(--green)" }}>{q}</span>
                <ChevronDown size={20} color="var(--brass)" style={{ transform: faq === i ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 }} />
              </button>
              {faq === i && <p style={{ fontSize: 15.5, color: "var(--muted)", lineHeight: 1.66, margin: "0 0 20px", maxWidth: 680 }} className="fade">{a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="wrap" style={{ padding: "84px 24px" }}>
        <div className="contact-card seal-grain" style={{ background: "var(--green)", borderRadius: 26, padding: "56px 48px", color: "#FBF9F4", position: "relative", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 44, alignItems: "center" }} className="lp-2col">
            <div>
              <Eyebrow light>Visit the centre</Eyebrow>
              <h2 style={{ fontSize: "clamp(26px,5vw,40px)", marginTop: 16, marginBottom: 16 }}>Join the next group with Mr. Hady</h2>
              <p style={{ fontSize: 16.5, color: "#C7D6CC", lineHeight: 1.62, marginBottom: 28, maxWidth: 440 }}>
                Sign in to the portal if you're already a student, or reach the secretary to ask about places, times and monthly fees.
              </p>
              <div style={{ display: "flex", gap: 13, flexWrap: "wrap" }}>
                <Button size="lg" variant="brass" icon={ArrowRight} onClick={() => go("login")}>Sign in</Button>
                <Button size="lg" variant="dark" icon={Phone} onClick={() => setContact(true)}>Call the secretary</Button>
              </div>
            </div>
            <div style={{ display: "grid", gap: 12, minWidth: 0 }}>
              {/* phones — tap to open the call/WhatsApp sheet */}
              <button onClick={() => setContact(true)} style={{ textAlign: "left", display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 14, padding: "14px 16px", cursor: "pointer", color: "#FBF9F4", flexWrap: "wrap", minWidth: 0 }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(228,210,168,.16)", display: "grid", placeItems: "center", flexShrink: 0 }}><Phone size={19} color="#E4D2A8" /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, color: "#9DB3A7" }}>Secretary · tap to call or WhatsApp</div>
                  <div className="mono" style={{ fontWeight: 700, fontSize: 14.5, direction: "ltr" }}>{CENTRE.phones[0].display}</div>
                  <div className="mono" style={{ fontWeight: 700, fontSize: 14.5, direction: "ltr" }}>{CENTRE.phones[1].display}</div>
                </div>
              </button>
              {/* address (Arabic, RTL) */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 14, padding: "14px 16px", minWidth: 0 }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(228,210,168,.16)", display: "grid", placeItems: "center", flexShrink: 0 }}><MapPin size={19} color="#E4D2A8" /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, color: "#9DB3A7" }}>Centre address</div>
                  <div dir="rtl" style={{ fontWeight: 600, fontSize: 14.5, lineHeight: 1.5, textAlign: "right", wordBreak: "break-word" }}>{CENTRE.addressAr}</div>
                </div>
              </div>
              {/* working hours */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 14, padding: "14px 16px", minWidth: 0 }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(228,210,168,.16)", display: "grid", placeItems: "center", flexShrink: 0 }}><Clock size={19} color="#E4D2A8" /></div>
                <div><div style={{ fontSize: 12.5, color: "#9DB3A7" }}>Working hours</div><div style={{ fontWeight: 700, fontSize: 15 }}>{CENTRE.hours}</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SecretaryContactModal open={contact} onClose={() => setContact(false)} />

      <Footer />
    </div>
  );
}
