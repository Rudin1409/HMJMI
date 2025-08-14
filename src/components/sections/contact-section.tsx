'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { submitContactForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Kirim Pesan
    </Button>
  );
}

export function ContactSection() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.message.startsWith('Success')) {
        toast({
          title: 'Pesan Terkirim!',
          description: state.message.replace('Success: ', ''),
        });
        formRef.current?.reset();
      } else {
        toast({
          title: 'Gagal Mengirim Pesan',
          description: state.message.replace('Error: ', ''),
          variant: 'destructive',
        });
      }
    }
  }, [state, toast]);

  return (
    <section id="kontak" className="w-full bg-background py-16 md:py-24">
      <div className="container">
        <Card className="mx-auto max-w-2xl border-border/40 bg-background/50 shadow-lg backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl">Hubungi Kami</CardTitle>
            <CardDescription className="md:text-xl/relaxed">
              Punya pertanyaan, saran, atau ingin berkolaborasi?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={dispatch} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input id="name" name="name" placeholder="John Doe" required />
                  {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                  {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subjek</Label>
                <Input id="subject" name="subject" placeholder="Kolaborasi Acara" required />
                {state.errors?.subject && <p className="text-sm text-destructive">{state.errors.subject[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Pesan Anda</Label>
                <Textarea id="message" name="message" placeholder="Tuliskan pesan Anda di sini..." required rows={5} />
                {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
