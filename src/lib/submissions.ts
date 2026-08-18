import { supabase } from "./supabase";

export interface ContactInput {
  name: string; email: string; phone?: string; reason?: string; message: string; consent: boolean;
}
export interface VolunteerInput {
  name: string; email: string; phone?: string; interest?: string; availability?: string; experience?: string; consent: boolean;
}

export async function submitContact(data: ContactInput) {
  const { error } = await supabase.from("contact_submissions").insert(data);
  if (error) throw error;
}

export async function submitVolunteer(data: VolunteerInput) {
  const { error } = await supabase.from("volunteer_applications").insert(data);
  if (error) throw error;
}
