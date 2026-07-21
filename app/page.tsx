import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhatsappAgent from "@/components/WhatsappAgent";
import CrmSuggestedActionsDemo from "@/components/CrmSuggestedActionsDemo";
import ScriptsSoon from "@/components/ScriptsSoon";
import Demo from "@/components/Demo";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        {/* Блок 1 — Hero */}
        <Hero />
        {/* Блок 2 — объяснение: что делает продукт, в трёх шагах */}
        <HowItWorks />
        {/* Блок 3 — флагманская идея: автономный агент в WhatsApp (меряем спрос) */}
        <WhatsappAgent />
        {/* Блок 4 — что уже работает: звонок → amoCRM */}
        <CrmSuggestedActionsDemo />
        {/* Блок 5 — вторая идея роадмапа: скрипты (меряем спрос) */}
        <ScriptsSoon />
        {/* Блок 6 — живое демо приложения + скачивание */}
        <Demo />
      </main>
      <Footer />
    </>
  );
}
