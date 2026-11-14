import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  Activity,
  ArrowDownUp,
  ArrowRight,
  Bell,
  Bus,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileCheck2,
  FileText,
  Gauge,
  Languages,
  MapPin,
  Menu,
  Moon,
  Route as RouteIcon,
  Search,
  ShieldCheck,
  Sun,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getEmptyStateMessage } from "@/features/peepal/empty-states";
import { translations, type LanguageCode, type TranslationKey } from "@/features/peepal/translations";
import type { UserRole } from "@/features/peepal/types";

type View = "explore" | "routes" | "tracking" | "saved" | "updates" | "student" | "driver" | "admin" | "auth" | "profile";
type AuthMode = "login" | "signup" | "phone" | "otp" | "reset";

type NavItem = { id: View; label: TranslationKey; icon: typeof Bus };

const passengerNav: NavItem[] = [
  { id: "explore", label: "explore", icon: Search },
  { id: "routes", label: "routes", icon: RouteIcon },
  { id: "tracking", label: "tracking", icon: MapPin },
  { id: "saved", label: "saved", icon: Check },
  { id: "updates", label: "notifications", icon: Bell },
];

const roleStart: Record<UserRole, View> = {
  passenger: "explore",
  student: "student",
  driver: "driver",
  administrator: "admin",
};

const roleLabels: Record<UserRole, TranslationKey> = {
  passenger: "passenger",
  student: "student",
  driver: "driver",
  administrator: "administrator",
};

function EmptyNotice({ icon: Icon = CircleHelp, children }: { icon?: typeof Bus; children: ReactNode }) {
  return (
    <div className="flex min-h-24 items-center gap-3 border-t border-border px-1 py-5 text-sm text-muted-foreground">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground/70">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <p>{children}</p>
    </div>
  );
}

function SectionHeading({ icon: Icon, title, action }: { icon: typeof Bus; title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="flex min-w-0 items-center gap-2 font-display text-lg font-semibold">
        <Icon aria-hidden="true" className="size-[18px] text-primary" />
        <span>{title}</span>
      </h2>
      {action}
    </div>
  );
}

export function PeepalApp() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [role, setRole] = useState<UserRole>("passenger");
  const [view, setView] = useState<View>("explore");
  const [dark, setDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [selectedFile, setSelectedFile] = useState("");
  const t = (key: TranslationKey) => translations[language][key];

  const navItems = useMemo(() => {
    if (role === "student") return [{ id: "student" as const, label: "studentPass" as const, icon: FileCheck2 }, ...passengerNav.slice(0, 3)];
    if (role === "driver") return [{ id: "driver" as const, label: "driverTools" as const, icon: Gauge }, ...passengerNav.slice(1, 3)];
    if (role === "administrator") return [{ id: "admin" as const, label: "management" as const, icon: ShieldCheck }, ...passengerNav.slice(1, 3)];
    return passengerNav;
  }, [role]);

  const title = (() => {
    const titles: Record<View, TranslationKey> = {
      explore: "explore", routes: "routes", tracking: "tracking", saved: "saved", updates: "notifications",
      student: "studentPass", driver: "driverTools", admin: "management", auth: "signIn", profile: "profile",
    };
    return t(titles[view]);
  })();

  function switchRole(nextRole: UserRole) {
    setRole(nextRole);
    setView(roleStart[nextRole]);
    setMobileMenuOpen(false);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchSubmitted(true);
    setView("routes");
  }

  const navButton = (item: NavItem, mobile = false) => {
    const Icon = item.icon;
    const active = view === item.id;
    return (
      <Button
        key={item.id}
        type="button"
        variant="ghost"
        onClick={() => { setView(item.id); setMobileMenuOpen(false); }}
        aria-current={active ? "page" : undefined}
        className={`h-11 justify-start gap-3 px-3 text-sm ${active ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"} ${mobile ? "h-14 min-w-0 flex-1 flex-col gap-1 px-1 text-[11px]" : "w-full"}`}
      >
        <Icon aria-hidden="true" className="size-[18px] shrink-0" />
        <span className="truncate">{t(item.label)}</span>
      </Button>
    );
  };

  const rolePicker = (
    <label className="relative flex h-10 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm">
      <UsersRound aria-hidden="true" className="size-4 text-muted-foreground" />
      <span className="sr-only">{t("chooseRole")}</span>
      <select
        aria-label={t("chooseRole")}
        value={role}
        onChange={(event) => switchRole(event.currentTarget.value as UserRole)}
        className="max-w-36 appearance-none bg-transparent pr-5 font-medium outline-none"
      >
        {(Object.keys(roleLabels) as UserRole[]).map((item) => <option key={item} value={item}>{t(roleLabels[item])}</option>)}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-2 size-3.5 text-muted-foreground" />
    </label>
  );

  return (
    <div className={dark ? "dark min-h-screen bg-background text-foreground" : "min-h-screen bg-background text-foreground"}>
      <div className="min-h-screen">
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t("openMenu")} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
              <button type="button" className="flex items-center gap-2.5 text-left" onClick={() => { setRole("passenger"); setView("explore"); }}>
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Bus aria-hidden="true" className="size-5" /></span>
                <span className="leading-tight">
                  <span className="block font-display text-lg font-bold">PEEPAL</span>
                  <span className="hidden text-xs text-muted-foreground sm:block">{t("tagline")}</span>
                </span>
              </button>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              {rolePicker}
              <label className="hidden h-10 items-center gap-1.5 rounded-md border border-border px-2.5 sm:flex">
                <Languages aria-hidden="true" className="size-4 text-muted-foreground" />
                <span className="sr-only">{t("language")}</span>
                <select aria-label={t("language")} value={language} onChange={(event) => setLanguage(event.currentTarget.value as LanguageCode)} className="bg-transparent text-sm outline-none">
                  <option value="en">English</option><option value="kn">ಕನ್ನಡ</option><option value="hi">हिन्दी</option>
                </select>
              </label>
              <Button variant="ghost" size="icon" aria-label={dark ? t("light") : t("dark")} onClick={() => setDark(!dark)}>
                {dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
              </Button>
              <Button variant="outline" size="sm" className="hidden sm:inline-flex" onClick={() => setView("auth")}>
                {t("signIn")}
              </Button>
              <Button variant="ghost" size="icon" aria-label={t("profile")} onClick={() => setView("profile")}>
                <UserRound aria-hidden="true" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-border px-4 py-2 sm:hidden">
            <Languages aria-hidden="true" className="size-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{t("language")}</span>
            <select aria-label={t("language")} value={language} onChange={(event) => setLanguage(event.currentTarget.value as LanguageCode)} className="bg-transparent text-xs outline-none">
              <option value="en">English</option><option value="kn">ಕನ್ನಡ</option><option value="hi">हिन्दी</option>
            </select>
            <Button variant="link" size="sm" className="ml-auto h-7 px-1" onClick={() => setView("auth")}>{t("signIn")}</Button>
          </div>
        </header>

        <div className="mx-auto flex max-w-[1440px]">
          <aside className={`fixed inset-y-[110px] left-0 z-20 w-[268px] border-r border-border bg-background px-4 py-5 transition-transform lg:sticky lg:top-[68px] lg:block lg:h-[calc(100vh-68px)] lg:translate-x-0 ${mobileMenuOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"}`}>
            <div className="mb-6 px-2">
              <p className="text-xs font-semibold uppercase text-muted-foreground">{t("chooseRole")}</p>
              <p className="mt-1 font-medium">{t(roleLabels[role])}</p>
            </div>
            <nav aria-label={t("chooseRole")} className="space-y-1">
              {navItems.map((item) => navButton(item))}
            </nav>
            <div className="my-5 border-t border-border" />
            <nav aria-label={t("profile")} className="space-y-1">
              <Button variant="ghost" className="h-11 w-full justify-start gap-3 px-3 text-sm text-muted-foreground" onClick={() => setView("profile")}><UserRound aria-hidden="true" className="size-[18px]" />{t("profile")}</Button>
              <Button variant="ghost" className="h-11 w-full justify-start gap-3 px-3 text-sm text-muted-foreground" onClick={() => setView("auth")}><ShieldCheck aria-hidden="true" className="size-[18px]" />{t("signIn")}</Button>
            </nav>
            <div className="absolute bottom-5 left-5 right-5 border-t border-border pt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><Activity className="size-3.5" />{t("connectNotice")}</span>
            </div>
          </aside>

          {mobileMenuOpen && <button aria-label={t("openMenu")} className="fixed inset-0 z-10 bg-foreground/20 lg:hidden" onClick={() => setMobileMenuOpen(false)} />}

          <main className="min-h-[calc(100vh-68px)] min-w-0 flex-1 px-4 pb-24 pt-7 sm:px-6 sm:pt-9 lg:px-10 lg:pb-10">
            <div className="mx-auto max-w-[1060px]">
              <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="mb-1 text-sm font-medium text-primary">{t("brand")} <span className="text-muted-foreground">/ {t(roleLabels[role])}</span></p>
                  <h1 className="font-display text-3xl font-semibold sm:text-4xl">{view === "explore" ? t("welcome") : title}</h1>
                  {view === "explore" && <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{t("welcomeDescription")}</p>}
                  {view === "student" && <p className="mt-2 text-sm text-muted-foreground">{t("studentDescription")}</p>}
                  {view === "driver" && <p className="mt-2 text-sm text-muted-foreground">{t("driverDescription")}</p>}
                  {view === "admin" && <p className="mt-2 text-sm text-muted-foreground">{t("adminDescription")}</p>}
                </div>
                {view !== "auth" && view !== "profile" && rolePicker}
              </div>

              {view === "explore" && (
                <div className="space-y-7 gentle-enter">
                  <form onSubmit={handleSearch} className="flex flex-col gap-3 border-y border-border py-5 sm:flex-row">
                    <div className="relative flex-1">
                      <Search aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input value={searchValue} onChange={(event) => setSearchValue(event.currentTarget.value)} placeholder={t("searchPlaceholder")} aria-label={t("searchPlaceholder")} className="h-12 pl-10" />
                    </div>
                    <Button type="submit" className="h-12 px-6"><Search aria-hidden="true" />{t("search")}</Button>
                  </form>
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.85fr)]">
                    <section className="space-y-4">
                      <SectionHeading icon={MapPin} title={t("mapTitle")} action={<span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="size-2 rounded-full bg-warning" />{t("gpsLabel")}</span>} />
                      <div className="map-grid relative flex min-h-[310px] items-center justify-center overflow-hidden rounded-md border border-border sm:min-h-[370px]">
                        <div className="max-w-sm px-6 text-center">
                          <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-background text-primary shadow-sm"><MapPin aria-hidden="true" className="size-5" /></span>
                          <p className="font-semibold">{t("gpsWaiting")}</p>
                          <p className="mt-2 text-sm text-muted-foreground">{t("gpsMapNote")}</p>
                        </div>
                        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md border border-border bg-background/95 px-3 py-2 text-xs text-muted-foreground"><Activity aria-hidden="true" className="size-3.5" />{t("noLiveData")}</div>
                      </div>
                    </section>
                    <div className="space-y-8">
                      <section className="space-y-3">
                        <SectionHeading icon={Clock3} title={t("recent")} />
                        <EmptyNotice icon={Search}>{t("recentEmpty")}</EmptyNotice>
                      </section>
                      <section className="space-y-3">
                        <SectionHeading icon={RouteIcon} title={t("saved")} action={<Button variant="ghost" size="sm" onClick={() => setView("saved")}>{t("viewAll")}<ArrowRight aria-hidden="true" /></Button>} />
                        <EmptyNotice icon={RouteIcon}>{t("savedRoutesEmpty")}</EmptyNotice>
                      </section>
                    </div>
                  </div>
                  <div className="grid gap-7 border-t border-border pt-6 md:grid-cols-2">
                    <section className="space-y-3"><SectionHeading icon={Bell} title={t("notifications")} /><EmptyNotice icon={Bell}>{t("noNotifications")}</EmptyNotice></section>
                    <section className="space-y-3"><SectionHeading icon={UsersRound} title={t("crowdStatus")} /><EmptyNotice icon={UsersRound}>{t("noCrowd")}</EmptyNotice></section>
                  </div>
                </div>
              )}

              {view === "routes" && (
                <section className="space-y-5 gentle-enter">
                  <SectionHeading icon={RouteIcon} title={t("routeSearch")} />
                  <form onSubmit={handleSearch} className="grid gap-4 border-y border-border py-5 md:grid-cols-2">
                    <div className="space-y-2"><Label htmlFor="route-query">{t("searchFilters")}</Label><Input id="route-query" value={searchValue} onChange={(event) => setSearchValue(event.currentTarget.value)} placeholder={t("searchPlaceholder")} /></div>
                    <div className="space-y-2"><Label htmlFor="route-start">{t("startingStop")}</Label><Input id="route-start" placeholder={t("startingStop")} /></div>
                    <div className="space-y-2"><Label htmlFor="route-destination">{t("destination")}</Label><Input id="route-destination" placeholder={t("destination")} /></div>
                    <div className="space-y-2"><Label htmlFor="route-direction">{t("direction")}</Label><div className="relative"><select id="route-direction" className="h-10 w-full appearance-none rounded-md border border-input bg-background px-3 pr-9 text-sm text-muted-foreground"><option value="">{t("directionPlaceholder")}</option></select><ChevronDown aria-hidden="true" className="absolute right-3 top-3 size-4 text-muted-foreground" /></div></div>
                    <div className="md:col-span-2"><Button type="submit"><Search aria-hidden="true" />{t("search")}</Button></div>
                  </form>
                  {searchSubmitted && searchValue && <p className="text-sm text-muted-foreground">{t("noRouteResults")}</p>}
                  <EmptyNotice icon={RouteIcon}>{getEmptyStateMessage("routes")}</EmptyNotice>
                </section>
              )}

              {view === "tracking" && (
                <section className="space-y-5 gentle-enter">
                  <div className="flex flex-wrap items-center justify-between gap-3"><SectionHeading icon={MapPin} title={t("mapTitle")} /><span className="inline-flex items-center gap-2 text-sm text-muted-foreground"><span className="size-2 rounded-full bg-warning" />{t("gpsWaiting")}</span></div>
                  <div className="map-grid flex min-h-[420px] items-center justify-center rounded-md border border-border px-5 text-center sm:min-h-[540px]"><div className="max-w-md"><MapPin aria-hidden="true" className="mx-auto mb-4 size-7 text-primary" /><h2 className="font-display text-xl font-semibold">{t("gpsWaiting")}</h2><p className="mt-2 text-sm text-muted-foreground">{t("gpsMapNote")}</p></div></div>
                  <div className="grid gap-4 border-t border-border pt-5 sm:grid-cols-3"><div><p className="text-xs text-muted-foreground">{t("busDetails")}</p><p className="mt-1 text-sm">{t("noLiveData")}</p></div><div><p className="text-xs text-muted-foreground">{t("lastUpdated")}</p><p className="mt-1 text-sm">{t("dataUnavailable")}</p></div><div><p className="text-xs text-muted-foreground">{t("crowdStatus")}</p><p className="mt-1 text-sm">{t("noCrowd")}</p></div></div>
                </section>
              )}

              {view === "saved" && <section className="space-y-4 gentle-enter"><SectionHeading icon={RouteIcon} title={t("saved")} /><EmptyNotice icon={RouteIcon}>{t("savedRoutesEmpty")}</EmptyNotice><div className="border-t border-border pt-5"><SectionHeading icon={Clock3} title={t("recent")} /><EmptyNotice icon={Search}>{t("recentEmpty")}</EmptyNotice></div></section>}

              {view === "updates" && <section className="space-y-4 gentle-enter"><SectionHeading icon={Bell} title={t("notifications")} /><EmptyNotice icon={Bell}>{getEmptyStateMessage("notifications")}</EmptyNotice><div className="border-t border-border pt-5"><SectionHeading icon={UsersRound} title={t("crowdStatus")} /><EmptyNotice icon={UsersRound}>{getEmptyStateMessage("crowd")}</EmptyNotice><p className="text-xs text-muted-foreground">{t("reportCrowd")}</p></div></section>}

              {view === "student" && (
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(270px,0.7fr)] gentle-enter">
                  <section className="space-y-5">
                    <SectionHeading icon={FileCheck2} title={t("applyPass")} />
                    <form className="grid gap-4 border-y border-border py-5 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
                      <div className="space-y-2"><Label htmlFor="student-name">{t("fullName")}</Label><Input id="student-name" placeholder={t("fullNamePlaceholder")} /></div>
                      <div className="space-y-2"><Label htmlFor="student-email">{t("email")}</Label><Input id="student-email" type="email" placeholder={t("emailPlaceholder")} /></div>
                      <div className="space-y-2"><Label htmlFor="student-phone">{t("phone")}</Label><Input id="student-phone" type="tel" placeholder={t("phone")} /></div>
                      <div className="space-y-2"><Label htmlFor="student-institution">{t("institution")}</Label><Input id="student-institution" placeholder={t("institutionPlaceholder")} /></div>
                      <div className="space-y-2 sm:col-span-2"><Label htmlFor="student-id">{t("studentId")}</Label><Input id="student-id" placeholder={t("studentId")} /></div>
                      <div className="space-y-2 sm:col-span-2"><Label htmlFor="student-document">{t("uploadDocument")}</Label><Input id="student-document" type="file" accept="image/*,.pdf" onChange={(event) => setSelectedFile(event.currentTarget.files?.[0]?.name ?? "")} />{selectedFile && <p className="text-xs text-muted-foreground">{selectedFile}</p>}</div>
                      <Button type="button" disabled className="sm:col-span-2"><FileText aria-hidden="true" />{t("applyPass")}</Button>
                    </form>
                    <p className="text-sm text-muted-foreground">{t("authNote")}</p>
                  </section>
                  <aside className="space-y-6">
                    <section className="space-y-3"><SectionHeading icon={ShieldCheck} title={t("passStatus")} /><EmptyNotice icon={FileCheck2}>{t("noVerifiedPass")}</EmptyNotice></section>
                    <section className="space-y-3 border-t border-border pt-5"><SectionHeading icon={ArrowDownUp} title={t("concession")} /><p className="text-sm text-muted-foreground">{t("verifiedEligibility")}</p><Button variant="outline" disabled className="w-full">{t("renew")}</Button></section>
                    <section className="space-y-3 border-t border-border pt-5"><SectionHeading icon={FileText} title={t("validity")} /><EmptyNotice icon={FileCheck2}>{t("qrUnavailable")}</EmptyNotice></section>
                  </aside>
                </div>
              )}

              {view === "driver" && (
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] gentle-enter">
                  <section className="space-y-5"><SectionHeading icon={Gauge} title={t("driverHeading")} /><div className="grid gap-5 border-y border-border py-5 sm:grid-cols-2"><div><p className="text-sm text-muted-foreground">{t("assignedBus")}</p><p className="mt-2 font-medium">{t("noRecords")}</p></div><div><p className="text-sm text-muted-foreground">{t("assignedRoute")}</p><p className="mt-2 font-medium">{t("noRoutes")}</p></div><div className="sm:col-span-2"><p className="text-sm text-muted-foreground">{t("connectionStatus")}</p><p className="mt-2 flex items-center gap-2 text-sm"><span className="size-2 rounded-full bg-warning" />{t("gpsWaiting")}</p></div><div className="sm:col-span-2"><p className="text-sm text-muted-foreground">{t("locationPermission")}</p><p className="mt-2 text-sm">{t("dataUnavailable")}</p></div></div><p className="text-sm text-muted-foreground">{t("noTrip")}</p><div className="flex flex-wrap gap-3"><Button disabled><Activity aria-hidden="true" />{t("startTrip")}</Button><Button variant="outline" disabled>{t("endTrip")}</Button></div></section>
                  <aside className="space-y-4"><SectionHeading icon={MapPin} title={t("gpsDevice")} /><form className="space-y-3 border-y border-border py-5" onSubmit={(event) => event.preventDefault()}><Label htmlFor="device-id">{t("deviceId")}</Label><Input id="device-id" placeholder={t("devicePlaceholder")} /><Button type="button" disabled className="w-full">{t("registerDevice")}</Button></form><p className="text-sm text-muted-foreground">{t("gpsDisclaimer")}</p><EmptyNotice icon={Activity}>{t("noDevice")}</EmptyNotice></aside>
                </div>
              )}

              {view === "admin" && (
                <section className="space-y-5 gentle-enter">
                  <SectionHeading icon={ShieldCheck} title={t("management")} />
                  <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                    {([
                      ["buses", Bus], ["routes", RouteIcon], ["stops", MapPin], ["drivers", UserRound], ["devices", Gauge], ["passes", FileCheck2], ["fares", ArrowDownUp], ["crowd", UsersRound], ["notifications", Bell], ["reports", FileText],
                    ] as const).map(([key, Icon]) => <div key={key} className="flex min-h-[74px] items-center justify-between gap-3 border-b border-border py-3"><span className="flex items-center gap-3 text-sm font-medium"><Icon aria-hidden="true" className="size-4 text-primary" />{t(key)}</span><span className="text-xs text-muted-foreground">{t("noRecords")}</span></div>)}
                  </div>
                  <div className="border-t border-border pt-4"><EmptyNotice icon={CircleHelp}>{t("adminDescription")}</EmptyNotice></div>
                </section>
              )}

              {view === "auth" && (
                <section className="mx-auto max-w-xl space-y-6 gentle-enter">
                  <div><SectionHeading icon={ShieldCheck} title={t("authTitle")} /><p className="mt-2 text-sm text-muted-foreground">{t("authDescription")}</p></div>
                  <div className="flex flex-wrap gap-2 border-b border-border pb-3" role="tablist" aria-label={t("signIn")}>
                    {(["login", "signup", "phone", "otp", "reset"] as const).map((mode) => <Button key={mode} variant={authMode === mode ? "secondary" : "ghost"} size="sm" role="tab" aria-selected={authMode === mode} onClick={() => setAuthMode(mode)}>{t(mode === "login" ? "login" : mode === "signup" ? "signup" : mode === "phone" ? "phoneLogin" : mode === "otp" ? "otp" : "forgotPassword")}</Button>)}
                  </div>
                  <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
                    {authMode !== "otp" && <div className="space-y-2"><Label htmlFor="auth-email">{authMode === "phone" ? t("phone") : t("email")}</Label><Input id="auth-email" type={authMode === "phone" ? "tel" : "email"} placeholder={authMode === "phone" ? t("phone") : t("emailPlaceholder")} /></div>}
                    {(authMode === "login" || authMode === "signup") && <div className="space-y-2"><Label htmlFor="auth-password">{t("password")}</Label><Input id="auth-password" type="password" placeholder={t("enterPassword")} /></div>}
                    {authMode === "otp" && <div className="space-y-2"><Label htmlFor="auth-otp">{t("enterOtp")}</Label><Input id="auth-otp" inputMode="numeric" autoComplete="one-time-code" placeholder={t("enterOtp")} /></div>}
                    <Button type="button" disabled className="w-full">{t(authMode === "login" ? "login" : authMode === "signup" ? "createAccount" : authMode === "reset" ? "resetPassword" : authMode === "otp" ? "continue" : "sendCode")}</Button>
                  </form>
                  <p className="border-t border-border pt-4 text-sm text-muted-foreground">{t("authNote")}</p>
                </section>
              )}

              {view === "profile" && <section className="max-w-xl space-y-5 gentle-enter"><SectionHeading icon={UserRound} title={t("profileHeading")} /><EmptyNotice icon={UserRound}>{t("noProfile")}</EmptyNotice><Button variant="outline" onClick={() => setView("auth")}>{t("signIn")}<ArrowRight aria-hidden="true" /></Button></section>}

              <footer className="mt-12 border-t border-border pt-5 text-xs text-muted-foreground"><span className="flex items-center gap-2"><ShieldCheck aria-hidden="true" className="size-3.5" />{t("connectNotice")}</span></footer>
            </div>
          </main>
        </div>

        <nav aria-label={t("chooseRole")} className="fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-background/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
          {navItems.slice(0, 4).map((item) => navButton(item, true))}
          <Button type="button" variant="ghost" onClick={() => setView("profile")} className={`h-14 min-w-0 flex-1 flex-col gap-1 px-1 text-[11px] ${view === "profile" ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"}`}><UserRound aria-hidden="true" className="size-[18px]" /><span className="truncate">{t("profile")}</span></Button>
        </nav>
      </div>
    </div>
  );
}