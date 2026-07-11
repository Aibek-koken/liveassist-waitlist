import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SessionNoteFlow from "@/components/SessionNoteFlow";
import CrmSuggestedActionsDemo from "@/components/CrmSuggestedActionsDemo";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        {/* Блок 1 — Hero */}
        <Hero />
        {/* Блок 2 — один разговор становится контекстом */}
        <SessionNoteFlow />
        {/* Блок 3 — главная product demo */}
        <CrmSuggestedActionsDemo />
        {/* Блок 4 — waitlist */}
        <WaitlistForm />
      </main>
      <Footer />
    </>
  );
}
