
interface WebhookData {
  timestamp: string;
  action_type: 'email_capture' | 'newsletter_subscription' | 'quiz_completion' | 'booking_confirmation' | 'savings_calculator_conversion';
  email?: string;
  source_url: string;
  user_agent: string;
  lead_data?: Record<string, any>;
}

const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/23883545/u2jpujr/';

export const triggerZapierWebhook = async (data: WebhookData) => {
  try {
    console.log('Triggering Zapier webhook with data:', data);
    
    await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source_url: window.location.href,
        user_agent: navigator.userAgent,
      }),
    });

    console.log('Zapier webhook triggered successfully');
  } catch (error) {
    console.error('Error triggering Zapier webhook:', error);
    // Silent failure - don't disrupt user experience
  }
};
