
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

const faqItems = [
  {
    question: 'Apa itu HMJMI POLSRI?',
    answer: 'Himpunan Mahasiswa Jurusan Manajemen Informatika (HMJMI) adalah organisasi kemahasiswaan resmi di Politeknik Negeri Sriwijaya yang menjadi wadah bagi mahasiswa untuk mengembangkan potensi akademik, non-akademik, serta kreativitas dan inovasi di bidang teknologi.',
  },
  {
    question: 'Apa saja program kerja unggulan HMJMI?',
    answer: 'Program utama kami adalah IT Festival (Information Technology Festival), sebuah acara IT tahunan yang mencakup kompetisi, pelatihan, dan seminar sebagai sarana edukasi bagi mahasiswa dan masyarakat umum.',
  },
  {
    question: 'Bagaimana cara bergabung menjadi anggota HMJMI?',
    answer: 'Setiap tahun ajaran baru, HMJMI membuka proses rekrutmen terbuka untuk seluruh mahasiswa aktif Jurusan Manajemen Informatika. Informasi lengkap mengenai jadwal, persyaratan, dan alur pendaftaran akan diumumkan melalui situs web dan media sosial resmi kami.',
  },
  {
    question: 'Apa manfaat menjadi bagian dari HMJMI?',
    answer: 'Menjadi anggota HMJMI memberikan banyak keuntungan, seperti memperluas jaringan profesional, mendapatkan pengalaman organisasi yang berharga, meningkatkan soft skill (seperti kepemimpinan dan kerja tim) serta hard skill, dan menjadi bagian dari komunitas yang solid dan inovatif.',
  },
  {
    question: 'Berapa lama masa jabatan kepengurusan di HMJMI?',
    answer: 'Satu periode kepengurusan di HMJMI berlangsung selama dua periode, jadi selama dua tahun. Prosesnya dimulai dari pelantikan pengurus baru dan diakhiri dengan serah terima jabatan kepada pengurus periode berikutnya melalui Musyawarah Besar (MUBES).',
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="w-full py-20 md:py-32 bg-transparent relative z-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-primary/50 text-slate-900 dark:text-white mb-6 py-1.5 px-4 font-semibold text-sm backdrop-blur-md bg-white/30 dark:bg-white/10">
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Pertanyaan yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-blue-600 animate-gradient-x">Sering Diajukan</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="group border border-white/40 dark:border-white/10 bg-white/30 dark:bg-black/40 backdrop-blur-md transition-all duration-300 ease-out rounded-2xl px-6 data-[state=open]:border-primary/50 data-[state=open]:bg-white/50 dark:data-[state=open]:bg-white/10 data-[state=open]:shadow-xl data-[state=open]:shadow-primary/10 hover:border-primary/30"
            >
              <AccordionTrigger className="text-left font-bold text-lg text-slate-900 dark:text-white hover:text-primary hover:no-underline py-6 [&[data-state=open]>span>span]:opacity-100">
                <span className='flex items-center gap-4 relative z-10 w-full'>
                  <span className='flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary opacity-60 group-hover:opacity-100 transition-opacity'>
                    <span className="text-xl leading-none">•</span>
                  </span>
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 dark:text-slate-300 pl-14 pb-6 leading-relaxed text-base font-medium">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

