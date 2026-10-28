import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Student = {
  id: string;
  name: string;
  age: string;
  group: string;
  city: string;
  startDate: string;
  guardian: string;
  phone: string;
  status: "İyi" | "Orta";
};

export type Tutanak = {
  id: string;
  studentId: string;
  title: string;
  tag: string;
  date: string;
  body: string;
  positive: boolean;
  signed: boolean;
};

export type AttendanceRow = {
  id: string;
  studentId: string;
  date: string;
  vakitler: string[];
  ders: boolean;
  durum: "normal" | "izinli" | "gec";
};

type Store = {
  students: Student[];
  tutanaklar: Tutanak[];
  attendance: AttendanceRow[];
  addStudent: (s: Omit<Student, "id">) => void;
  updateStudent: (id: string, s: Partial<Student>) => void;
  removeStudent: (id: string) => void;
  addTutanak: (t: Omit<Tutanak, "id">) => void;
  removeTutanak: (id: string) => void;
  addAttendance: (a: Omit<AttendanceRow, "id">) => void;
  removeAttendance: (id: string) => void;
};

const uid = () => Math.random().toString(36).slice(2, 10);

const seedStudents: Student[] = [
  { id: "s1", name: "Ff", age: "23", group: "Daimi Grup", city: "Tamam", startDate: "2026-10-18", guardian: "Df", phone: "7044245", status: "İyi" },
  { id: "s2", name: "Hdh", age: "21", group: "Daimi Grup", city: "Tamam", startDate: "2026-10-18", guardian: "", phone: "", status: "Orta" },
];

const seedTutanaklar: Tutanak[] = [
  {
    id: "t1", studentId: "s1", title: "Namaza Katılmama", tag: "Namaza Katılmama", date: "2026-10-23", positive: false, signed: false,
    body: "TUTANAK: 24.05.2024 tarihinde kursumuzda yapılan gözlemlerde, öğrencimiz [Öğrenci Adı Soyadı]'nın diğer kursiyerlerle sık sık tartışma yaşadığı ve disiplinsiz davranışlar sergilediği tespit edilmiştir. Kurs disiplinini ve huzurunu korumak adına, ilgili öğrencinin söz konusu tutumlarını düzeltmesi hususunda uyarılmasına ve velisinin durum hakkında bilgilendirilmesine karar verilmiştir.",
  },
  {
    id: "t2", studentId: "s1", title: "Anamdan hata yapmışım", tag: "Derse Geç Kalma", date: "2026-10-18", positive: false, signed: true,
    body: "Yapılan gözlemler neticesinde; bazı öğrencilerin eğitim-öğretim süreci içerisinde arkadaşlarıyla uyumsuz davranışlar sergilediği görülmüştür.",
  },
];

const seedAttendance: AttendanceRow[] = [
  { id: "a1", studentId: "s1", date: "2026-10-21", vakitler: [], ders: false, durum: "izinli" },
  { id: "a2", studentId: "s1", date: "2026-10-21", vakitler: ["Sabah", "Öğle", "İkindi"], ders: true, durum: "normal" },
  { id: "a3", studentId: "s1", date: "2026-10-22", vakitler: ["Sabah", "Öğle", "İkindi", "Akşam", "Yatsı"], ders: true, durum: "normal" },
  { id: "a4", studentId: "s1", date: "2026-10-23", vakitler: ["Akşam", "Yatsı"], ders: false, durum: "normal" },
];

const KEY = "kuran-kursu-store-v1";

type State = { students: Student[]; tutanaklar: Tutanak[]; attendance: AttendanceRow[] };

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as State;
  } catch {
    /* ignore */
  }
  return { students: seedStudents, tutanaklar: seedTutanaklar, attendance: seedAttendance };
}

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({ students: [], tutanaklar: [], attendance: [] });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  const store: Store = {
    ...state,
    addStudent: (s) => setState((p) => ({ ...p, students: [...p.students, { ...s, id: uid() }] })),
    updateStudent: (id, s) => setState((p) => ({ ...p, students: p.students.map((x) => (x.id === id ? { ...x, ...s } : x)) })),
    removeStudent: (id) =>
      setState((p) => ({
        students: p.students.filter((x) => x.id !== id),
        tutanaklar: p.tutanaklar.filter((x) => x.studentId !== id),
        attendance: p.attendance.filter((x) => x.studentId !== id),
      })),
    addTutanak: (t) => setState((p) => ({ ...p, tutanaklar: [...p.tutanaklar, { ...t, id: uid() }] })),
    removeTutanak: (id) => setState((p) => ({ ...p, tutanaklar: p.tutanaklar.filter((x) => x.id !== id) })),
    addAttendance: (a) => setState((p) => ({ ...p, attendance: [...p.attendance, { ...a, id: uid() }] })),
    removeAttendance: (id) => setState((p) => ({ ...p, attendance: p.attendance.filter((x) => x.id !== id) })),
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
