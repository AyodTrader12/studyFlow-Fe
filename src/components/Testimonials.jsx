import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export const testimonials = [
  { name: "Chidera Okafor", school: "Government Secondary School, Lagos", level: "SS3 Student", text: "StudyFlow helped me find past WAEC questions for all my subjects in one place. My grades improved so much in just two months!", initials: "CO", color: "bg-blue-100 text-blue-700", rating: 5 },
  { name: "Fatima Abdullahi", school: "Federal Government College, Abuja", level: "JSS2 Student", text: "I used to spend hours looking for study notes online. Now I just open StudyFlow and everything is right there, organised perfectly.", initials: "FA", color: "bg-green-100 text-green-700", rating: 4 },
  { name: "Emeka Nwosu", school: "Lagos State Model College", level: "SS1 Student", text: "The community feature is amazing. I asked a question and got a clear answer within minutes. Highly recommend!", initials: "EN", color: "bg-orange-100 text-orange-700", rating: 3 },
  { name: "Amara Eze", school: "Queens College, Lagos", level: "SS2 Student", text: "I never knew studying could be this easy. StudyFlow has the best collection of biology and chemistry resources I've ever seen.", initials: "AE", color: "bg-purple-100 text-purple-700", rating: 4 },
  { name: "Yusuf Bello", school: "Government College, Kaduna", level: "SS3 Student", text: "As a science student preparing for JAMB, StudyFlow saved me. The past questions are so well organised by topic and year.", initials: "YB", color: "bg-red-100 text-red-700", rating: 5 },
  { name: "Adaeze Obi", school: "Holy Child College, Lagos", level: "JSS3 Student", text: "My maths teacher recommended StudyFlow and honestly it changed everything. The explanations are clear and I can study at my own pace.", initials: "AO", color: "bg-yellow-100 text-yellow-700",rating: 4 },
  { name: "Tunde Afolabi", school: "Remo Secondary School, Ogun", level: "SS2 Student", text: "I love how I can filter resources by my exact class level. It saves me from going through content that doesn't apply to me.", initials: "TA", color: "bg-pink-100 text-pink-700" ,rating:3},
  { name: "Ngozi Nnadi", school: "University of Nigeria Secondary School, Enugu", level: "SS1 Student", text: "Finding literature resources used to be painful. StudyFlow has everything from summaries to full analysis — all free!", initials: "NN", color: "bg-teal-100 text-teal-700", rating: 4 },
  { name: "Ibrahim Musa", school: "Government Day Secondary School, Kano", level: "SS3 Student", text: "I passed my WAEC with flying colours and StudyFlow was a major reason. The past questions with answers are incredibly helpful.", initials: "IM", color: "bg-blue-100 text-blue-700", rating: 5 },
  { name: "Blessing Okonkwo", school: "Bethlehem Girls College, Abagana", level: "JSS2 Student", text: "It feels like StudyFlow was built just for me. Every subject I need help with is there, and the interface is so easy to use.", initials: "BO", color: "bg-green-100 text-green-700", rating: 4 },
  { name: "Oluwaseun Dada", school: "Abeokuta Grammar School, Ogun", level: "JSS3 Student", text: "Before StudyFlow I had to buy expensive textbooks. Now I get everything I need for free online. This platform is a game changer.", initials: "OD", color: "bg-red-100 text-red-700" },
  { name: "Chiamaka Osei", school: "Imo State Secondary School, Owerri", level: "SS1 Student", text: "The library of resources is huge and it keeps growing. I especially love the economics and commerce study notes section.", initials: "CO", color: "bg-yellow-100 text-yellow-700" ,rating:3},
  { name: "Abdulkarim Hassan", school: "GSS Minna, Niger State", level: "SS2 Student", text: "My physics teacher uses StudyFlow resources in class now. That says a lot about the quality. I highly recommend it to every student.", initials: "AH", color: "bg-pink-100 text-pink-700" },
  { name: "Funmi Olutunde", school: "Command Secondary School, Lagos", level: "SS3 Student", text: "The progress tracking feature keeps me accountable. I know exactly how much I've covered and what I still need to review.", initials: "FO", color: "bg-teal-100 text-teal-700",rating:5 },
  { name: "Kelechi Okafor", school: "University Secondary School, Port Harcourt", level: "JSS1 Student", text: "Even as a junior student, I find StudyFlow very easy to navigate. My older siblings use it too — it works for every level.", initials: "KO", color: "bg-blue-100 text-blue-700" },
  { name: "Zainab Usman", school: "Government Girls Secondary School, Sokoto", level: "SS2 Student", text: "I use StudyFlow every single evening after school. It has become part of my daily routine and my confidence has grown so much.", initials: "ZU", color: "bg-green-100 text-green-700",rating:4 },
  { name: "Raphael Okeke", school: "Hillcrest School, Jos", level: "SS1 Student", text: "The student community is so supportive. When I post a question, I always get helpful and accurate answers quickly.", initials: "RO", color: "bg-orange-100 text-orange-700" },
  { name: "Aisha Garba", school: "Federal Government Girls College, Bida", level: "SS3 Student", text: "I shared StudyFlow with everyone in my class and now we use it for group study. It keeps our study sessions very productive.", initials: "AG", color: "bg-purple-100 text-purple-700" },
  { name: "Chukwuemeka Ibe", school: "Dennis Memorial Grammar School, Anambra", level: "JSS3 Student", text: "This is the only study app that doesn't feel overwhelming. Everything is clean, simple, and useful. I love it.", initials: "CI", color: "bg-red-100 text-red-700" },
  { name: "Tolulope Bamisele", school: "Obafemi Awolowo University Staff School", level: "SS2 Student", text: "My results shot up after I started using StudyFlow consistently. The content is accurate and matches our school syllabus.", initials: "TB", color: "bg-yellow-100 text-yellow-700" },
  { name: "Hauwa Danladi", school: "Government Secondary School, Bauchi", level: "SS1 Student", text: "The offline-friendly design means I can study even when my data is low. StudyFlow truly understands Nigerian students.", initials: "HD", color: "bg-pink-100 text-pink-700",rating:4 },
  { name: "Victor Nwachukwu", school: "Christ the King College, Onitsha", level: "SS3 Student", text: "I was struggling with Further Mathematics until I found StudyFlow. The step-by-step resources made everything click for me.", initials: "VN", color: "bg-teal-100 text-teal-700",rating:4 },
  { name: "Patience Udo", school: "Girls Secondary School, Akwa Ibom", level: "JSS2 Student", text: "My mum was impressed when she saw how organised my study materials are now. All thanks to StudyFlow's clean library feature.", initials: "PU", color: "bg-blue-100 text-blue-700",rating:3.5 },
  { name: "Ismaila Yakubu", school: "Barewa College, Zaria", level: "SS2 Student", text: "StudyFlow has resources for Hausa literature which I couldn't find anywhere else online. This platform is truly for all Nigerian students.", initials: "IY", color: "bg-green-100 text-green-700" },
  { name: "Adunola Fashola", school: "Birrel Avenue High School, Lagos", level: "SS3 Student", text: "I used to procrastinate a lot with studying. The progress tracker on StudyFlow motivated me to stay consistent every week.", initials: "AF", color: "bg-orange-100 text-orange-700" },
  { name: "Sunday Obi", school: "Community Secondary School, Delta", level: "SS1 Student", text: "For students in less-resourced areas like mine, StudyFlow is a lifeline. Everything is free and the quality is top-notch.", initials: "SO", color: "bg-purple-100 text-purple-700" },
  { name: "Halima Sule", school: "GDSS Daura, Katsina", level: "JSS3 Student", text: "I discovered StudyFlow through a friend and within a week I was already hooked. The resources are fresh and very relevant.", initials: "HS", color: "bg-red-100 text-red-700" },
  { name: "Obinna Chukwu", school: "Federal Government College, Enugu", level: "SS2 Student", text: "What I love most is how StudyFlow keeps adding new content. Every time I come back there's something new and helpful waiting for me.", initials: "OC", color: "bg-yellow-100 text-yellow-700",rating:4 },
];

// ── Stars component ──────────────────────────────────────────────────────────
function Stars({ value = 5.0 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < value ? "#f59e0b" : "#d1d5db"}
          className={i < value ? "" : "opacity-80"}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

// ── Single card ──────────────────────────────────────────────────────────────
function TestimonialCard({ item, animating }) {
  return (
    <div
      className="flex flex-col gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm h-full min-h-[220px]"
      style={{
        transition: "opacity 0.4s ease",
        opacity: animating ? 0.15 : 1,
      }}
    >
      <Stars value={item.rating ?? 5.0} />
      <p className="text-sm text-gray-600 leading-relaxed italic flex-1">"{item.text}"</p>
      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${item.color}`}>
          {item.initials}
        </div>
        <div>
          <p className="text-sm font-bold text-[#1a2a5e]">{item.name}</p>
          <p className="text-[10px] text-gray-400">{item.level} · {item.school}</p>
        </div>
      </div>
    </div>
  );
}

// ── Desktop rotating column ──────────────────────────────────────────────────
function RotatingColumn({ items, offset = 0 }) {
  const [index, setIndex] = useState(offset % items.length);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Stagger start between columns using offset
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimating(true);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % items.length);
          setAnimating(false);
        }, 400); // wait for exit animation then swap
      }, 10000);
      return () => clearInterval(interval);
    }, offset * 1600);

    return () => clearTimeout(timeout);
  }, [items.length, offset]);

  return <TestimonialCard item={items[index]} animating={animating} />;
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function Testimonials() {
  // Split into 3 groups for 3 desktop columns — each column cycles independently
  const col1 = testimonials.filter((_, i) => i % 3 === 0);
  const col2 = testimonials.filter((_, i) => i % 3 === 1);
  const col3 = testimonials.filter((_, i) => i % 3 === 2);

  return (
    <section className="max-w-6xl mx-auto px-5 lg:px-12 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-[#3b6fd4] text-xs font-bold tracking-widest uppercase mb-2">Testimonials</p>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1a2a5e] mb-3">
          What Students Are Saying
        </h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
          Thousands of students across Nigeria trust StudyFlow to help them prepare, study, and succeed.
        </p>
      </div>

      {/* ── Desktop: 3 rotating columns ── */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        <RotatingColumn items={col1} offset={0} />
        <RotatingColumn items={col2} offset={1} />
        <RotatingColumn items={col3} offset={2} />
      </div>

      {/* ── Mobile: Swiper slider ── */}
      <div className="md:hidden">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          speed={700}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i}>
              <TestimonialCard item={item} animating={false} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}