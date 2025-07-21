interface WebhookData {
  timestamp: string;
  action_type: 'email_capture' | 'newsletter_subscription' | 'quiz_completion' | 'booking_confirmation' | 'savings_calculator_conversion' | 'masterclass_signup';
  email?: string;
  source_url: string;
  user_agent: string;
  lead_data?: Record<string, any>;
}

// Legacy interface for backward compatibility
interface LegacyWebhookData {
  action: string;
  name?: string;
  email?: string;
  phone?: string;
  masterclass?: string;
  timestamp: string;
  [key: string]: any;
}

const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/23883545/u2jpujr/';

export const triggerZapierWebhook = async (data: WebhookData | LegacyWebhookData) => {
  try {
    console.log('Triggering Zapier webhook with data:', data);
    
    // Convert legacy data format to new format if needed
    const webhookData = 'action' in data ? {
      action_type: 'masterclass_signup' as const,
      email: data.email,
      timestamp: data.timestamp,
      source_url: window.location.href,
      user_agent: navigator.userAgent,
      lead_data: data,
    } : {
      ...data,
      timestamp: new Date().toISOString(),
      source_url: window.location.href,
      user_agent: navigator.userAgent,
    };
    
    await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify(webhookData),
    });

    console.log('Zapier webhook triggered successfully');
  } catch (error) {
    console.error('Error triggering Zapier webhook:', error);
    // Silent failure - don't disrupt user experience
  }
};