
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
    answer: 'Satu periode kepengurusan di HMJMI berlangsung selama satu tahun. Prosesnya dimulai dari pelantikan pengurus baru dan diakhiri dengan serah terima jabatan kepada pengurus periode berikutnya melalui Musyawarah Besar (MUBES).',
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <Badge variant="default" className="bg-pink-100 text-primary mb-4 dark:bg-primary/10">FAQ</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Pertanyaan yang <span className="text-primary">Sering Diajukan</span>
          </h2>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-transparent border border-gray-200 dark:border-border rounded-lg shadow-sm px-6">
              <AccordionTrigger className="text-left font-semibold text-foreground/80 hover:no-underline">
                <span className='flex items-center gap-4'>
                  <span className='text-primary'>•</span>
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pl-8">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

    