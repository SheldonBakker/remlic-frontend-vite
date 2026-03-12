import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Shield,
  Target,
  Car,
  IdCard,
  GraduationCap,
  BarChart3,
  Clock,
  MessageCircle,
  AlertTriangle,
  Search,
  Plus,
  Edit,
  Bell,
  Download,
  ExternalLink,
  Smartphone,
} from 'lucide-react';
import { useAuthContext } from '@/context/authContext';
import { SupportDialog } from '@/components/support/SupportDialog';
import { Seo, OrganizationSchema, WebSiteSchema, WebApplicationSchema, LocalBusinessSchema } from '@/components/seo';
import { PAGE_SEO } from '@/constants/seo';
import logoImage from '@/assets/images/logo.png';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=za.co.remlic.mobile&pcampaignid=web_share';

export default function LandingPage(): React.JSX.Element {
  const { isAuthenticated } = useAuthContext();
  const [supportDialogOpen, setSupportDialogOpen] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        path={PAGE_SEO.home.path}
      />
      <OrganizationSchema />
      <WebSiteSchema />
      <WebApplicationSchema />
      <LocalBusinessSchema />
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="Remlic" className="size-8" />
            <span className="text-xl font-bold">Remlic</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setSupportDialogOpen(true)}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Support
            </Button>
            <Link to="/login">
              <Button variant="secondary">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button>Signup</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="bg-red-600 px-4 py-3 text-center text-white">
        <Link to="/signup" className="inline-flex items-center gap-2 font-bold tracking-wide">
          <span className="text-lg md:text-xl">FIRST MONTH FREE TRIAL ON SIGNUP</span>
          <span className="rounded-full bg-white px-3 py-0.5 text-sm font-bold text-red-600">
            Sign Up Now
          </span>
        </Link>
      </div>

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Never Miss an
            <span className="block text-primary">Expiry Date Again</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Track and manage all your security compliance in one place. Remlic monitors expiry dates for
            PSIRA registrations, firearms licenses, vehicle discs, and training certificates - alerting you before
            anything expires.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-5 w-5" />
                Download on Google Play
              </a>
            </Button>
            <Link to="/signup">
              <Button size="lg" variant="secondary">Signup</Button>
            </Link>
            <Button size="lg" variant="outline" onClick={() => setSupportDialogOpen(true)}>
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">What You Can Do</h2>
            <p className="mt-4 text-muted-foreground">
              Manage all your security compliance records with full CRUD functionality
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <Shield className="size-10 text-primary" />
                <CardTitle className="mt-4">PSIRA Officers</CardTitle>
                <CardDescription>
                  Verify PSIRA registration details using publicly available official sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Search className="size-4 text-primary" />
                    Auto-lookup by ID number
                  </li>
                  <li className="flex items-center gap-2">
                    <Plus className="size-4 text-primary" />
                    Save officers to your list
                  </li>
                  <li className="flex items-center gap-2">
                    <Bell className="size-4 text-primary" />
                    Track registration expiry
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="size-10 text-primary" />
                <CardTitle className="mt-4">Firearms</CardTitle>
                <CardDescription>
                  Full management of firearms with license expiry tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Plus className="size-4 text-primary" />
                    Add firearms with details
                  </li>
                  <li className="flex items-center gap-2">
                    <Edit className="size-4 text-primary" />
                    Edit and update records
                  </li>
                  <li className="flex items-center gap-2">
                    <Search className="size-4 text-primary" />
                    Search by serial number
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Car className="size-10 text-primary" />
                <CardTitle className="mt-4">Vehicles</CardTitle>
                <CardDescription>
                  Track vehicle license disc expiry dates and registration details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Plus className="size-4 text-primary" />
                    Add vehicle records
                  </li>
                  <li className="flex items-center gap-2">
                    <Edit className="size-4 text-primary" />
                    Update vehicle info
                  </li>
                  <li className="flex items-center gap-2">
                    <Search className="size-4 text-primary" />
                    Search by registration
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <GraduationCap className="size-10 text-primary" />
                <CardTitle className="mt-4">Certificates</CardTitle>
                <CardDescription>
                  Manage training certificates and track when they expire
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Plus className="size-4 text-primary" />
                    Add certificates
                  </li>
                  <li className="flex items-center gap-2">
                    <Edit className="size-4 text-primary" />
                    Edit certificate details
                  </li>
                  <li className="flex items-center gap-2">
                    <Bell className="size-4 text-primary" />
                    Expiry notifications
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Remlic Mobile App Is Live</h2>
              <p className="mt-4 text-muted-foreground">
                Android app is now available on Google Play. Manage all records and scan Drivers Licence,
                Firearm, and Vehicle records directly from your phone.
              </p>
            </div>

            <Card className="mt-10">
              <CardContent className="space-y-4 pt-6">
                <div className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Car className="size-5 text-primary" />
                    <span className="font-medium">Vehicle Scanning</span>
                  </div>
                  <Badge>Available</Badge>
                </div>

                <div className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <IdCard className="size-5 text-primary" />
                    <span className="font-medium">Drivers Licence Scanning</span>
                  </div>
                  <Badge>Available</Badge>
                </div>

                <div className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Target className="size-5 text-primary" />
                    <span className="font-medium">Firearm Scanning</span>
                  </div>
                  <Badge>Available</Badge>
                </div>

                <div className="rounded-lg border bg-muted/40 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="size-5 text-primary" />
                      <span className="font-medium">Android</span>
                    </div>
                    <Badge>Available on Google Play</Badge>
                  </div>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="size-5 text-primary" />
                      <span className="font-medium">iOS</span>
                    </div>
                    <Badge variant="secondary">Coming soon</Badge>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center">
                  <Button asChild>
                    <a
                      href={PLAY_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download on Google Play
                    </a>
                  </Button>
                  <p className="text-sm text-muted-foreground">iOS coming soon</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Simple Pricing</h2>
            <p className="mt-4 text-muted-foreground">Choose the plan that works for you</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Monthly</CardTitle>
                <CardDescription>Flexible, cancel anytime</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-4xl font-bold">R400</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <Link to="/signup">
                  <Button className="w-full">Signup</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="relative border-primary">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Best Value
                </span>
              </div>
              <CardHeader>
                <CardTitle>Yearly</CardTitle>
                <CardDescription>Save R800 (2 months free)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-4xl font-bold">R4000</span>
                  <span className="text-muted-foreground">/year</span>
                </div>
                <Link to="/signup">
                  <Button className="w-full">Signup</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">The Problem We Solve</h2>
              <p className="mt-4 text-muted-foreground">
                Security companies juggle dozens of expiry dates across PSIRA registrations, firearm licenses,
                vehicle discs, and training certificates. Missing just one can mean fines, license suspensions,
                or worse.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <BarChart3 className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Unified Expiry Dashboard</h3>
                    <p className="text-sm text-muted-foreground">
                      See all upcoming expirations in one place. Filter by record type, time period, and sort by urgency.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <AlertTriangle className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Color-Coded Alerts</h3>
                    <p className="text-sm text-muted-foreground">
                      Instantly spot expired (red) and expiring soon (orange) records. Never be caught off guard.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Flexible Time Ranges</h3>
                    <p className="text-sm text-muted-foreground">
                      View expirations for the next 30, 60, 90, 180, or 365 days. Plan ahead on your terms.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Bell className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Customizable Reminders</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure reminder settings for each record type. Choose exactly when to be notified - 7, 14, 30, or 60 days before expiry.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Expiry Dashboard Preview</CardTitle>
                  <CardDescription>See what's expiring at a glance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-destructive/50 bg-red-50 p-3 dark:bg-red-950/30">
                    <div className="flex items-center gap-2">
                      <Shield className="size-4" />
                      <span className="text-sm font-medium">John Doe - PSIRA</span>
                    </div>
                    <span className="text-xs text-destructive">Expired 3 days ago</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-orange-500/50 bg-orange-50 p-3 dark:bg-orange-950/30">
                    <div className="flex items-center gap-2">
                      <Target className="size-4" />
                      <span className="text-sm font-medium">Glock 17 - Firearm</span>
                    </div>
                    <span className="text-xs text-orange-600">Expires in 12 days</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-orange-500/50 bg-orange-50 p-3 dark:bg-orange-950/30">
                    <div className="flex items-center gap-2">
                      <Car className="size-4" />
                      <span className="text-sm font-medium">CA 123-456 - Vehicle</span>
                    </div>
                    <span className="text-xs text-orange-600">Expires in 28 days</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="size-4" />
                      <span className="text-sm font-medium">First Aid Cert</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Expires in 45 days</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Start Tracking Your Compliance Today</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-90">
            Add your PSIRA officers, firearms, vehicles, and certificates. See all your expiring records
            in one unified dashboard.
          </p>
          <div className="mt-8">
            <Link to="/signup">
              <Button size="lg" variant="secondary">
                Signup
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/50 py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Official Information Sources</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Data referenced in Remlic is sourced from the following official government websites
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <a
              href="https://www.psira.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 transition-colors hover:bg-muted"
            >
              <Shield className="size-6 text-primary" />
              <span className="text-sm font-medium">PSIRA</span>
              <span className="flex items-center gap-1 text-xs text-primary underline">
                psira.co.za <ExternalLink className="size-3" />
              </span>
            </a>
            <a
              href="https://www.enatis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 transition-colors hover:bg-muted"
            >
              <Car className="size-6 text-primary" />
              <span className="text-sm font-medium">eNatis</span>
              <span className="flex items-center gap-1 text-xs text-primary underline">
                enatis.com <ExternalLink className="size-3" />
              </span>
            </a>
            <a
              href="https://www.saps.gov.za"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 transition-colors hover:bg-muted"
            >
              <Target className="size-6 text-primary" />
              <span className="text-sm font-medium">SAPS</span>
              <span className="flex items-center gap-1 text-xs text-primary underline">
                saps.gov.za <ExternalLink className="size-3" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoImage} alt="Remlic" className="size-6" />
              <span className="font-semibold">Remlic</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms and Conditions
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </nav>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Remlic. All rights reserved.
            </p>
          </div>
          <div className="mt-8 border-t pt-6">
            <p className="text-center text-xs text-muted-foreground">
              <span className="font-semibold">Disclaimer:</span>{' '}
              Remlic is a privately developed compliance management application
              and is not affiliated with, endorsed by, or officially connected to
              the Private Security Industry Regulatory Authority (PSIRA), the South
              African Police Service (SAPS), eNatis, or any other government entity.
              All government information is sourced from publicly available official websites.
            </p>
          </div>
        </div>
      </footer>

      <SupportDialog open={supportDialogOpen} onOpenChange={setSupportDialogOpen} />
    </div>
  );
}
