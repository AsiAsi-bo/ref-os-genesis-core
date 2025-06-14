
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Mail, Send, Plus, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Email: React.FC = () => {
  const [recipients, setRecipients] = useState<string[]>(['']);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [from, setFrom] = useState('');
  const [isHtml, setIsHtml] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const addRecipient = () => {
    setRecipients([...recipients, '']);
  };

  const removeRecipient = (index: number) => {
    if (recipients.length > 1) {
      setRecipients(recipients.filter((_, i) => i !== index));
    }
  };

  const updateRecipient = (index: number, value: string) => {
    const updated = [...recipients];
    updated[index] = value;
    setRecipients(updated);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSend = async () => {
    try {
      setIsSending(true);

      // Validate recipients
      const validRecipients = recipients.filter(email => email.trim() && validateEmail(email.trim()));
      
      if (validRecipients.length === 0) {
        toast({
          title: "Error",
          description: "Please enter at least one valid email address",
          variant: "destructive",
        });
        return;
      }

      if (!subject.trim()) {
        toast({
          title: "Error",
          description: "Please enter a subject",
          variant: "destructive",
        });
        return;
      }

      if (!message.trim()) {
        toast({
          title: "Error",
          description: "Please enter a message",
          variant: "destructive",
        });
        return;
      }

      console.log("Sending email with data:", {
        to: validRecipients,
        subject: subject.trim(),
        message: message.trim(),
        from: from.trim() || undefined,
        isHtml
      });

      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: validRecipients,
          subject: subject.trim(),
          message: message.trim(),
          from: from.trim() || undefined,
          isHtml
        }
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw error;
      }

      if (data?.error) {
        console.error("Email service error:", data.error);
        throw new Error(data.error);
      }

      toast({
        title: "Success!",
        description: `Email sent successfully to ${validRecipients.length} recipient(s)`,
      });

      // Reset form
      setRecipients(['']);
      setSubject('');
      setMessage('');
      setFrom('');
      setIsHtml(false);

    } catch (error: any) {
      console.error("Failed to send email:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex-1 overflow-auto p-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Compose Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* From Field */}
            <div className="space-y-2">
              <Label htmlFor="from">From (optional)</Label>
              <Input
                id="from"
                type="email"
                placeholder="your-name@yourdomain.com (leave empty for default)"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Note: You must verify your domain in Resend to use custom from addresses
              </p>
            </div>

            {/* Recipients */}
            <div className="space-y-2">
              <Label>Recipients</Label>
              {recipients.map((recipient, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="recipient@example.com"
                    value={recipient}
                    onChange={(e) => updateRecipient(index, e.target.value)}
                    className="flex-1"
                  />
                  {recipients.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeRecipient(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addRecipient}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Recipient
              </Button>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            {/* HTML Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id="html-mode"
                checked={isHtml}
                onCheckedChange={setIsHtml}
              />
              <Label htmlFor="html-mode">HTML Mode</Label>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder={isHtml ? "Enter HTML content..." : "Enter your message..."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[200px]"
              />
              {isHtml && (
                <p className="text-sm text-muted-foreground">
                  You can use HTML tags like &lt;h1&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;a&gt;, etc.
                </p>
              )}
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSend}
              disabled={isSending}
              className="w-full"
              size="lg"
            >
              {isSending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Email
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Email;
