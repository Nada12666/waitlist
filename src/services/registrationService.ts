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
    console.log('Starting registration submission with data:', {
      name: data.fullName,
      email: data.email,
      organization: data.organization,
      // Don't log sensitive data like phone numbers
    });

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
      console.error('Database error details:', {
        message: dbError.message,
        details: dbError.details,
        hint: dbError.hint,
        code: dbError.code
      });
      return {
        success: false,
        message: `فشل في حفظ البيانات: ${dbError.message}`,
        error: `Database Error: ${dbError.message} (Code: ${dbError.code})`,
      };
    }

    console.log('Data saved successfully to database:', insertData);

    // Send email via Supabase Edge Function
    const emailApiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`;
    
    console.log('Attempting to send email to:', emailApiUrl);
    
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
      console.error('Email sending failed:', {
        status: emailResponse.status,
        statusText: emailResponse.statusText,
        result: emailResult
      });
      // Data is already saved, but email failed
      return {
        success: true,
        message: 'تم حفظ البيانات بنجاح، لكن فشل في إرسال البريد الإلكتروني. سنتواصل معك قريباً.',
      };
    }

    console.log('Email sent successfully:', emailResult);

    return {
      success: true,
      message: 'تم حفظ البيانات بنجاح وتم إرسال بريد إلكتروني للتأكيد',
    };

  } catch (error) {
    console.error('Registration error details:', {
      error: error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return {
      success: false,
      message: `حدث خطأ غير متوقع: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}