import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function AboutSection() {
  return (
    <section id="tentang" className="w-full bg-background py-16 md:py-24">
      <div className="container grid gap-12 md:grid-cols-2">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Tentang HMJMI Polsri
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Himpunan Mahasiswa Jurusan Manajemen Informatika (HMJMI) adalah organisasi mahasiswa yang menjadi wadah bagi seluruh mahasiswa Jurusan Manajemen Informatika di Politeknik Negeri Sriwijaya untuk mengembangkan potensi diri, berprestasi, dan berkontribusi.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">Visi</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Menjadikan HMJMI sebagai organisasi yang unggul dalam bidang akademik dan non-akademik, serta mampu menciptakan mahasiswa yang inovatif, kreatif, dan berakhlak mulia.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold">Misi</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  <li>Mengoptimalkan program kerja yang mendukung pengembangan minat dan bakat mahasiswa.</li>
                  <li>Membangun hubungan yang harmonis dan sinergis antara mahasiswa, dosen, dan alumni.</li>
                  <li>Meningkatkan prestasi mahasiswa di tingkat regional, nasional, dan internasional.</li>
                  <li>Mengadakan kegiatan sosial yang bermanfaat bagi masyarakat.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold">Sejarah Singkat</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Didirikan pada tahun XXXX, HMJMI telah melalui berbagai fase perkembangan dan terus berkomitmen untuk menjadi organisasi yang lebih baik dari waktu ke waktu, membawa nama baik Jurusan Manajemen Informatika dan Politeknik Negeri Sriwijaya.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="relative flex items-center justify-center">
            <div className="relative h-[300px] w-full max-w-md overflow-hidden rounded-xl shadow-2xl md:h-[450px]">
                <Image
                    src="https://placehold.co/600x800"
                    alt="Tim HMJMI"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="student group photo"
                    className="transition-transform duration-500 hover:scale-105"
                />
            </div>
        </div>
      </div>
    </section>
  );
}
