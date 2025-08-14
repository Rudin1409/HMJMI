'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Nama harus memiliki minimal 2 karakter.' }),
  email: z.string().email({ message: 'Mohon masukkan alamat email yang valid.' }),
  subject: z.string().min(5, { message: 'Subjek harus memiliki minimal 5 karakter.' }),
  message: z.string().min(10, { message: 'Pesan harus memiliki minimal 10 karakter.' }),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Mohon periksa kembali isian formulir Anda.',
    };
  }

  try {
    // In a real application, you would integrate with an email service (e.g., Resend, SendGrid)
    // or save the data to a database (e.g., Firebase Firestore).
    console.log('Form data submitted successfully:');
    console.log(validatedFields.data);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      message: 'Success: Terima kasih atas pesan Anda! Kami akan segera menghubungi Anda kembali.',
      errors: {},
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      message: 'Error: Terjadi kesalahan pada server. Mohon coba lagi nanti.',
      errors: {},
    };
  }
}
