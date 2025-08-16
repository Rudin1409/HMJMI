
'use client';

import { useFormStatus } from 'react-dom';
import { useEffect, useActionState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ChevronDown, Send } from 'lucide-react';
import { submitContactForm } from '@/app/actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full" size="lg">
      {pending ? 'Mengirim...' : 'Kirim Aspirasi'}
      {!pending && <Send className="ml-2 h-4 w-4" />}
    </Button>
  );
}

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
    <div className="flex flex-col">
       <section 
        id="hero-aspiration" 
        className="relative w-full bg-gradient-to-b from-pink-100/50 to-white flex items-center justify-center min-h-screen"
      >
         <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="default" className="mb-4 bg-pink-100 text-primary">
            Suara Anda Penting
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            Sampaikan <span className="text-primary">Aspirasi Anda!</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Bagikan aspirasi, saran, dan ide Anda untuk membantu kami tumbuh dan berkembang. Pendapat Anda sangat berarti bagi kemajuan bersama.
          </p>
          <div className="mt-8">
            <Button variant="ghost" size="icon" className="rounded-full bg-pink-100 text-primary hover:bg-pink-200 animate-bounce">
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      <section id="aspiration-form" className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-2xl">
           <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Formulir <span className="text-primary">Aspirasi</span>
            </h2>
             <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                Gunakan formulir di bawah ini untuk mengirimkan ide, saran, atau kritik membangun. Setiap masukan akan kami terima dengan baik.
            </p>
          </div>

          <Card className="shadow-2xl rounded-2xl">
            <CardContent className="p-8">
              <form action={dispatch} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama</Label>
                  <Input id="name" name="name" placeholder="Masukkan nama Anda" required />
                   {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="Masukkan email Anda" required />
                  {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Pesan Aspirasi</Label>
                  <Textarea id="message" name="message" placeholder="Tuliskan aspirasi, ide, atau saran Anda di sini..." rows={6} required />
                  {state.errors?.message && <p className="text-sm font-medium text-destructive">{state.errors.message}</p>}
                </div>
                 <input type="hidden" name="subject" value="Aspiration" />
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
