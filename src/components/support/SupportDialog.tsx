import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuthContext } from '@/context/authContext';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import apiClient from '@/api/services/apiClient';

const TURNSTILE_SCRIPT_ID = 'cf-turnstile-script';
const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const TURNSTILE_NOT_CONFIGURED_MESSAGE = 'Human verification is not configured for this environment.';
const TURNSTILE_UNAVAILABLE_MESSAGE = 'Human verification is currently unavailable. Please try again later.';
const TURNSTILE_EXPIRED_MESSAGE = 'Verification expired. Please complete it again.';
const TURNSTILE_FAILED_MESSAGE = 'Verification failed. Please try again.';

let turnstileScriptPromise: Promise<void> | null = null;

interface TurnstileOptions {
  sitekey: string;
  callback: (token: string)=> void;
  'expired-callback': ()=> void;
  'error-callback': (errorCode: string)=> void;
}

interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileOptions)=> string;
  remove: (widgetId: string)=> void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

async function waitForTurnstileApi(timeoutMs = 4000): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (window.turnstile) {
      resolve();
      return;
    }

    let timeoutId = 0;
    const intervalId = window.setInterval(() => {
      if (window.turnstile) {
        window.clearInterval(intervalId);
        window.clearTimeout(timeoutId);
        resolve();
      }
    }, 50);

    timeoutId = window.setTimeout(() => {
      window.clearInterval(intervalId);
      reject(new Error('Turnstile API unavailable'));
    }, timeoutMs);
  });
}

async function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) {
    return;
  }

  if (turnstileScriptPromise) {
    return turnstileScriptPromise;
  }

  turnstileScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      if (window.turnstile) {
        resolve();
        return;
      }
      if (existingScript.dataset.loaded === 'true') {
        void waitForTurnstileApi()
          .then(() => resolve())
          .catch((err: unknown) => reject(err));
        return;
      }
      if (existingScript.dataset.error === 'true') {
        reject(new Error('Failed to load Turnstile script'));
        return;
      }
      existingScript.addEventListener('load', () => {
        void waitForTurnstileApi()
          .then(() => resolve())
          .catch((err: unknown) => reject(err));
      }, { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Turnstile script')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      void waitForTurnstileApi()
        .then(() => resolve())
        .catch((err: unknown) => reject(err));
    }, { once: true });
    script.addEventListener('error', () => {
      script.dataset.error = 'true';
      reject(new Error('Failed to load Turnstile script'));
    }, { once: true });
    document.head.appendChild(script);
  });

  try {
    await turnstileScriptPromise;
  } catch (err) {
    turnstileScriptPromise = null;
    throw err;
  }
}

interface SupportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean)=> void;
}

interface SupportFormData {
  email: string;
  subject: string;
  message: string;
}

export function SupportDialog({ open, onOpenChange }: SupportDialogProps): React.JSX.Element {
  const { authUser } = useAuthContext();
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [isTurnstileReady, setIsTurnstileReady] = useState(false);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SupportFormData>({
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    if (authUser?.email) {
      setFormData((prev) => ({ ...prev, email: authUser.email }));
    }
  }, [authUser?.email]);

  const resetTurnstile = useCallback((): void => {
    setTurnstileToken('');
    setIsTurnstileReady(false);

    const currentWidgetId = widgetIdRef.current;
    if (currentWidgetId && window.turnstile) {
      window.turnstile.remove(currentWidgetId);
    }

    widgetIdRef.current = null;
    setWidgetId(null);

    if (turnstileContainerRef.current) {
      turnstileContainerRef.current.innerHTML = '';
    }
  }, []);

  useEffect(() => {
    if (!open) {
      resetTurnstile();
      setTurnstileError(null);
      return;
    }

    const siteKey = turnstileSiteKey?.trim();
    if (!siteKey) {
      setTurnstileError(TURNSTILE_NOT_CONFIGURED_MESSAGE);
      return;
    }

    let isCancelled = false;
    setTurnstileError(null);

    const initializeTurnstile = async (): Promise<void> => {
      try {
        await loadTurnstileScript();
        if (isCancelled || !turnstileContainerRef.current || !window.turnstile || widgetIdRef.current) {
          return;
        }

        const currentWidgetId = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: siteKey,
          callback: (token: string): void => {
            setTurnstileToken(token);
            setTurnstileError(null);
          },
          'expired-callback': (): void => {
            setTurnstileToken('');
            setTurnstileError(TURNSTILE_EXPIRED_MESSAGE);
          },
          'error-callback': (errorCode: string): void => {
            setTurnstileToken('');
            console.error('Turnstile verification error', errorCode);
            setTurnstileError(`${TURNSTILE_FAILED_MESSAGE} (code: ${errorCode})`);
          },
        });

        widgetIdRef.current = currentWidgetId;
        setWidgetId(currentWidgetId);
        setIsTurnstileReady(true);
      } catch (err) {
        if (isCancelled) {
          return;
        }
        console.error('Turnstile initialization failed', err);
        const errorMessage = err instanceof Error ? err.message.toLowerCase() : '';
        if (errorMessage.includes('script') || errorMessage.includes('api unavailable')) {
          setTurnstileError(TURNSTILE_UNAVAILABLE_MESSAGE);
          return;
        }
        setTurnstileError(TURNSTILE_FAILED_MESSAGE);
      }
    };

    void initializeTurnstile();

    return (): void => {
      isCancelled = true;
    };
  }, [open, resetTurnstile, turnstileSiteKey]);

  const isFormValid = formData.email.trim().length > 0 &&
    formData.subject.trim().length > 0 &&
    formData.message.trim().length > 0;
  const canSubmit = isFormValid && isTurnstileReady && turnstileToken.length > 0 && !isSubmitting;

  const handleOpenChange = (newOpen: boolean): void => {
    onOpenChange(newOpen);
    if (!newOpen) {
      resetTurnstile();
      setTurnstileError(null);
      setFormData({
        email: authUser?.email ?? '',
        subject: '',
        message: '',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!canSubmit) {
      if (!turnstileToken) {
        toast.error('Please complete human verification before sending your message.');
      }
      return;
    }

    setIsSubmitting(true);

    try {
      await apiClient.post('/contact', {
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        turnstileToken,
      });

      toast.success('Support request sent successfully. We\'ll get back to you soon!');
      handleOpenChange(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send support request';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof SupportFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Support</DialogTitle>
          <DialogDescription>
            Have a question or need help? Send us a message and we&apos;ll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => void handleSubmit(e)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange('email')}
                disabled={!!authUser?.email}
                required
              />
              {authUser?.email && (
                <p className="text-xs text-muted-foreground">
                  Using your account email
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="What is this regarding?"
                value={formData.subject}
                onChange={handleChange('subject')}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Please describe your issue or question in detail..."
                value={formData.message}
                onChange={handleChange('message')}
                rows={5}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="turnstile">Verification</Label>
              <div
                id="turnstile"
                ref={turnstileContainerRef}
                className="min-h-[66px]"
              />
              {turnstileError && (
                <p className="text-xs text-destructive">
                  {turnstileError}
                </p>
              )}
              {!turnstileError && !turnstileToken && (
                <p className="text-xs text-muted-foreground">
                  Please complete verification before sending your message.
                </p>
              )}
              {widgetId && !turnstileError && turnstileToken && (
                <p className="text-xs text-muted-foreground">
                  Verification complete.
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
