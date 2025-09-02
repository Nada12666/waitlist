import { supabase } from '../lib/supabase';

export interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  country: string;
  city: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  error?: string;
}

export async function submitRegistration(data: RegistrationData): Promise<RegistrationResponse> {
  try {
    // Save to Supabase database
    const { data: insertData, error: dbError } = await supabase
      .from('registration_requests')
      .insert([
        {
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          organization: data.organization,
          country: data.country,
          city: data.city,
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return {
        success: false,
        message: 'فشل في حفظ البيانات',
        error: dbError.message,
      };
    }

    // Send email via Supabase Edge Function
    const emailApiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`;
    
    const emailResponse = await fetch(emailApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.fullName,
        email: data.email,
        organization: data.organization,
      }),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error('Email sending failed:', emailResult);
      // Data is already saved, but email failed
      return {
        success: true,
        message: 'تم حفظ البيانات بنجاح، لكن فشل في إرسال البريد الإلكتروني',
      };
    }

    return {
      success: true,
      message: 'تم التسجيل بنجاح وتم إرسال بريد إلكتروني للتأكيد',
    };

  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'حدث خطأ غير متوقع',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}