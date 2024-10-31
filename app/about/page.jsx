"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import { useLanguage } from "../components/LanguageProvider";
import { useDarkMode } from "../components/DarkModeProvider";

export default function About() {
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();

  const content = {
    en: {
      title: "About What's In Your Fridge",
      welcome:
        "Welcome to What's In Your Fridge, your go-to platform for discovering delicious recipes based on the ingredients you already have at home. Our mission is to help you reduce food waste, save money, and enjoy creative cooking experiences.",
      appFeatures:
        "Our innovative app leverages the power of Open AI Api to fetch recipes from the internet. We then use pandas to filter and process the data, storing it in our database for your convenience. Find recipes based on ingredients you already have. No more last-minute trips to the grocery store.",
      aiChef:
        "This app is also equipped with an AI Chef that can provide users with suggestions on what to cook with the ingredients they have and modify recipes, this AI Chef uses GPT-4.0 mini.",
      development:
        "Developed by Group 5 BTE1034 at Malaysia University of Science and Technology, our app is designed to make cooking easier, faster, and more enjoyable. Download What's In Your Fridge today and start cooking up a storm!",
      developedBy: "Developed By:",
      developers: [
        "NORUL AZWA BINTI HASSAN (B24070014)",
        "KHADIJAH BINTI KASIRAN (B24070074)",
        "SAFWAN RAHIMI BIN SUHAILI (B24070037)",
        "AHMAD FAHMIE AIZZAT BIN ABDUL MAJID (B24080028)",
        "NORAZILA BINTI SAID (B24080009)",
        "CHE AMIRUL AZUAN BIN CIK ANUAR (B24080063)",
        "MUHAMMAD HAZMI AKMAL BIN MOHD ALI (B24020051)",
        "AMYRA ELIZA SOFEA BINTI ROSDAN (B24060048)",
        "NAZIRUL NASYRIQ BIN MOHAMMAD (B24060004)",
        "OSMAN ALI BIN SHAFIE (B24080048)",
      ],
    },
    ms: {
      title: "Tentang Apa dalam Peti Sejuk Anda",
      welcome:
        "Selamat datang ke What's In Your Fridge, platform utama anda untuk menemui resipi lazat berdasarkan bahan-bahan yang sudah ada di rumah. Misi kami adalah untuk membantu anda mengurangkan pembaziran makanan, menjimatkan wang, dan menikmati pengalaman memasak yang kreatif.",
      appFeatures:
        "Aplikasi inovatif kami memanfaatkan kuasa Open AI Api untuk mencari resipi dari internet. Kami kemudian menggunakan pandas untuk menapis dan memproses data, menyimpannya dalam pangkalan data kami untuk kemudahan anda. Cari resipi berdasarkan bahan-bahan yang sudah ada. Tiada lagi perjalanan saat-saat akhir ke kedai runcit.",
      aiChef:
        "Aplikasi ini juga dilengkapi dengan AI Chef yang dapat memberikan cadangan kepada pengguna tentang apa yang harus dimasak dengan bahan-bahan yang mereka miliki dan mengubah suai resipi, AI Chef ini menggunakan GPT-4.0 mini.",
      development:
        "Dibangunkan oleh Kumpulan 5 BTE1034 di Universiti Sains dan Teknologi Malaysia, aplikasi kami direka untuk menjadikan memasak lebih mudah, cepat, dan menyeronokkan. Muat turun What's In Your Fridge hari ini dan mulakan memasak dengan hebat!",
      developedBy: "Dibangunkan Oleh:",
      developers: [
        "NORUL AZWA BINTI HASSAN (B24070014)",
        "KHADIJAH BINTI KASIRAN (B24070074)",
        "SAFWAN RAHIMI BIN SUHAILI (B24070037)",
        "AHMAD FAHMIE AIZZAT BIN ABDUL MAJID (B24080028)",
        "NORAZILA BINTI SAID (B24080009)",
        "CHE AMIRUL AZUAN BIN CIK ANUAR (B24080063)",
        "MUHAMMAD HAZMI AKMAL BIN MOHD ALI (B24020051)",
        "AMYRA ELIZA SOFEA BINTI ROSDAN (B24060048)",
        "NAZIRUL NASYRIQ BIN MOHAMMAD (B24060004)",
        "OSMAN ALI BIN SHAFIE (B24080048)",
      ],
    },
  };

  const t = content[language];

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } relative`}
    >
      <Navbar />
      <main className="container mx-auto px-4 py-16 pt-24">
        <div className="flex justify-center mb-8">
          <Image
            src="/must_logo.png"
            alt="Malaysia University of Science and Technology"
            width={300}
            height={100}
            objectFit="contain"
          />
        </div>
        <h1
          className={`text-4xl font-bold ${
            isDarkMode ? "text-blue-400" : "text-blue-600"
          } mb-8 text-center`}
        >
          {t.title}
        </h1>
        <div className="max-w-3xl mx-auto space-y-6">
          <p>{t.welcome}</p>
          <p>{t.appFeatures}</p>
          <p>{t.aiChef}</p>
          <p>{t.development}</p>
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">{t.developedBy}</h2>
          <ul className="list-none space-y-2">
            {t.developers.map((developer, index) => (
              <li key={index}>{developer}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
