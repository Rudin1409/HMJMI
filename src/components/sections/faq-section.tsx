import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

const faqItems = [
  {
    question: 'Apa itu HMJMI?',
    answer: 'Himpunan Mahasiswa Jurusan Manajemen Informatika adalah organisasi kemahasiswaan di Politeknik Negeri Sriwijaya yang menjadi wadah bagi mahasiswa Manajemen Informatika untuk mengembangkan potensi akademik, non-akademik, serta kreativitas dan inovasi.',
  },
  {
    question: 'Apa saja Program HMJMI?',
    answer: 'HMJMI memiliki berbagai program kerja yang mencakup bidang akademik, pengembangan skill (workshop, seminar), kompetisi, pengabdian masyarakat, dan kegiatan kebersamaan untuk mempererat hubungan antar anggota.',
  },
  {
    question: 'Bagaimana cara bergabung dengan HMJMI?',
    answer: 'Setiap tahunnya, HMJMI membuka pendaftaran anggota baru untuk mahasiswa Manajemen Informatika. Informasi pendaftaran, persyaratan, dan alur seleksi akan diumumkan melalui media sosial resmi dan situs web HMJMI.',
  },
  {
    question: 'Apa manfaat bergabung dengan HMJMI?',
    answer: 'Bergabung dengan HMJMI memberikan banyak manfaat, seperti menambah relasi, pengalaman berorganisasi, pengembangan soft skill dan hard skill, serta menjadi bagian dari komunitas yang suportif dan inovatif.',
  },
  {
    question: 'Berapa lama masa kepengurusan HMJMI?',
    answer: 'Masa kepengurusan dalam satu periode di HMJMI berlangsung selama satu tahun, dimulai dari pelantikan pengurus baru hingga serah terima jabatan kepada pengurus periode berikutnya.',
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <Badge variant="default" className="bg-pink-100 text-primary mb-4">FAQ</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Frequently <span className="text-primary">Asked Questions</span>
          </h2>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-gray-200 rounded-lg shadow-sm px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-700 hover:no-underline">
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
