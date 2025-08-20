
'use client';

import { useFormStatus } from 'react-dom';
import { useEffect, useActionState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ChevronDown, Send, CheckCircle, MessageSquareQuote, FileText } from 'lucide-react';
import { submitContactForm } from '@/app/actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full" size="lg">
      {pending ? 'Mengirim Aspirasi...' : 'Kirim Aspirasi Anda'}
      {!pending && <Send className="ml-2 h-4 w-4" />}
    </Button>
  );
}

const processSteps = [
  {
    icon: <MessageSquareQuote className="h-8 w-8 text-primary" />,
    title: "1. Pengajuan Aspirasi",
    description: "Anda mengirimkan saran, kritik, atau ide melalui formulir yang tersedia."
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "2. Peninjauan Tim",
    description: "Tim kami akan meninjau setiap aspirasi yang masuk untuk memahami konteksnya."
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: "3. Tindak Lanjut",
    description: "Aspirasi yang relevan akan didiskusikan dan dijadikan bahan pertimbangan kami."
  }
];

export default function AspirationPage() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.message.startsWith('Success')) {
        toast({
          title: 'Sukses!',
          description: state.message,
          variant: 'default',
        });
      } else {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast]);


  return (
    <div className="flex flex-col bg-background">
       <section 
        id="hero-aspiration" 
        className="relative w-full flex items-center justify-center min-h-[70vh]"
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="default" className="mb-4 bg-pink-100 text-primary">
            Kami Mendengar Anda
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            Suara Anda, <span className="text-primary">Perubahan Kita</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Setiap suara, saran, dan ide Anda adalah aset berharga yang membantu kami untuk terus berkembang. Mari berkontribusi untuk kemajuan bersama.
          </p>
          <div className="mt-8">
            <a href="#aspiration-form">
                <Button variant="ghost" size="icon" className="rounded-full bg-pink-100 text-primary hover:bg-pink-200 animate-bounce">
                <ChevronDown className="h-6 w-6" />
                </Button>
            </a>
          </div>
        </div>
      </section>

      <section id="aspiration-form" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
                <div>
                     <div className="text-left mb-8">
                        <div className="flex justify-start mb-4">
                        <div className="w-16 h-1 bg-primary rounded-full"></div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Sampaikan <span className="text-primary">Gagasan Anda</span>
                        </h2>
                        <p className="mt-4 max-w-xl text-muted-foreground">
                            Gunakan formulir ini untuk mengirimkan gagasan, masukan, atau kritik yang membangun. Kami sangat menghargai setiap kontribusi dari Anda.
                        </p>
                    </div>
                     <Card className="shadow-2xl rounded-2xl">
                        <CardContent className="p-8">
                        <form action={dispatch} className="space-y-6">
                            <div className="space-y-2">
                            <Label htmlFor="name">Nama Anda</Label>
                            <Input id="name" name="name" placeholder="Masukkan nama lengkap" required />
                            {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="email">Alamat Email</Label>
                            <Input id="email" name="email" type="email" placeholder="contoh@email.com" required />
                            {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email}</p>}
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="message">Pesan Aspirasi</Label>
                            <Textarea id="message" name="message" placeholder="Tuliskan aspirasi, ide, atau saran Anda di sini..." rows={5} required />
                            {state.errors?.message && <p className="text-sm font-medium text-destructive">{state.errors.message}</p>}
                            </div>
                            <input type="hidden" name="subject" value="Aspiration" />
                            <SubmitButton />
                        </form>
                        </CardContent>
                    </Card>
                </div>
                 <div className="space-y-8">
                    <div className="text-left">
                        <h3 className="text-2xl font-bold text-gray-800">Bagaimana Aspirasi Anda Diproses?</h3>
                        <p className="text-muted-foreground mt-2">Kami percaya pada transparansi. Berikut adalah tahapan yang akan dilalui oleh setiap aspirasi yang kami terima.</p>
                    </div>
                    {processSteps.map((step, index) => (
                        <Card key={index} className="bg-pink-50/50 border-l-4 border-primary shadow-sm">
                            <CardContent className="flex items-center gap-6 p-6">
                                <div className="flex-shrink-0 bg-pink-100 rounded-full p-3">
                                    {step.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800">{step.title}</h4>
                                    <p className="text-muted-foreground text-sm">{step.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
