
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string[];
  subject: string;
  message: string;
  from?: string;
  isHtml?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Email function called with method:", req.method);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    const { to, subject, message, from, isHtml }: EmailRequest = await req.json();
    
    console.log("Sending email to:", to, "with subject:", subject);

    // Validate required fields
    if (!to || !Array.isArray(to) || to.length === 0) {
      throw new Error("Recipients (to) are required and must be an array");
    }
    
    if (!subject) {
      throw new Error("Subject is required");
    }
    
    if (!message) {
      throw new Error("Message is required");
    }

    const emailResponse = await resend.emails.send({
      from: from || "RefOS <onboarding@resend.dev>",
      to: to,
      subject: subject,
      html: isHtml ? message : `<p>${message.replace(/\n/g, '<br>')}</p>`,
      text: isHtml ? undefined : message,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: emailResponse.data?.id,
        message: "Email sent successfully" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send email",
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
