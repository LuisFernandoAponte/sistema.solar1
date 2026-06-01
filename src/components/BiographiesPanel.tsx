import { useState } from "react";
import { BIOS, type Bio } from "@/data/biographies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Search, Rocket, FlaskConical, Quote, Award, Globe, Star, Calendar, ChevronRight, Pencil, Check, X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const CUSTOM_IMAGES_KEY = "celestial-bio-custom-images";

function getCustomImages(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_IMAGES_KEY) || "{}");
  } catch { return {}; }
}

function setCustomImage(id: string, url: string) {
  const images = getCustomImages();
  if (url) {
    images[id] = url;
  } else {
    delete images[id];
  }
  localStorage.setItem(CUSTOM_IMAGES_KEY, JSON.stringify(images));
}

const typeConfig = {
  astronaut: { icon: Rocket, label: "Astronauta", gradient: "from-blue-500/20 to-cyan-500/5", border: "border-blue-500/20", glow: "shadow-blue-500/10" },
  scientist: { icon: FlaskConical, label: "Científico", gradient: "from-purple-500/20 to-pink-500/5", border: "border-purple-500/20", glow: "shadow-purple-500/10" },
};

function BioCard({ bio, onClick, index }: { bio: Bio; onClick: () => void; index: number }) {
  const type = typeConfig[bio.type];
  const Icon = type.icon;
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [useCustom, setUseCustom] = useState(!!getCustomImages()[bio.id]);
  const customImages = getCustomImages();
  const currentSrc = useCustom && customImages[bio.id] ? customImages[bio.id] : bio.image;

  const handleImgError = () => {
    if (useCustom) {
      setUseCustom(false);
      setImgError(false);
    } else {
      setImgError(true);
    }
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative text-left w-full p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Hover glow background */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl",
          type.gradient,
        )}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          {/* Avatar with image or initials */}
          <div className="relative shrink-0">
            {currentSrc && !imgError ? (
              <div className={cn(
                "size-11 rounded-full overflow-hidden border-2 transition-all duration-300",
                hovered && "scale-110",
              )}
                style={{
                  borderColor: bio.color,
                  boxShadow: hovered ? `0 0 20px ${bio.color}66` : `0 0 0px ${bio.color}00`,
                }}
              >
                <img
                  key={currentSrc}
                  src={currentSrc}
                  alt={bio.name}
                  className="size-full object-cover"
                  onError={handleImgError}
                />
              </div>
            ) : (
              <div
                className={cn(
                  "size-11 rounded-full flex items-center justify-center text-sm font-bold font-display text-white transition-all duration-300",
                  hovered && "scale-110",
                )}
                style={{
                  background: `linear-gradient(135deg, ${bio.color}, ${bio.color}88)`,
                  boxShadow: hovered ? `0 0 20px ${bio.color}66` : `0 0 0px ${bio.color}00`,
                }}
              >
                {bio.initials}
              </div>
            )}
            {/* Type badge */}
            <div className="absolute -bottom-1 -right-1 size-4 rounded-full bg-background border border-white/10 flex items-center justify-center">
              <Icon className="size-2.5" style={{ color: bio.color }} />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-foreground truncate group-hover:text-solar transition-colors">{bio.name}</div>
              {bio.type === "astronaut" && (
                <Rocket className="size-3 text-blue-400 shrink-0 opacity-60" />
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono-data mt-0.5">
              <Globe className="size-2.5" />
              <span>{bio.nationality}</span>
              <span>·</span>
              <Calendar className="size-2.5" />
              <span>{bio.birth}–{bio.death ?? "presente"}</span>
            </div>
          </div>

          <ChevronRight className={cn(
            "size-4 text-muted-foreground/30 transition-all duration-300",
            hovered && "translate-x-0.5 text-solar/50",
          )} />
        </div>

        {/* Bio preview */}
        <p className="text-[11px] text-muted-foreground/70 leading-relaxed line-clamp-2">{bio.bio}</p>

        {/* Achievement count */}
        <div className="flex items-center gap-1 mt-1.5">
          <Award className="size-2.5 text-solar/50" />
          <span className="text-[9px] text-muted-foreground/50 font-mono-data">{bio.achievements.length} logros</span>
        </div>
      </div>
    </button>
  );
}

function BioDialog({ bio, open, onClose }: { bio: Bio; open: boolean; onClose: () => void }) {
  const [activeAchievement, setActiveAchievement] = useState<number | null>(null);
  const [imgError, setImgError] = useState(false);
  const [editingImg, setEditingImg] = useState(false);
  const [imgUrlInput, setImgUrlInput] = useState("");
  const [useCustom, setUseCustom] = useState(() => !!getCustomImages()[bio?.id]);
  const customImages = getCustomImages();
  const dialogSrc = bio && useCustom && customImages[bio.id] ? customImages[bio.id] : bio?.image;

  const handleDialogImgError = () => {
    if (useCustom) {
      setUseCustom(false);
      setImgError(false);
    } else {
      setImgError(true);
    }
  };

  if (!bio) return null;

  const type = typeConfig[bio.type];
  const Icon = type.icon;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="modal-bg max-w-lg p-0 overflow-hidden">
        {/* Hero header */}
        <div className="relative p-6 pb-16 overflow-hidden" style={{ background: `linear-gradient(135deg, ${bio.color}22, transparent 60%)` }}>
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 size-40 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${bio.color}, transparent)` }} />
          <div className="absolute -bottom-10 -left-10 size-32 rounded-full opacity-5" style={{ background: `radial-gradient(circle, ${bio.color}, transparent)` }} />

          <div className="flex items-center gap-4 relative z-10">
            <div className="relative group/avatar">
              {dialogSrc && !imgError ? (
                <div className="size-20 rounded-full overflow-hidden border-[3px] shadow-lg shrink-0" style={{ borderColor: bio.color, boxShadow: `0 0 25px ${bio.color}44` }}>
                  <img
                    key={dialogSrc}
                    src={dialogSrc}
                    alt={bio.name}
                    className="size-full object-cover"
                    onError={handleDialogImgError}
                  />
                </div>
              ) : (
                <div
                  className="size-20 rounded-full flex items-center justify-center text-2xl font-bold font-display text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${bio.color}, ${bio.color}88)` }}
                >
                  {bio.initials}
                </div>
              )}
              <button
                onClick={() => { setImgUrlInput(dialogSrc || ""); setEditingImg(true); }}
                className="absolute -top-1 -right-1 size-6 rounded-full bg-background/90 border border-white/20 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity hover:scale-110"
              >
                <Pencil className="size-3 text-muted-foreground" />
              </button>
              <div className="absolute -bottom-1 -right-1 size-5 rounded-full bg-background/80 border border-white/10 flex items-center justify-center">
                <Icon className="size-3" style={{ color: bio.color }} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl font-bold text-foreground">{bio.name}</DialogTitle>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono-data mt-0.5">
                <Globe className="size-3" />
                <span>{bio.nationality}</span>
                <span>·</span>
                <Calendar className="size-3" />
                <span>{bio.birth}–{bio.death ?? "presente"}</span>
              </div>
              <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${bio.color}22`, color: bio.color }}>
                <Icon className="size-2.5" />
                <span>{type.label}</span>
              </div>
            </div>
          </div>

          {/* Image URL editor */}
          {editingImg && (
            <div className="relative z-10 mt-3 flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 bg-background/80 rounded-lg border border-white/10 px-3 py-2">
                <ImageIcon className="size-3.5 text-muted-foreground/50 shrink-0" />
                <input
                  autoFocus
                  value={imgUrlInput}
                  onChange={(e) => setImgUrlInput(e.target.value)}
                  placeholder="Pega la URL de la imagen..."
                  className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/30 outline-none border-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setCustomImage(bio.id, imgUrlInput);
                      setEditingImg(false);
                      setImgError(false);
                      setUseCustom(true);
                    }
                  }}
                />
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="size-8 rounded-full hover:bg-green-500/20 hover:text-green-400"
                onClick={() => {
                  setCustomImage(bio.id, imgUrlInput);
                  setEditingImg(false);
                  setImgError(false);
                  setUseCustom(true);
                }}
              >
                <Check className="size-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="size-8 rounded-full hover:bg-red-500/20 hover:text-red-400"
                onClick={() => setEditingImg(false)}
              >
                <X className="size-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Quote if exists */}
          {bio.quote && (
            <div className="relative pl-4 border-l-2 py-1" style={{ borderColor: bio.color }}>
              <Quote className="size-3 absolute -left-[7px] -top-1" style={{ color: bio.color }} />
              <p className="text-sm italic text-foreground/80 leading-relaxed">"{bio.quote}"</p>
            </div>
          )}

          {/* Bio */}
          <DialogDescription className="text-sm text-foreground/70 leading-relaxed">{bio.bio}</DialogDescription>

          {/* Achievements */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
              <Award className="size-3 text-solar" />
              Logros destacados
            </h4>
            <div className="space-y-2">
              {bio.achievements.map((a, i) => (
                <div
                  key={a}
                  className={cn(
                    "flex items-start gap-3 p-2.5 rounded-lg transition-all duration-300 cursor-default",
                    activeAchievement === i
                      ? "bg-white/[0.06] border border-white/10"
                      : "hover:bg-white/[0.03]",
                  )}
                  onMouseEnter={() => setActiveAchievement(i)}
                  onMouseLeave={() => setActiveAchievement(null)}
                >
                  <div
                    className={cn(
                      "size-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold font-mono-data transition-all duration-300",
                      activeAchievement === i ? "scale-110" : "",
                    )}
                    style={{ background: `${bio.color}22`, color: bio.color }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-foreground/80 leading-relaxed">{a}</div>
                    {activeAchievement === i && (
                      <div className="mt-1 h-0.5 rounded-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${bio.color}, transparent)` }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function BiographiesPanel() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "astronaut" | "scientist">("all");
  const [active, setActive] = useState<Bio | null>(null);
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);

  const filtered = BIOS.filter((b) => {
    if (filter !== "all" && b.type !== filter) return false;
    if (!q) return true;
    const ql = q.toLowerCase();
    return b.name.toLowerCase().includes(ql) || b.nationality.toLowerCase().includes(ql);
  });

  const filterBtns = [
    { id: "all" as const, label: "Todos", icon: Star },
    { id: "astronaut" as const, label: "Astronautas", icon: Rocket },
    { id: "scientist" as const, label: "Científicos", icon: FlaskConical },
  ];

  return (
    <div className="panel-glass rounded-xl p-4 sm:p-5 w-full max-w-full md:max-w-[30rem] max-h-[calc(100vh-160px)] overflow-y-auto overflow-x-hidden scrollbar-invisible animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/5 border border-blue-500/20 flex items-center justify-center">
            <Rocket className="size-4 text-blue-400" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm text-foreground">Exploradores del Cosmos</h3>
            <p className="text-[10px] text-muted-foreground font-mono-data">{BIOS.length} pioneros · {BIOS.filter(b => b.type === "astronaut").length} astronautas · {BIOS.filter(b => b.type === "scientist").length} científicos</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/50" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre o nacionalidad..."
          className="h-9 pl-9 text-xs bg-white/[0.03] border-white/5 focus-visible:ring-solar/30 placeholder:text-muted-foreground/30 rounded-xl"
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 mb-4 p-1 rounded-xl bg-white/[0.03] border border-white/5">
        {filterBtns.map((f) => {
          const FIcon = f.icon;
          const isActive = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              onMouseEnter={() => setHoveredFilter(f.id)}
              onMouseLeave={() => setHoveredFilter(null)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 text-[10px] py-1.5 rounded-lg font-medium transition-all duration-300",
                isActive
                  ? "bg-solar/15 text-solar shadow-[0_0_12px_rgba(253,184,19,0.08)]"
                  : "text-muted-foreground/60 hover:text-muted-foreground hover:bg-white/[0.03]",
              )}
            >
              <FIcon className={cn("size-3", isActive && "animate-pulse-soft")} />
              {f.label}
              {isActive && (
                <span className="size-1 rounded-full bg-solar animate-pulse-soft" />
              )}
            </button>
          );
        })}
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <Search className="size-8 mx-auto text-muted-foreground/20 mb-2" />
          <p className="text-xs text-muted-foreground/50">No se encontraron resultados</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filtered.map((bio, i) => (
            <BioCard key={bio.id} bio={bio} index={i} onClick={() => setActive(bio)} />
          ))}
        </div>
      )}

      {/* Dialog */}
      <BioDialog bio={active!} open={!!active} onClose={() => setActive(null)} />
    </div>
  );
}
