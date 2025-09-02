import { createClient } from '@supabase/supabase-js'

/* ========= Supabase Client ========= */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env or Vercel settings."
  )
}

// ✅ Correct createClient usage
const supabase = createClient(supabaseUrl, supabaseAnonKey)

/* ========= Types ========= */
export interface RegistrationData {
  name: string
  email: string
  phone: string
  organization: string
  country: string
  city: string
}

export interface RegistrationResponse {
  success: boolean
  message: string
  error?: string
}

/* ========= Service ========= */
export async function submitRegistration(
  data: RegistrationData
): Promise<RegistrationResponse> {
  try {
    // Check env vars before anything
    if (!supabaseUrl || !supabaseAnonKey) {
      return {
        success: false,
        message:
          "Supabase environment variables are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
        error: "Missing Supabase config",
      }
    }

    console.log("🔎 Using Supabase client:", {
      url: supabaseUrl,
      anonKeyStart: supabaseAnonKey?.slice(0, 12),
    })

    console.log("Starting registration submission with data:", {
      name: data.name,
      email: data.email,
      organization: data.organization,
    })

    // Save to Supabase database
    const { data: insertData, error: dbError } = await supabase
      .from("registration_requests")
      .insert([
        {
          name: data.name, // make sure this matches your table column
          email: data.email,
          phone: data.phone,
          organization: data.organization,
          country: data.country,
          city: data.city,
        },
      ])
      .select() // removed .single() for safety

    if (dbError) {
      console.error("❌ Database error:", dbError)
      return {
        success: false,
        message: `فشل في حفظ البيانات: ${dbError.message}`,
        error: `Database Error: ${dbError.message} (Code: ${dbError.code})`,
      }
    }

    console.log("Data saved successfully to database:", insertData)

    // Send email via Supabase Edge Function
    const emailApiUrl = `${supabaseUrl}/functions/v1/send-email`
    console.log("Attempting to send email to:", emailApiUrl)

    const emailResponse = await fetch(emailApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        organization: data.organization,
      }),
    })

    const emailResult = await emailResponse.json()

    if (!emailResponse.ok) {
      console.error("Email sending failed:", {
        status: emailResponse.status,
        statusText: emailResponse.statusText,
        result: emailResult,
      })
      return {
        success: true,
        message:
          "تم حفظ البيانات بنجاح، لكن فشل في إرسال البريد الإلكتروني. سنتواصل معك قريباً.",
      }
    }

    console.log("Email sent successfully:", emailResult)

    return {
      success: true,
      message: "تم حفظ البيانات بنجاح وتم إرسال بريد إلكتروني للتأكيد",
    }
  } catch (error) {
    console.error("Registration error details:", {
      error: error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })
    return {
      success: false,
      message: `حدث خطأ غير متوقع: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
