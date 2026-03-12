import { Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=za.co.remlic.mobile&pcampaignid=web_share';

export function MobileAppDownloadDialog(): React.JSX.Element {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          aria-label="Open mobile app download options"
        >
          <Smartphone className="h-4 w-4 sm:mr-2" />
          <span className="sr-only sm:not-sr-only">Mobile App Download</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mobile App Download</DialogTitle>
          <DialogDescription>
            Android app is now available on Google Play.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Manage records and scan Drivers Licence, Firearm, and Vehicle records on mobile. iOS coming soon.
        </p>
        <DialogFooter className="sm:justify-start">
          <Button asChild>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-4 w-4" />
              Download on Google Play
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
