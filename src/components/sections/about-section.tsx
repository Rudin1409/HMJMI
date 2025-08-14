import Image from 'next/image';

export function AboutSection() {
  return (
    <section id="tentang" className="w-full bg-background py-16 md:py-24">
      <div className="container grid items-center gap-12 md:grid-cols-2">
        <div className="relative flex h-[300px] w-full max-w-md items-center justify-center overflow-hidden rounded-xl shadow-2xl md:h-[450px]">
          <Image
            src="https://placehold.co/600x800"
            alt="Tim HMIF"
            layout="fill"
            objectFit="cover"
            data-ai-hint="student group discussion"
            className="transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h2 className="font-montserrat text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl">
              TENTANG <span className="text-primary">KAMI</span>
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              Himpunan Mahasiswa Teknik Informatika (HMIF) adalah organisasi yang mewadahi seluruh mahasiswa Program Studi Teknik Informatika dan Sistem Komputer di Fakultas Ilmu Komputer Universitas Sriwijaya. HMIF berfungsi sebagai sarana untuk mengembangkan potensi, minat, dan bakat mahasiswa dalam bidang akademik maupun non-akademik, serta mempererat tali persaudaraan antar mahasiswa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
