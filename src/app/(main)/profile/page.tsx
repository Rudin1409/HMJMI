
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
import { ScrollAnimation } from '@/components/scroll-animation';
import Link from 'next/link';

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
      <ScrollAnimation direction="left" delay={5}>
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrev}
          className={cn("rounded-full h-14 w-14 bg-white/5 hover:bg-purple-500/20 text-foreground hover:text-purple-500 transition-all hidden md:flex", !showNav && "invisible")}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      </ScrollAnimation>

      <div className="relative group w-full max-w-4xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl rounded-[3rem] -z-10 group-hover:opacity-75 transition-opacity duration-700" />
        <Card className="bg-white/50 dark:bg-white/10 border-white/20 dark:border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">

            {/* Left Side: Avatar - Slide from Left */}
            <ScrollAnimation key={`${member.name}-avatar`} direction="left" className="relative shrink-0 perspective-1000">
              {/* Animated background blob */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-[2.5rem] blur-xl opacity-20 dark:opacity-30 group-hover:opacity-50 dark:group-hover:opacity-60 transition-opacity duration-700" />

              {/* Card Frame */}
              <div className="relative w-64 h-80 sm:w-72 sm:h-[22rem] rounded-[2.5rem] p-[3px] bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-blue-500/30 dark:from-white/30 dark:via-purple-500/30 dark:to-white/10 shadow-2xl dark:shadow-none rotate-3 group-hover:rotate-0 group-hover:scale-[1.02] transition-all duration-500 ease-out">
                {/* Inner Content */}
                <div className="relative w-full h-full rounded-[2.3rem] overflow-hidden bg-white dark:bg-slate-900/50">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent z-10 mix-blend-overlay dark:mix-blend-normal" />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent z-10 dark:from-black/60" />
                  <Image src={member.avatar} alt={member.name} fill className="object-cover" data-ai-hint="headshot portrait" />
                </div>
              </div>
            </ScrollAnimation>

            {/* Right Side: Info - Slide from Right */}
            <ScrollAnimation key={`${member.name}-info`} direction="right" delay={2} className="flex flex-col text-center md:text-left space-y-4 flex-1">
              <div>
                <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">{member.name}</h3>
                <div className="inline-flex items-center justify-center md:justify-start gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  {member.role}
                </div>
              </div>

              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">{member.class}</p>

              {member.instagram && username && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-center md:self-start text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors group/link mt-4"
                >
                  <div className="p-2 rounded-full bg-slate-100 dark:bg-white/5 group-hover/link:bg-pink-500/10 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{username}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                </a>
              )}
            </ScrollAnimation>

          </CardContent>
        </Card>
      </div>

      <ScrollAnimation direction="right" delay={5}>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          className={cn("rounded-full h-14 w-14 bg-white/5 hover:bg-purple-500/20 text-foreground hover:text-purple-500 transition-all hidden md:flex", !showNav && "invisible")}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </ScrollAnimation>
    </div>
  )
};

const SmallMemberCard = ({ member, onSelect, isActive }: { member: Member, onSelect: () => void, isActive: boolean }) => (
  <div
    className="flex flex-col items-center gap-3 cursor-pointer group"
    onClick={onSelect}
  >
    <div
      className={cn(
        "relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg",
        isActive
          ? "ring-4 ring-purple-500 ring-offset-4 ring-offset-background scale-110 z-10"
          : "grayscale hover:grayscale-0 opacity-70 hover:opacity-100 hover:scale-105"
      )}
    >
      <Image src={member.avatar} alt={member.name} fill className="object-cover" data-ai-hint="headshot portrait" />
    </div>
    <p className={cn(
      "text-xs text-center font-bold w-24 truncate transition-colors",
      isActive ? "text-purple-600 dark:text-purple-300" : "text-muted-foreground group-hover:text-foreground"
    )}>{member.name}</p>
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
    <div className="space-y-12">
      <ScrollAnimation direction="up">
        <h3 className="text-2xl font-bold text-foreground text-center relative inline-block left-1/2 -translate-x-1/2">
          {title}
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full" />
        </h3>
      </ScrollAnimation>

      {featuredMember && (
        <div className="flex justify-center px-4">
          <MemberCard
            member={featuredMember}
            onPrev={handlePrev}
            onNext={handleNext}
            showNav={members.length > 1}
          />
        </div>
      )}

      {members.length > 1 && (
        <ScrollAnimation delay={3} className="max-w-4xl mx-auto px-4">
          <div className="bg-white/40 dark:bg-white/10 rounded-[2rem] p-6 border border-white/20">
            <Carousel
              opts={{
                align: "center",
                loop: members.length > 5,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {members.map((member, index) => (
                  <CarouselItem key={index} className="pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 flex justify-center py-8">
                    <SmallMemberCard
                      member={member}
                      onSelect={() => handleSelectMember(member)}
                      isActive={featuredMember?.name === member.name}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4 bg-white/10 hover:bg-white/20 border-none text-foreground" />
              <CarouselNext className="hidden md:flex -right-4 bg-white/10 hover:bg-white/20 border-none text-foreground" />
            </Carousel>
          </div>
        </ScrollAnimation>
      )}
      <div className="w-full pt-12 mt-12 border-t border-dashed border-white/10"></div>
    </div>
  );
};


export default function ProfilePage() {
  const [activeDept, setActiveDept] = useState(departments[0]);
  const [activeView, setActiveView] = useState('members');
  const [featuredHead, setFeaturedHead] = useState<Member | null>(null);
  const [featuredMembers, setFeaturedMembers] = useState<{ [key: string]: Member | null }>({});
  const detailsRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const currentDepartmentData = teamMembers[activeDept.id as keyof typeof teamMembers] || { heads: [], members: {} };
  const currentPrograms = programs[activeDept.id as keyof typeof programs] || [];
  const currentDivisions = divisions[activeDept.id as keyof typeof divisions] || [];

  useEffect(() => {
    const newHeads = teamMembers[activeDept.id as keyof typeof teamMembers]?.heads || [];
    setFeaturedHead(newHeads.length > 0 ? newHeads[0] : null);

    const newMembersByDivision = teamMembers[activeDept.id as keyof typeof teamMembers]?.members || {};
    const initialFeaturedMembers: { [key: string]: Member | null } = {};
    for (const divisionId in newMembersByDivision) {
      const divisionMembers: Member[] = newMembersByDivision[divisionId as keyof typeof newMembersByDivision] || [];
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
    setTimeout(() => {
      const element = document.getElementById('department-details');
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100; // Offset for navbar
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  const setFeaturedMemberForDivision = (divisionId: string, member: Member | null) => {
    setFeaturedMembers(prev => ({ ...prev, [divisionId]: member }));
  }

  const activeIcon = React.cloneElement(iconMap[activeDept.icon] as React.ReactElement, { className: "w-12 h-12 text-primary" });

  return (
    <div className="flex flex-col">
      <section
        id="hero-profile"
        className="relative w-full flex items-center justify-center min-h-screen overflow-hidden bg-transparent"
      >
        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollAnimation direction="down">
            <Badge variant="outline" className="mb-6 border-primary/50 text-primary bg-primary/10 px-6 py-2 text-base font-semibold rounded-full hover:scale-105 transition-transform">
              Temui Tim Kami
            </Badge>
          </ScrollAnimation>

          <ScrollAnimation delay={1}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 tracking-tight">
              Kenali <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-600">Visioner Kami</span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation delay={2}>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              "Kenali tim yang penuh semangat dan dedikasi di balik HMJ MI. Bersama, kami mendorong perubahan dan inovasi untuk masa depan yang lebih baik."
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={3} direction="up" className="mt-12">
            <a href="#explore-cabinet">
              <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-primary/20 bg-background/80 text-foreground hover:bg-primary/10 hover:border-primary/50 hover:text-primary shadow-lg transition-all duration-300">
                <ChevronDown className="h-6 w-6" />
              </Button>
            </a>
          </ScrollAnimation>
        </div>
      </section>

      <section id="explore-cabinet" className="w-full py-16 md:py-24 bg-primary/40 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <ScrollAnimation direction="down">
              <Badge variant="outline" className="mb-4 border-purple-500/50 text-purple-600 dark:text-purple-300 bg-purple-500/10 px-4 py-1.5 text-sm font-semibold rounded-full">
                Struktur Organisasi
              </Badge>
            </ScrollAnimation>
            <ScrollAnimation delay={1}>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                Jelajahi <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Struktur Kami</span>
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={2}>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
                Temukan berbagai departemen di HMJ MI, masing-masing dengan fokus dan program unggulan untuk mendukung pengembangan potensi mahasiswa secara menyeluruh.
              </p>
            </ScrollAnimation>
          </div>

          <ScrollAnimation delay={3} className="max-w-5xl mx-auto">
            <Card className="p-8 bg-white/50 dark:bg-white/10 border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden relative group/container">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover/container:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <CardContent className="p-0 relative z-10">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
                  <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground/70">Departemen</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {departments.map((dept, index) => {
                    const isActive = activeDept.id === dept.id;
                    const icon = React.cloneElement(iconMap[dept.icon] as React.ReactElement, {
                      className: cn("w-7 h-7 transition-colors duration-300", isActive ? 'text-white' : 'text-slate-600 dark:text-slate-400 group-hover:text-purple-500')
                    });
                    return (
                      <ScrollAnimation key={dept.id} delay={index + 4} className="h-full">
                        <button onClick={() => handleDeptClick(dept)} className="group outline-none focus:scale-95 transition-transform duration-200 w-full h-full">
                          <div className={cn(
                            'flex flex-col items-center justify-center gap-3 p-4 rounded-xl transition-all duration-300 h-full border',
                            isActive
                              ? 'bg-gradient-to-br from-purple-600 to-pink-600 border-transparent shadow-lg shadow-purple-500/25 scale-105'
                              : 'bg-white/50 dark:bg-white/5 border-white/20 hover:border-purple-500/30 hover:bg-white/80 dark:hover:bg-white/10'
                          )}>
                            <div className={cn(
                              'p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 transition-all duration-300',
                              isActive ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'
                            )}>
                              {icon}
                            </div>
                            <h4 className={cn(
                              "font-bold text-xs sm:text-sm tracking-wide transition-colors",
                              isActive ? "text-white" : "text-slate-700 dark:text-slate-300"
                            )}>{dept.name}</h4>
                          </div>
                        </button>
                      </ScrollAnimation>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      <section id="department-details" ref={detailsRef} className="w-full pb-16 md:pb-24 pt-16 md:pt-24 bg-transparent scroll-mt-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center flex flex-col items-center mb-12">
            <ScrollAnimation direction="down">
              <div className="relative w-24 h-24 mb-4 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                {activeIcon}
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={1}>
              <h2 className="text-4xl font-bold text-primary mb-2">{activeDept.fullName}</h2>
            </ScrollAnimation>
            <ScrollAnimation delay={2}>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">{activeDept.description}</p>
            </ScrollAnimation>
            <ScrollAnimation delay={3} className="flex justify-center mb-4">
              <div className="w-16 h-0.5 bg-primary/50 rounded-full"></div>
            </ScrollAnimation>

            {activeDept.id !== 'inti' && currentDivisions.length > 0 && (
              <Accordion type="single" collapsible className="w-full max-w-2xl mb-12">
                <ScrollAnimation delay={4}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="h-px bg-white/20 flex-1"></span>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Divisi Departemen</h3>
                    <span className="h-px bg-white/20 flex-1"></span>
                  </div>
                </ScrollAnimation>
                {currentDivisions.map((division, index) => (
                  <ScrollAnimation key={division.id} direction="left" delay={index + 5} className="w-full">
                    <AccordionItem value={division.id} className="bg-white/50 dark:bg-white/10 border border-white/10 rounded-xl mb-3 px-1 hover:border-purple-500/30 transition-colors">
                      <AccordionTrigger className="px-4 py-4 text-left font-semibold hover:no-underline group">
                        <span className="group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">{division.name}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
                        {division.description}
                      </AccordionContent>
                    </AccordionItem>
                  </ScrollAnimation>
                ))}
              </Accordion>
            )}

            <ScrollAnimation delay={4}>
              <div className="bg-slate-100 dark:bg-white/5 p-1.5 rounded-full inline-flex gap-2 relative">
                <Button
                  size="lg"
                  onClick={() => setActiveView('members')}
                  className={cn(
                    'rounded-full px-8 relative z-10 transition-all duration-300',
                    activeView === 'members'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-white/10 shadow-none'
                  )}
                >
                  <Users className="mr-2 h-4 w-4" /> Anggota
                </Button>
                <Button
                  size="lg"
                  onClick={() => setActiveView('programs')}
                  className={cn(
                    'rounded-full px-8 relative z-10 transition-all duration-300',
                    activeView === 'programs'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-white/10 shadow-none'
                  )}
                >
                  <Briefcase className="mr-2 h-4 w-4" /> Program
                </Button>
              </div>
            </ScrollAnimation>
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
                  const divisionMembers: Member[] = currentDepartmentData.members[division.id as keyof typeof currentDepartmentData.members] || [];
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
                <ScrollAnimation direction="up">
                  <h3 className="text-2xl font-bold text-foreground relative inline-block">
                    Program Unggulan
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-primary/50 rounded-full"></span>
                  </h3>
                </ScrollAnimation>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {currentPrograms.length > 0 ? (
                  currentPrograms.map((program, index) => (
                    <ScrollAnimation key={index} delay={index}>
                      <Card>
                        <CardContent className="p-0">
                          <div className="relative aspect-video">
                            <Image src={program.image} fill className="object-cover" alt={program.title} data-ai-hint={program.hint} />
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-yellow-300 text-yellow-900 font-bold">{program.category}</Badge>
                            </div>
                          </div>
                          <div className="p-6">
                            <h4 className="text-xl font-bold text-foreground mb-2">{program.title}</h4>
                            <p className="text-muted-foreground mb-4 text-sm">
                              {program.description}
                            </p>
                            <Button asChild variant="link" className="text-primary p-0 h-auto">
                              <Link href="/proker">
                                Lihat Detail <ArrowUpRight className="ml-1 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollAnimation>
                  ))
                ) : (
                  <ScrollAnimation>
                    <p className="text-muted-foreground col-span-full text-center">Program kerja untuk departemen ini akan segera diperbarui.</p>
                  </ScrollAnimation>
                )}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
