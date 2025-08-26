
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Briefcase, Instagram, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Award, GraduationCap, Megaphone, Sparkles, HeartHandshake, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { departments, teamMembers, programs, divisions } from '@/data/profile-data';


type Member = {
    name: string;
    role: string;
    class: string;
    avatar: string;
    instagram?: string;
};

const iconMap: { [key: string]: React.ReactNode } = {
  Award: <Award className="w-8 h-8" />,
  GraduationCap: <GraduationCap className="w-8 h-8" />,
  Megaphone: <Megaphone className="w-8 h-8" />,
  Sparkles: <Sparkles className="w-8 h-8" />,
  HeartHandshake: <HeartHandshake className="w-8 h-8" />,
  Store: <Store className="w-8 h-8" />,
};

const MemberCard = ({ member, onPrev, onNext, showNav }: { member: Member, onPrev: () => void, onNext: () => void, showNav: boolean }) => {
    const getInstagramUsername = (url: string) => {
        if (!url) return '';
        try {
            const path = new URL(url).pathname;
            return path.split('/').filter(Boolean).pop() || '';
        } catch (e) {
            return '';
        }
    };
    const username = member.instagram ? getInstagramUsername(member.instagram) : '';

    return (
        <div className="flex items-center justify-center gap-4 w-full">
            <Button 
                variant="outline" 
                size="icon" 
                onClick={onPrev}
                className={cn("rounded-full h-12 w-12", !showNav && "hidden")}
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <div className="grid md:grid-cols-2 items-center gap-8 w-full max-w-2xl">
                <div className="relative mx-auto w-full max-w-xs h-[380px] flex items-center justify-center">
                     <div className="absolute w-[280px] h-full rounded-t-[140px] rounded-b-[6rem] bg-pink-100/80 dark:bg-primary/20"></div>
                     <div className="absolute w-[280px] h-full rounded-t-[140px] rounded-b-[6rem] border-4 border-primary"></div>
                     <div className="relative w-[240px] h-[320px] rounded-t-[120px] rounded-b-[5rem] overflow-hidden">
                        <Image src={member.avatar} alt={member.name} layout="fill" className="object-cover object-top" data-ai-hint="headshot portrait" />
                     </div>
                </div>
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <h3 className="text-3xl font-bold text-primary">{member.name}</h3>
                    <p className="text-xl font-semibold text-foreground">{member.role}</p>
                    <p className="text-muted-foreground">{member.class}</p>
                    {member.instagram && username && (
                        <a 
                          href={member.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 text-muted-foreground hover:text-primary transition-colors justify-center md:justify-start"
                        >
                            <Instagram className="h-5 w-5" />
                            <span>{username}</span>
                        </a>
                    )}
                </div>
            </div>
             <Button 
                variant="outline" 
                size="icon" 
                onClick={onNext}
                className={cn("rounded-full h-12 w-12", !showNav && "hidden")}
             >
                <ChevronRight className="h-6 w-6" />
            </Button>
        </div>
    )
};

const SmallMemberCard = ({ member, onSelect, isActive }: { member: Member, onSelect: () => void, isActive: boolean }) => (
    <div 
      className="flex flex-col items-center gap-2 cursor-pointer group"
      onClick={onSelect}
    >
        <div 
            className={cn(
                "relative aspect-square w-24 md:w-32 rounded-full overflow-hidden transition-all duration-300 border-4",
                isActive ? "scale-110 border-primary z-10" : "border-primary/50 group-hover:scale-105 group-hover:border-primary/80"
            )}
        >
            <Image src={member.avatar} alt={member.name} layout="fill" className="object-cover object-top" data-ai-hint="headshot portrait" />
        </div>
        <p className="text-xs text-center font-semibold text-foreground/80 w-24 md:w-32 truncate">{member.name}</p>
    </div>
);


const MemberGroup = ({ title, members, featuredMember, setFeaturedMember, showNavOnDesktop = false }: { title: string, members: Member[], featuredMember: Member | null, setFeaturedMember: (member: Member | null) => void, showNavOnDesktop?: boolean }) => {
    if (!members || members.length === 0) return null;

    const handleSelectMember = (member: Member) => {
        setFeaturedMember(member);
    };

    const handleNext = () => {
        if (!featuredMember || members.length <= 1) return;
        const currentIndex = members.findIndex(m => m.name === featuredMember.name);
        const nextIndex = (currentIndex + 1) % members.length;
        setFeaturedMember(members[nextIndex]);
    };

    const handlePrev = () => {
        if (!featuredMember || members.length <= 1) return;
        const currentIndex = members.findIndex(m => m.name === featuredMember.name);
        const prevIndex = (currentIndex - 1 + members.length) % members.length;
        setFeaturedMember(members[prevIndex]);
    };

    return (
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground text-center">{title}</h3>
            {featuredMember && (
                 <div className="flex justify-center">
                    <MemberCard 
                        member={featuredMember} 
                        onPrev={handlePrev}
                        onNext={handleNext}
                        showNav={members.length > 1}
                    />
                </div>
            )}
            
            {members.length > 1 && (
                <div className="bg-pink-100/50 dark:bg-primary/20 p-4 rounded-2xl">
                  <Carousel
                    opts={{
                      align: "center",
                      loop: members.length > 5,
                    }}
                    className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto"
                  >
                    <CarouselContent className="-ml-4">
                      {members.map((member, index) => (
                        <CarouselItem key={index} className="pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 flex justify-center py-4">
                            <SmallMemberCard 
                              member={member} 
                              onSelect={() => handleSelectMember(member)}
                              isActive={featuredMember?.name === member.name}
                            />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className={cn("flex z-20", !showNavOnDesktop && "md:hidden")} />
                    <CarouselNext className={cn("flex z-20", !showNavOnDesktop && "md:hidden")} />
                  </Carousel>
                </div>
            )}
            <div className="w-full pt-8 mt-8 border-t border-primary/20"></div>
        </div>
    );
};


export default function ProfilePage() {
  const [activeDept, setActiveDept] = useState(departments[0]);
  const [activeView, setActiveView] = useState('members');
  const [featuredHead, setFeaturedHead] = useState<Member | null>(null);
  const [featuredMembers, setFeaturedMembers] = useState<{[key: string]: Member | null}>({});
  const detailsRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  
  const currentDepartmentData = teamMembers[activeDept.id as keyof typeof teamMembers] || { heads: [], members: {} };
  const currentPrograms = programs[activeDept.id as keyof typeof programs] || [];
  const currentDivisions = divisions[activeDept.id as keyof typeof divisions] || [];
  
  useEffect(() => {
    const newHeads = teamMembers[activeDept.id as keyof typeof teamMembers]?.heads || [];
    setFeaturedHead(newHeads.length > 0 ? newHeads[0] : null);

    const newMembersByDivision = teamMembers[activeDept.id as keyof typeof teamMembers]?.members || {};
    const initialFeaturedMembers: {[key: string]: Member | null} = {};
    for (const divisionId in newMembersByDivision) {
        const divisionMembers = newMembersByDivision[divisionId as keyof typeof newMembersByDivision] || [];
        initialFeaturedMembers[divisionId] = divisionMembers.length > 0 ? divisionMembers[0] : null;
    }
    setFeaturedMembers(initialFeaturedMembers);

    if (isInitialMount.current) {
        isInitialMount.current = false;
    } else {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeDept]);

  const handleDeptClick = (dept: typeof departments[0]) => {
    setActiveDept(dept);
  };

  const setFeaturedMemberForDivision = (divisionId: string, member: Member | null) => {
    setFeaturedMembers(prev => ({...prev, [divisionId]: member}));
  }

  const activeIcon = React.cloneElement(iconMap[activeDept.icon] as React.ReactElement, { className: "w-12 h-12 text-primary" });

  return (
    <div className="flex flex-col">
       <section
        id="hero-profile"
        className="relative w-full flex items-center justify-center min-h-screen overflow-hidden bg-transparent"
      >
        <div className="absolute inset-0 bg-[url('/dot-grid.svg')] bg-repeat bg-center opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="default" className="mb-4 bg-primary/10 text-primary">
              Temui Tim Kami
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Kenali <span className="text-primary">Visioner Kami</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Kenali tim yang penuh semangat dan dedikasi di balik HMJ MI. Bersama, kami mendorong perubahan dan inovasi untuk masa depan yang lebih baik.
          </p>
           <div className="mt-8">
            <a href="#explore-cabinet">
                <Button variant="ghost" size="icon" className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 animate-bounce">
                <ChevronDown className="h-6 w-6" />
                </Button>
            </a>
          </div>
        </div>
      </section>

      <section id="explore-cabinet" className="w-full py-16 md:py-24 bg-primary/35 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Jelajahi <span className="text-primary">Struktur Kami</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Temukan berbagai departemen di HMJ MI, masing-masing dengan fokus dan program unggulan untuk mendukung pengembangan potensi mahasiswa secara menyeluruh.
            </p>
          </div>

          <Card className="max-w-5xl mx-auto p-6 md:p-8">
            <CardContent className="p-0">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-primary text-xl font-bold">*</span>
                <h3 className="text-xl font-bold text-center text-foreground/80">Departemen</h3>
                <span className="text-primary text-xl font-bold">*</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {departments.map((dept) => {
                   const icon = React.cloneElement(iconMap[dept.icon] as React.ReactElement, {
                      className: cn("w-8 h-8", activeDept.id === dept.id ? 'text-white' : 'text-primary')
                   });
                  return (
                    <button key={dept.id} onClick={() => handleDeptClick(dept)}>
                      <Card className={cn(
                        'text-center p-4 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl hover:scale-105 h-full',
                        activeDept.id === dept.id ? 'bg-primary text-primary-foreground shadow-primary/40' : 'bg-card'
                      )}>
                        <CardContent className="p-0 flex flex-col items-center gap-2">
                          <div className={cn(
                            'p-3 rounded-full transition-colors',
                             activeDept.id === dept.id ? 'bg-white/20' : 'bg-pink-100 dark:bg-primary/10'
                          )}>
                             {icon}
                          </div>
                          <h4 className="font-bold text-sm">{dept.name}</h4>
                        </CardContent>
                      </Card>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="department-details" ref={detailsRef} className="w-full pb-16 md:pb-24 pt-16 md:pt-24 bg-transparent scroll-mt-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center flex flex-col items-center mb-12">
            <div className="relative w-24 h-24 mb-4 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              {activeIcon}
            </div>
            <h2 className="text-4xl font-bold text-primary mb-2">{activeDept.fullName}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">{activeDept.description}</p>
             <div className="flex justify-center mb-4">
              <div className="w-16 h-0.5 bg-primary/50 rounded-full"></div>
            </div>

            {activeDept.id !== 'inti' && currentDivisions.length > 0 && (
              <Accordion type="single" collapsible className="w-full max-w-2xl mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Divisi</h3>
                   {currentDivisions.map((division) => (
                      <AccordionItem key={division.id} value={division.id} className="bg-card/80 backdrop-blur-sm border-b-2 rounded-lg mb-2 px-4">
                          <AccordionTrigger className="text-left font-semibold hover:no-underline">{division.name}</AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                              {division.description}
                          </AccordionContent>
                      </AccordionItem>
                   ))}
              </Accordion>
            )}

            <div className="flex gap-4">
              <Button 
                size="lg"
                onClick={() => setActiveView('members')}
                className={cn(
                  'rounded-full',
                  activeView === 'members' ? 'bg-primary text-white hover:bg-primary/90' : 'bg-white text-gray-700 dark:text-foreground dark:bg-card'
                )}
                variant={activeView === 'members' ? 'default' : 'outline'}
              >
                <Users className="mr-2 h-4 w-4" /> Anggota
              </Button>
              <Button
                size="lg"
                onClick={() => setActiveView('programs')}
                className={cn(
                    'rounded-full',
                    activeView === 'programs' ? 'bg-primary text-white hover:bg-primary/90' : 'bg-white text-gray-700 dark:text-foreground dark:bg-card'
                )}
                variant={activeView === 'programs' ? 'default' : 'outline'}
               >
                <Briefcase className="mr-2 h-4 w-4" /> Program
              </Button>
            </div>
          </div>
          
          {activeView === 'members' && (
             <div className="space-y-12">
                <MemberGroup 
                    title={activeDept.id === 'inti' ? 'Pengurus Inti' : 'Pimpinan Departemen'}
                    members={currentDepartmentData.heads}
                    featuredMember={featuredHead}
                    setFeaturedMember={setFeaturedHead}
                    showNavOnDesktop={true}
                />
                {Object.keys(currentDepartmentData.members).length > 0 && currentDivisions.length > 0 && (
                  currentDivisions.map(division => {
                    const divisionMembers = currentDepartmentData.members[division.id as keyof typeof currentDepartmentData.members] || [];
                    if (divisionMembers.length === 0) return null;
                    return (
                        <MemberGroup 
                            key={division.id}
                            title={`Tim Divisi ${division.name}`}
                            members={divisionMembers}
                            featuredMember={featuredMembers[division.id] || null}
                            setFeaturedMember={(member) => setFeaturedMemberForDivision(division.id, member)}
                            showNavOnDesktop={true}
                        />
                    );
                  })
                )}
            </div>
          )}

          {activeView === 'programs' && (
            <div>
              <div className="text-center mb-8">
                 <h3 className="text-2xl font-bold text-foreground relative inline-block">
                    Program Unggulan
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-primary/50 rounded-full"></span>
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {currentPrograms.length > 0 ? (
                  currentPrograms.map((program, index) => (
                      <Card key={index}>
                          <CardContent className="p-0">
                               <div className="relative aspect-video">
                                  <Image src={program.image} layout="fill" objectFit="cover" alt={program.title} data-ai-hint={program.hint}/>
                                  <div className="absolute top-2 right-2">
                                       <Badge className="bg-yellow-300 text-yellow-900 font-bold">{program.category}</Badge>
                                  </div>
                              </div>
                              <div className="p-6">
                                  <h4 className="text-xl font-bold text-foreground mb-2">{program.title}</h4>
                                  <p className="text-muted-foreground mb-4 text-sm">
                                    {program.description}
                                  </p>
                                  <Button variant="link" className="text-primary p-0 h-auto">
                                      Lihat Detail <ArrowUpRight className="ml-1 h-4 w-4" />
                                  </Button>
                              </div>
                          </CardContent>
                      </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground col-span-full text-center">Program kerja untuk departemen ini akan segera diperbarui.</p>
                )}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
