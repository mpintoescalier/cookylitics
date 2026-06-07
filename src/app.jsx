import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertCircle,
  BarChart3,
  Bell,
  BookOpen,
  Calculator,
  CheckCircle2,
  ChefHat,
  DollarSign,
  Download,
  Edit3,
  History,
  LayoutDashboard,
  Mail,
  MapPin,
  Package,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShoppingCart,
  Sparkles,
  Store,
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
  X,
} from "lucide-react";

const screens = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "calculator", label: "Calculadora", icon: Calculator },
  { id: "stock", label: "Stock", icon: Package },
  { id: "recipes", label: "Recetas", icon: BookOpen },
  { id: "sales", label: "Ventas", icon: DollarSign },
  { id: "metrics", label: "Métricas", icon: BarChart3 },
  { id: "history", label: "Historial", icon: History },
  { id: "settings", label: "Configuración", icon: Settings },
];

const monthlyData = [
  { month: "Ene", ingresos: 44500, costos: 27200, pedidos: 3920, desperdicio: 5.8, margen: 38.9 },
  { month: "Feb", ingresos: 51200, costos: 29900, pedidos: 4210, desperdicio: 5.2, margen: 41.6 },
  { month: "Mar", ingresos: 48600, costos: 28600, pedidos: 4070, desperdicio: 4.9, margen: 41.1 },
  { month: "Abr", ingresos: 60200, costos: 33100, pedidos: 4880, desperdicio: 4.2, margen: 45.0 },
  { month: "May", ingresos: 54100, costos: 31500, pedidos: 4520, desperdicio: 4.0, margen: 41.8 },
  { month: "Jun", ingresos: 67420, costos: 36600, pedidos: 5340, desperdicio: 3.8, margen: 45.7 },
];

const demandTrend = [
  { day: "Lun", real: 120, prediccion: 118 },
  { day: "Mar", real: 102, prediccion: 104 },
  { day: "Mié", real: 155, prediccion: 152 },
  { day: "Jue", real: 144, prediccion: 147 },
  { day: "Vie", real: 188, prediccion: 186 },
  { day: "Sáb", real: 228, prediccion: 226 },
  { day: "Dom", real: 214, prediccion: 218 },
];

const wasteDistribution = [
  { name: "Optimizado", value: 68, color: "#22c55e" },
  { name: "Alerta", value: 21, color: "#f59e0b" },
  { name: "Crítico", value: 11, color: "#ef4444" },
];

const initialStockItems = [
  { id: 1, name: "Mozzarella", category: "Lácteos", current: 42, max: 50, status: "Óptimo", tone: "green", unit: "kg", incoming: 0 },
  { id: 2, name: "Albahaca Fresca", category: "Hierbas", current: 8, max: 15, status: "Stock crítico", tone: "red", unit: "kg", incoming: 0 },
  { id: 3, name: "Champiñones", category: "Verduras", current: 23, max: 30, status: "Stock bajo", tone: "yellow", unit: "kg", incoming: 0 },
  { id: 4, name: "Pepperoni", category: "Carnes", current: 67, max: 60, status: "Exceso", tone: "blue", unit: "kg", incoming: 0 },
  { id: 5, name: "Parmesano", category: "Lácteos", current: 41, max: 45, status: "Óptimo", tone: "green", unit: "kg", incoming: 0 },
  { id: 6, name: "Salsa de Tomate", category: "Salsas", current: 78, max: 80, status: "Óptimo", tone: "green", unit: "L", incoming: 0 },
  { id: 7, name: "Pan Brioche", category: "Panadería", current: 260, max: 320, status: "Stock bajo", tone: "yellow", unit: "u", incoming: 0 },
  { id: 8, name: "Carne Blend", category: "Carnes", current: 54, max: 70, status: "Stock bajo", tone: "yellow", unit: "kg", incoming: 0 },
];

const initialRecipes = [
  {
    id: 1,
    name: "Pizza Margherita",
    emoji: "🍕",
    category: "Pizzas",
    time: "15 min",
    portions: 1,
    cost: 8.5,
    price: 24,
    margin: 65,
    popularity: 98,
    baseDemand: 210,
    ingredients: [
      { name: "Mozzarella", qty: 0.18, unit: "kg" },
      { name: "Salsa de Tomate", qty: 0.12, unit: "L" },
      { name: "Albahaca Fresca", qty: 0.01, unit: "kg" },
      { name: "Parmesano", qty: 0.025, unit: "kg" },
    ],
    instructions: "Hornear masa, agregar salsa, mozzarella y finalizar con albahaca fresca.",
  },
  {
    id: 2,
    name: "Burger Clásica",
    emoji: "🍔",
    category: "Burgers",
    time: "12 min",
    portions: 1,
    cost: 6.2,
    price: 18,
    margin: 66,
    popularity: 92,
    baseDemand: 165,
    ingredients: [
      { name: "Pan Brioche", qty: 1, unit: "u" },
      { name: "Carne Blend", qty: 0.18, unit: "kg" },
      { name: "Mozzarella", qty: 0.045, unit: "kg" },
    ],
    instructions: "Sellar medallón, fundir queso y montar con salsa de la casa.",
  },
  {
    id: 3,
    name: "Empanadas Carne",
    emoji: "🥟",
    category: "Horno",
    time: "25 min",
    portions: 12,
    cost: 11.4,
    price: 34,
    margin: 63,
    popularity: 88,
    baseDemand: 96,
    ingredients: [
      { name: "Carne Blend", qty: 0.85, unit: "kg" },
      { name: "Salsa de Tomate", qty: 0.08, unit: "L" },
    ],
    instructions: "Preparar relleno, armar unidades y hornear hasta dorar.",
  },
  {
    id: 4,
    name: "Risotto de Champiñones",
    emoji: "🍚",
    category: "Risottos",
    time: "18 min",
    portions: 1,
    cost: 7.8,
    price: 22,
    margin: 65,
    popularity: 85,
    baseDemand: 72,
    ingredients: [
      { name: "Champiñones", qty: 0.16, unit: "kg" },
      { name: "Parmesano", qty: 0.045, unit: "kg" },
    ],
    instructions: "Nacarar arroz, agregar caldo por tandas y terminar con parmesano.",
  },
  {
    id: 5,
    name: "Ensalada Caprese",
    emoji: "🥗",
    category: "Ensaladas",
    time: "10 min",
    portions: 1,
    cost: 4.5,
    price: 14,
    margin: 68,
    popularity: 79,
    baseDemand: 64,
    ingredients: [
      { name: "Mozzarella", qty: 0.12, unit: "kg" },
      { name: "Albahaca Fresca", qty: 0.012, unit: "kg" },
    ],
    instructions: "Cortar, montar en capas y condimentar al final.",
  },
  {
    id: 6,
    name: "Pizza Pepperoni",
    emoji: "🍕",
    category: "Pizzas",
    time: "16 min",
    portions: 1,
    cost: 9.4,
    price: 27,
    margin: 65,
    popularity: 94,
    baseDemand: 185,
    ingredients: [
      { name: "Mozzarella", qty: 0.16, unit: "kg" },
      { name: "Salsa de Tomate", qty: 0.11, unit: "L" },
      { name: "Pepperoni", qty: 0.075, unit: "kg" },
    ],
    instructions: "Pizza de alta rotación para viernes y sábado.",
  },
];

const initialEvents = [
  { id: 1, name: "Partido importante", description: "Aumenta pedidos de pizza, burger y bebidas", relevance: 82, impact: 24, active: true },
  { id: 2, name: "Lluvia fuerte", description: "Baja la circulación y reduce la demanda total", relevance: 78, impact: -14, active: false },
  { id: 3, name: "Festival cercano", description: "Aumenta demanda de comida rápida", relevance: 91, impact: 32, active: false },
  { id: 4, name: "Frío intenso", description: "Sube pedidos calientes y delivery nocturno", relevance: 70, impact: 10, active: false },
  { id: 5, name: "Calor extremo", description: "Baja platos pesados y reduce demanda de horno", relevance: 66, impact: -9, active: false },
  { id: 6, name: "Feriado", description: "Demanda irregular: baja almuerzo y sube cena familiar", relevance: 74, impact: 8, active: false },
  { id: 7, name: "Corte de calle", description: "Reduce tránsito peatonal y salón", relevance: 86, impact: -18, active: false },
  { id: 8, name: "Evento corporativo", description: "Aumenta pedidos grandes y anticipados", relevance: 88, impact: 22, active: false },
  { id: 9, name: "Fin de mes", description: "Baja consumo promedio y tickets grandes", relevance: 61, impact: -7, active: false },
];

const initialHistoryRows = [
  { date: "17 May", action: "Predicción semanal generada", result: "1,340 unidades", confidence: "94.2%", impact: "+7.6% demanda" },
  { date: "16 May", action: "Pedido de mozzarella creado", result: "+18 kg en camino", confidence: "91.8%", impact: "Quiebre evitado" },
  { date: "15 May", action: "Exceso de pepperoni detectado", result: "-85 unidades", confidence: "89.4%", impact: "-3.4% desperdicio" },
  { date: "14 May", action: "Promoción sugerida viernes", result: "Combo Pizza", confidence: "92.1%", impact: "+$42,560" },
  { date: "13 May", action: "Receta optimizada", result: "Caprese", confidence: "88.9%", impact: "+4 pp margen" },
];

const initialSalesRows = [
  { id: 1, period: "Últimos 7 días", recipeId: 1, dish: "Pizza Margherita", units: 210, revenue: 5040 },
  { id: 2, period: "Últimos 7 días", recipeId: 6, dish: "Pizza Pepperoni", units: 185, revenue: 4995 },
  { id: 3, period: "Últimos 7 días", recipeId: 2, dish: "Burger Clásica", units: 165, revenue: 2970 },
];

const toneMap = {
  green: { border: "border-emerald-400/25", bg: "bg-emerald-400/[0.055]", icon: "text-emerald-300 bg-emerald-400/10 border-emerald-400/25", bar: "bg-gradient-to-r from-emerald-500 to-lime-300", text: "text-emerald-300", pill: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20" },
  red: { border: "border-rose-400/30", bg: "bg-rose-400/[0.055]", icon: "text-rose-300 bg-rose-400/10 border-rose-400/25", bar: "bg-gradient-to-r from-rose-500 to-orange-300", text: "text-rose-300", pill: "bg-rose-400/10 text-rose-300 border-rose-400/20" },
  yellow: { border: "border-amber-400/30", bg: "bg-amber-400/[0.055]", icon: "text-amber-300 bg-amber-400/10 border-amber-400/25", bar: "bg-gradient-to-r from-amber-500 to-yellow-300", text: "text-amber-300", pill: "bg-amber-400/10 text-amber-300 border-amber-400/20" },
  blue: { border: "border-sky-400/30", bg: "bg-sky-400/[0.055]", icon: "text-sky-300 bg-sky-400/10 border-sky-400/25", bar: "bg-gradient-to-r from-sky-500 to-cyan-300", text: "text-sky-300", pill: "bg-sky-400/10 text-sky-300 border-sky-400/20" },
};

function updateStockStatus(item) {
  const effective = item.current + (item.incoming || 0);
  const ratio = effective / item.max;
  if ((item.incoming || 0) > 0 && ratio >= 0.8) return { ...item, status: "En camino", tone: "blue" };
  if (ratio < 0.62) return { ...item, status: "Stock crítico", tone: "red" };
  if (ratio < 0.82) return { ...item, status: "Stock bajo", tone: "yellow" };
  if (ratio > 1.08) return { ...item, status: "Exceso", tone: "blue" };
  return { ...item, status: "Óptimo", tone: "green" };
}

function formatMoney(n) {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

function formatQty(n) {
  const value = Number(n || 0);
  return Number.isInteger(value) ? value.toLocaleString("en-US") : value.toFixed(1);
}

function Card({ children, className = "" }) {
  return <div className={`rounded-[22px] border border-white/[0.075] bg-[#17181f]/95 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur ${className}`}>{children}</div>;
}

function Modal({ title, children, onClose, footer }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-[28px] border border-white/10 bg-[#15161d] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.07] bg-[#15161d] p-6">
          <h3 className="text-2xl font-black text-white">{title}</h3>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.05] text-slate-400 hover:bg-white/[0.1] hover:text-white"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="sticky bottom-0 border-t border-white/[0.07] bg-[#15161d] p-5">{footer}</div>}
      </div>
    </div>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/15 px-5 py-4 text-emerald-100 shadow-2xl backdrop-blur"><CheckCircle2 className="h-5 w-5" /><span className="font-bold">{message}</span></div>;
}

function Sidebar({ currentScreen, setCurrentScreen }) {
  return (
    <aside className="fixed left-0 top-0 z-20 hidden h-screen w-[280px] flex-col border-r border-white/[0.07] bg-[#0f1016]/95 lg:flex">
      <div className="flex h-[88px] items-center gap-3 border-b border-white/[0.07] px-7">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c4dff] via-[#9c6bff] to-[#18d4ef] shadow-lg shadow-violet-500/25"><BarChart3 className="h-5 w-5 text-white" /></div>
        <div><h1 className="text-xl font-black tracking-wide text-white">Cookylitics</h1><p className="text-[11px] font-bold uppercase tracking-[0.26em] text-slate-600">AI Kitchen OS</p></div>
      </div>
      <nav className="flex-1 space-y-2 p-4 pt-5">
        {screens.map(({ id, label, icon: Icon }) => {
          const isActive = currentScreen === id;
          return <button key={id} onClick={() => setCurrentScreen(id)} className={`group flex h-12 w-full items-center gap-3 rounded-2xl px-4 text-left text-[15px] font-bold transition ${isActive ? "bg-gradient-to-r from-[#7c4dff]/20 to-[#18d4ef]/8 text-white" : "text-slate-400 hover:bg-white/[0.045] hover:text-white"}`}><Icon className={`h-5 w-5 ${isActive ? "text-[#9c78ff]" : "text-slate-500 group-hover:text-[#9c78ff]"}`} />{label}</button>;
        })}
      </nav>
      <div className="p-5"><div className="rounded-[24px] border border-white/[0.07] bg-white/[0.035] p-5"><div className="mb-3 flex items-center gap-2 text-sm font-bold text-emerald-300"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,.8)]" />Modelo activo</div><p className="text-3xl font-black text-white">94.2%</p><p className="mt-1 text-sm text-slate-500">confianza semanal</p></div></div>
    </aside>
  );
}

function Topbar({ searchTerm, setSearchTerm, setCurrentScreen, notifications, onNotificationClick }) {
  return (
    <header className="sticky top-0 z-10 flex h-[88px] items-center justify-between border-b border-white/[0.07] bg-[#0b0c11]/88 px-5 backdrop-blur-xl lg:pl-[316px] lg:pr-8">
      <div className="relative w-full max-w-[660px]"><Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" /><input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onFocus={() => searchTerm && setCurrentScreen("recipes")} className="h-12 w-full rounded-2xl border border-white/[0.07] bg-[#17181f]/90 pl-12 pr-4 text-sm font-semibold text-white outline-none placeholder:text-slate-600 focus:border-[#8f63ff]/60 focus:ring-4 focus:ring-[#7c4dff]/10" placeholder="Buscar receta, stock, alerta..." /></div>
      <button onClick={onNotificationClick} className="relative ml-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.07] bg-[#17181f] text-slate-400 transition hover:border-[#8f63ff]/30 hover:text-white"><Bell className="h-5 w-5" />{notifications > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[11px] font-black text-white">{notifications}</span>}</button>
    </header>
  );
}

function SectionTitle({ title, subtitle, action }) {
  return <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#7c4dff]/20 bg-[#7c4dff]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#b49aff]"><Sparkles className="h-3.5 w-3.5" /> Smart Forecasting</div><h2 className="text-[38px] font-black tracking-tight text-white md:text-[46px]">{title}</h2><p className="mt-2 text-lg font-medium text-slate-400">{subtitle}</p></div>{action}</div>;
}

function KpiCard({ icon: Icon, label, value, change, accent = "purple" }) {
  const accentClasses = { purple: "from-[#7c4dff]/25 to-[#7c4dff]/5 text-[#a98cff] border-[#7c4dff]/25", cyan: "from-cyan-400/20 to-cyan-400/5 text-cyan-300 border-cyan-400/25", green: "from-emerald-400/20 to-emerald-400/5 text-emerald-300 border-emerald-400/25", rose: "from-rose-400/20 to-rose-400/5 text-rose-300 border-rose-400/25" };
  return <Card className="group relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-white/15"><div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#7c4dff]/10 blur-2xl transition group-hover:bg-[#18d4ef]/10" /><div className="mb-5 flex items-start justify-between"><div className={`flex h-[54px] w-[54px] items-center justify-center rounded-2xl border bg-gradient-to-br ${accentClasses[accent]}`}><Icon className="h-6 w-6" /></div><span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm font-black text-emerald-300">{change}</span></div><p className="mb-2 text-[15px] font-bold text-slate-400">{label}</p><h3 className="text-[34px] font-black tracking-tight text-white">{value}</h3></Card>;
}

function Dashboard({ historyRows, onRefresh, onGenerateReport, addHistory, showToast }) {
  const [chartView, setChartView] = useState("money");
  const [serviceMode, setServiceMode] = useState("Cena");
  const [period, setPeriod] = useState("mes");
  const periodConfig = {
    semana: { label: "Semana", multiplier: 0.23, demand: 1240, change: "+8.1%" },
    mes: { label: "Mes", multiplier: 1, demand: 5340, change: "+15.2%" },
    anual: { label: "Anual", multiplier: 12, demand: 64080, change: "+18.7%" },
  };
  const selectedPeriod = periodConfig[period];
  const totalIncome = Math.round(monthlyData[monthlyData.length - 1].ingresos * selectedPeriod.multiplier);
  const totalCost = Math.round(monthlyData[monthlyData.length - 1].costos * selectedPeriod.multiplier);
  const pureProfit = totalIncome - totalCost;
  const modeImpact = { Almuerzo: 0.92, Cena: 1, Delivery: 1.18 };
  const liveDemand = Math.round(selectedPeriod.demand * modeImpact[serviceMode]);

  function runAction(label, impact) {
    addHistory({ action: label, result: serviceMode, confidence: "94.2%", impact });
    showToast(`${label} aplicado para ${serviceMode}`);
  }

  return (
    <>
      <SectionTitle title="Dashboard General" subtitle="Vista consolidada de operación, margen, demanda y desperdicio." action={<div className="flex gap-3"><button onClick={onRefresh} className="inline-flex h-12 items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.045] px-5 font-black text-white hover:bg-white/[0.08]"><RefreshCw className="h-4 w-4" /> Actualizar</button><button onClick={onGenerateReport} className="inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7c4dff] to-[#19cce8] px-5 font-black text-white shadow-lg shadow-cyan-500/15 hover:scale-[1.02]"><Sparkles className="h-4 w-4" /> Reporte IA</button></div>} />
      <Card className="mb-6 p-5">
        <div className="grid gap-5 xl:grid-cols-[1fr_auto] xl:items-center">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-[0.18em] text-slate-500">Configuración de vista</p>
            <div className="flex flex-wrap gap-3">
              <div className="flex rounded-2xl border border-white/[0.07] bg-white/[0.035] p-1">
                {Object.entries(periodConfig).map(([id, item]) => <button key={id} onClick={() => setPeriod(id)} className={`h-10 rounded-xl px-4 font-black ${period === id ? "bg-[#7c4dff] text-white" : "text-slate-400 hover:text-white"}`}>{item.label}</button>)}
              </div>
              <div className="flex rounded-2xl border border-white/[0.07] bg-white/[0.035] p-1">
                {["Almuerzo", "Cena", "Delivery"].map((mode) => (
                  <button key={mode} onClick={() => setServiceMode(mode)} className={`h-10 rounded-xl px-4 font-black ${serviceMode === mode ? "bg-[#18d4ef] text-white" : "text-slate-400 hover:text-white"}`}>
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <MetricMini label="Demanda live" value={liveDemand.toLocaleString("en-US")} />
            <MetricMini label="Margen actual" value={`${monthlyData[monthlyData.length - 1].margen}%`} />
            <MetricMini label="Ganancia pura" value={formatMoney(pureProfit)} />
          </div>
        </div>
      </Card>
      <div className="mb-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4"><KpiCard icon={DollarSign} label={`Ingresos ${selectedPeriod.label.toLowerCase()}`} value={formatMoney(totalIncome)} change="+22.4%" /><KpiCard icon={TrendingUp} label="Demanda Proyectada" value={selectedPeriod.demand.toLocaleString("en-US")} change={selectedPeriod.change} accent="cyan" /><KpiCard icon={DollarSign} label="Ganancia Pura" value={formatMoney(pureProfit)} change="+19.3%" accent="green" /><KpiCard icon={AlertCircle} label="Desperdicio Total" value="3.8%" change="-1.2%" accent="rose" /></div>
      <div className="grid gap-6 xl:grid-cols-[1.75fr_.85fr]"><Card className="p-7"><div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between"><div><h3 className="text-xl font-black text-white">{chartView === "money" ? "Ingresos vs Costos" : "Pedidos"}</h3><p className="mt-2 font-semibold text-slate-400">Tocá el gráfico para ver detalles en tooltip</p></div><div className="flex rounded-2xl border border-white/[0.07] bg-white/[0.035] p-1">{["money", "orders"].map((view) => <button key={view} onClick={() => setChartView(view)} className={`h-9 rounded-xl px-4 text-sm font-black ${chartView === view ? "bg-[#7c4dff] text-white" : "text-slate-400 hover:text-white"}`}>{view === "money" ? "Dinero" : "Pedidos"}</button>)}</div></div><div className="h-[340px]"><ResponsiveContainer width="100%" height="100%">{chartView === "money" ? <BarChart data={monthlyData} barGap={8}><CartesianGrid stroke="rgba(255,255,255,.05)" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#8b8e9b" tickLine={false} axisLine={false} /><YAxis stroke="#8b8e9b" tickLine={false} axisLine={false} /><Tooltip contentStyle={{ background: "#181920", border: "1px solid rgba(255,255,255,.09)", borderRadius: 14, color: "#fff" }} /><Bar dataKey="ingresos" fill="#8f63ff" radius={[10, 10, 0, 0]} /><Bar dataKey="costos" fill="#12a8c7" radius={[10, 10, 0, 0]} /></BarChart> : <LineChart data={monthlyData}><CartesianGrid stroke="rgba(255,255,255,.05)" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#8b8e9b" tickLine={false} axisLine={false} /><YAxis stroke="#8b8e9b" tickLine={false} axisLine={false} /><Tooltip contentStyle={{ background: "#181920", border: "1px solid rgba(255,255,255,.09)", borderRadius: 14, color: "#fff" }} /><Line type="monotone" dataKey="pedidos" stroke="#18d4ef" strokeWidth={3} dot={{ r: 5 }} /></LineChart>}</ResponsiveContainer></div></Card><Card className="p-7"><h3 className="text-xl font-black text-white">Acciones sugeridas</h3><p className="mt-2 font-semibold text-slate-400">Atajos que registran decisiones operativas</p><div className="mt-5 space-y-3">{[{ label: "Reforzar mozzarella", impact: "Quiebre evitado", iconClass: "text-emerald-300" }, { label: "Enviar reporte a compras", impact: "Equipo alineado", iconClass: "text-cyan-300" }].map((action) => <button key={action.label} onClick={() => runAction(action.label, action.impact)} className="flex w-full items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4 text-left transition hover:-translate-y-0.5 hover:border-[#7c4dff]/25 hover:bg-white/[0.06]"><span><strong className="block text-white">{action.label}</strong><span className="text-sm text-slate-500">{action.impact}</span></span><Sparkles className={`h-5 w-5 ${action.iconClass}`} /></button>)}</div></Card></div>
      <Card className="mt-6 overflow-hidden"><div className="border-b border-white/[0.07] p-6"><h3 className="text-xl font-black text-white">Últimas acciones inteligentes</h3></div><div className="grid gap-0 md:grid-cols-3">{historyRows.slice(0, 3).map((row) => <div key={row.action} className="border-b border-white/[0.06] p-5 md:border-b-0 md:border-r last:border-r-0"><p className="text-sm font-bold text-slate-500">{row.date}</p><h4 className="mt-2 font-black text-white">{row.action}</h4><p className="mt-2 text-sm text-slate-400">{row.result} · {row.impact}</p></div>)}</div></Card>
    </>
  );
}

function CalculatorPage({ recipes, stockItems, setStockItems, events, setEvents, addHistory, showToast, openEventModal }) {
  const [dateRange, setDateRange] = useState({ from: "2026-05-18", to: "2026-05-24" });
  const [selectedServices, setSelectedServices] = useState(["Almuerzo", "Cena"]);
  const [selectedDishIds, setSelectedDishIds] = useState(() => initialRecipes.map((recipe) => recipe.id));
  const [priorityDishIds, setPriorityDishIds] = useState([]);
  const [forecastResult, setForecastResult] = useState(null);
  const activeEvents = events.filter((event) => event.active);

  function getDaysBetween(from, to) {
    const start = new Date(`${from}T00:00:00`);
    const end = new Date(`${to}T00:00:00`);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 1;
    return Math.max(1, Math.round((end - start) / 86400000) + 1);
  }

  const days = getDaysBetween(dateRange.from, dateRange.to);
  const eventBoostPercent = activeEvents.reduce((acc, event) => acc + (Number(event.relevance || 0) * Number(event.impact || 0)) / 100, 0);
  const serviceImpact = { Almuerzo: 0.46, Cena: 0.54, Delivery: 0.68 };
  const serviceMultiplier = selectedServices.length ? Math.min(1.35, selectedServices.reduce((acc, service) => acc + serviceImpact[service], 0)) : 1;
  const demandMultiplier = (days / 7) * Math.max(0.35, 1 + eventBoostPercent / 100) * serviceMultiplier;

  const result = useMemo(() => {
    const dishes = recipes
      .filter((recipe) => selectedDishIds.includes(recipe.id))
      .map((recipe) => {
        const priorityBoost = priorityDishIds.includes(recipe.id) ? 1.25 : 1;
        const projected = Math.max(0, Math.round(Number(recipe.baseDemand || 0) * demandMultiplier * priorityBoost));
        const revenue = projected * Number(recipe.price || 0);
        const cost = projected * Number(recipe.cost || 0);
        return { ...recipe, projected, revenue, cost, profit: revenue - cost, priorityBoost };
      })
      .sort((a, b) => b.projected - a.projected)
      .map((dish, index) => ({ ...dish, rank: index + 1 }));

    const ingredientsObject = {};
    dishes.forEach((dish) => {
      dish.ingredients.forEach((ingredient) => {
        const needed = Number(ingredient.qty || 0) * dish.projected;
        const previous = ingredientsObject[ingredient.name] || { name: ingredient.name, unit: ingredient.unit, needed: 0 };
        ingredientsObject[ingredient.name] = { ...previous, needed: previous.needed + needed };
      });
    });

    const ingredients = Object.values(ingredientsObject).map((ingredient) => {
      const stock = stockItems.find((item) => item.name === ingredient.name);
      const current = Number(stock?.current || 0);
      const incoming = Number(stock?.incoming || 0);
      const missingNow = Math.max(0, ingredient.needed - current);
      const missingAfterIncoming = Math.max(0, ingredient.needed - current - incoming);
      return { ...ingredient, current, incoming, missingNow, missingAfterIncoming };
    });

    const totalProjectedPlates = dishes.reduce((acc, dish) => acc + dish.projected, 0);
    const totalRevenue = dishes.reduce((acc, dish) => acc + dish.revenue, 0);
    const totalCost = dishes.reduce((acc, dish) => acc + dish.cost, 0);
    const pureProfit = totalRevenue - totalCost;
    const grossMargin = totalRevenue > 0 ? Math.round((pureProfit / totalRevenue) * 100) : 0;
    const confidence = Math.min(98, Math.round(88 + activeEvents.length * 2 + Math.min(days, 30) / 10));
    return { dishes, ingredients, totalProjectedPlates, totalRevenue, totalCost, pureProfit, grossMargin, confidence };
  }, [recipes, stockItems, demandMultiplier, activeEvents.length, days, selectedDishIds, priorityDishIds]);

  function calculate() {
    setForecastResult(result);
    setStockItems((items) => items.map((item) => {
      const ingredient = result.ingredients.find((current) => current.name === item.name);
      return {
        ...item,
        forecastNeed: ingredient?.missingNow > 0 ? Math.ceil(Number(ingredient.missingNow || 0) * 10) / 10 : 0,
      };
    }));
    addHistory({
      action: "Forecast por fechas calculado",
      result: `${dateRange.from} a ${dateRange.to}`,
      confidence: `${result.confidence}%`,
      impact: `Ganancia ${formatMoney(result.pureProfit)}`,
    });
    showToast("Forecast calculado: revisá faltantes sugeridos");
  }

  function reset() {
    setDateRange({ from: "2026-05-18", to: "2026-05-24" });
    setSelectedServices(["Almuerzo", "Cena"]);
    setSelectedDishIds(recipes.map((recipe) => recipe.id));
    setPriorityDishIds([]);
    setForecastResult(null);
    setStockItems((items) => items.map((item) => ({ ...item, forecastNeed: 0 })));
    showToast("Calculadora restaurada");
  }

  function toggleService(service) {
    setSelectedServices((current) => {
      if (current.includes(service)) return current.filter((item) => item !== service);
      return [...current, service];
    });
  }

  function toggleDish(recipeId) {
    setSelectedDishIds((current) => current.includes(recipeId) ? current.filter((id) => id !== recipeId) : [...current, recipeId]);
  }

  function togglePriority(recipeId) {
    setPriorityDishIds((current) => current.includes(recipeId) ? current.filter((id) => id !== recipeId) : [...current, recipeId]);
  }

  function toggleEvent(eventId) {
    setEvents((items) => items.map((item) => item.id === eventId ? { ...item, active: !item.active } : item));
  }

  return (
    <>
      <SectionTitle
        title="Calculadora Inteligente"
        subtitle="Elegí un rango de fechas, activá eventos esperados y el sistema proyecta platos, ingredientes, venta, costo y ganancia."
      />

      <div className="grid gap-6">
        <Card className="p-7">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c4dff]/25 to-[#18d4ef]/10 text-[#9c78ff]">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">Forecast de producción</h3>
              <p className="font-semibold text-slate-400">Primero fechas, después eventos. El cálculo sale solo desde tu demanda histórica.</p>
            </div>
          </div>

          <div className="mb-5 grid gap-4 md:grid-cols-2">
            <TextInput label="Desde" type="date" value={dateRange.from} onChange={(value) => setDateRange((current) => ({ ...current, from: value }))} />
            <TextInput label="Hasta" type="date" value={dateRange.to} onChange={(value) => setDateRange((current) => ({ ...current, to: value }))} />
          </div>

          <div className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h4 className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">Servicio</h4>
              <span className="text-sm font-black text-cyan-300">{days} día(s)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Almuerzo", "Cena", "Delivery"].map((mode) => (
                <button key={mode} onClick={() => toggleService(mode)} className={`rounded-xl border px-4 py-2 text-sm font-black transition ${selectedServices.includes(mode) ? "border-[#18d4ef]/45 bg-[#18d4ef]/15 text-white" : "border-white/[0.08] bg-white/[0.035] text-slate-400 hover:bg-white/[0.07] hover:text-white"}`}>
                  {selectedServices.includes(mode) ? "✓ " : ""}{mode}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h4 className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">Eventos que afectan demanda</h4>
              <button onClick={() => openEventModal(null)} className="text-sm font-black text-cyan-300 hover:text-white">Nuevo evento</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {events.map((event) => (
                <button key={event.id} onClick={() => toggleEvent(event.id)} className={`rounded-full border px-4 py-2 text-sm font-black transition ${event.active ? "border-[#7c4dff]/45 bg-[#7c4dff]/20 text-white shadow-[0_0_22px_rgba(124,77,255,.18)]" : "border-white/[0.08] bg-white/[0.035] text-slate-400 hover:bg-white/[0.07] hover:text-white"}`}>
                  {event.active ? "✓ " : ""}{event.name}
                  <span className={`ml-2 text-xs ${event.impact < 0 ? "text-rose-300" : "text-cyan-300"}`}>{Math.round((event.relevance * event.impact) / 100) > 0 ? "+" : ""}{Math.round((event.relevance * event.impact) / 100)}%</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h4 className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">Platos a predecir</h4>
              <span className="text-sm font-black text-cyan-300">{selectedDishIds.length} seleccionado(s)</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {recipes.map((recipe) => {
                const selected = selectedDishIds.includes(recipe.id);
                const priority = priorityDishIds.includes(recipe.id);
                return (
                  <div key={recipe.id} className={`rounded-2xl border p-4 ${selected ? "border-[#7c4dff]/35 bg-[#7c4dff]/10" : "border-white/[0.07] bg-white/[0.025]"}`}>
                    <div className="mb-3 flex items-center gap-3">
                      <span className="text-2xl">{recipe.emoji}</span>
                      <div className="min-w-0">
                        <h4 className="truncate font-black text-white">{recipe.name}</h4>
                        <p className="text-xs font-bold text-slate-500">{priority ? "Prioridad alta" : "Prioridad normal"}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => toggleDish(recipe.id)} className={`h-10 rounded-xl font-black ${selected ? "bg-[#7c4dff] text-white" : "bg-white/[0.06] text-slate-400 hover:text-white"}`}>
                        {selected ? "Incluido" : "Incluir"}
                      </button>
                      <button onClick={() => togglePriority(recipe.id)} disabled={!selected} className={`h-10 rounded-xl font-black ${priority ? "bg-emerald-500 text-white" : "bg-white/[0.06] text-slate-400 hover:text-white disabled:opacity-40"}`}>
                        Prioridad
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={calculate} className="h-[54px] rounded-2xl bg-gradient-to-r from-[#7c4dff] to-[#18d4ef] font-black text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.01]">
              Calcular forecast
            </button>
            <button onClick={reset} className="h-[54px] rounded-2xl border border-white/[0.08] bg-white/[0.035] font-black text-white hover:bg-white/[0.075]">
              Limpiar
            </button>
          </div>
        </Card>

        {forecastResult && <Card className="p-7">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-white">Resultado</h3>
              <p className="text-sm text-slate-400">Proyección para {days} día(s), {selectedServices.length ? selectedServices.join(" + ") : "todos los servicios"} y {activeEvents.length} evento(s)</p>
            </div>
            <span className="rounded-full border border-[#7c4dff]/20 bg-[#7c4dff]/10 px-3 py-1 text-sm font-black text-[#b49aff]">
              Confianza {forecastResult.confidence}%
            </span>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-4">
            <MetricMini label="Venta" value={formatMoney(forecastResult.totalRevenue)} />
            <MetricMini label="Costo" value={formatMoney(forecastResult.totalCost)} />
            <MetricMini label="Ganancia pura" value={formatMoney(forecastResult.pureProfit)} />
            <MetricMini label="Platos" value={forecastResult.totalProjectedPlates.toLocaleString("en-US")} />
          </div>

          <h4 className="mb-3 text-lg font-black text-white">Ranking de platos que más salen</h4>
          <div className="max-h-[420px] space-y-3 overflow-auto pr-1">
            {forecastResult.dishes.map((dish) => (
              <div key={dish.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#7c4dff]/15 text-sm font-black text-[#b49aff]">#{dish.rank}</span>
                    <span className="text-3xl">{dish.emoji}</span>
                    <div>
                      <h4 className="font-black text-white">{dish.name}</h4>
                      <p className="text-sm text-slate-500">{dish.projected} unidades estimadas{dish.priorityBoost > 1 ? " · prioridad alta" : ""}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-300">{formatMoney(dish.profit)}</p>
                    <p className="text-xs text-slate-500">ganancia</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>}
      </div>

      {forecastResult && <Card className="p-7">
        <div className="mb-5">
          <h3 className="text-2xl font-black text-white">Ingredientes y condimentos necesarios</h3>
          <p className="text-slate-400">Se calcula desde el forecast guardado. Los faltantes aparecen como necesidad sugerida, sin crear pedidos automáticamente.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {forecastResult.ingredients.map((ingredient) => (
            <div
              key={ingredient.name}
              className={`rounded-2xl border p-5 ${ingredient.missingNow > 0 ? "border-rose-400/25 bg-rose-400/[0.055]" : "border-emerald-400/20 bg-emerald-400/[0.045]"}`}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h4 className="font-black text-white">{ingredient.name}</h4>
                <span className={`rounded-full px-2 py-1 text-xs font-black ${ingredient.missingNow > 0 ? "bg-rose-400/10 text-rose-300" : "bg-emerald-400/10 text-emerald-300"}`}>
                  {ingredient.missingNow > 0 ? "Falta" : "OK"}
                </span>
              </div>
              <p className="text-sm text-slate-400">Necesario</p>
              <p className="text-2xl font-black text-white">{formatQty(ingredient.needed)} {ingredient.unit}</p>
              <p className="mt-3 text-sm text-slate-500">Stock real: {formatQty(ingredient.current)} {ingredient.unit}</p>
              {ingredient.incoming > 0 && <p className="mt-1 text-sm text-sky-300">En camino: {formatQty(ingredient.incoming)} {ingredient.unit}</p>}
              {ingredient.missingNow > 0 && <p className="mt-2 text-sm font-black text-rose-300">Necesitás comprar: {formatQty(ingredient.missingNow)} {ingredient.unit}</p>}
              {ingredient.incoming > 0 && ingredient.missingAfterIncoming <= 0 && <p className="mt-2 text-sm font-black text-cyan-300">Con lo que llega queda cubierto</p>}
            </div>
          ))}
        </div>
      </Card>}
    </>
  );
}

function StockPage({ stockItems, setStockItems, addHistory, showToast, openStockModal }) {
  const [stockFilter, setStockFilter] = useState("Todos");
  const [stockSort, setStockSort] = useState("riesgo");
  const stockCategories = ["Todos", ...Array.from(new Set(stockItems.map((item) => item.category)))];
  const filteredStockItems = stockItems
    .filter((item) => {
      const current = Number(item.current || 0);
      const max = Math.max(Number(item.max || 1), 1);
      const availability = current / max;
      if (stockFilter === "Todos") return true;
      if (stockFilter === "Disponible") return availability >= 0.82 && availability <= 1.08 && Number(item.incoming || 0) === 0;
      if (stockFilter === "Bajo") return availability < 0.82 && availability >= 0.62;
      if (stockFilter === "Crítico") return availability < 0.62;
      if (stockFilter === "Exceso") return availability > 1.08;
      if (stockFilter === "En camino") return Number(item.incoming || 0) > 0;
      return item.category === stockFilter || item.status === stockFilter;
    })
    .sort((a, b) => {
      if (stockSort === "nombre") return a.name.localeCompare(b.name);
      if (stockSort === "cantidad") return Number(a.current) - Number(b.current);
      const risk = { red: 0, yellow: 1, blue: 2, green: 3 };
      return (risk[a.tone] ?? 4) - (risk[b.tone] ?? 4);
    });
  const lowStockCount = stockItems.filter((item) => ["red", "yellow"].includes(item.tone)).length;
  const incomingCount = stockItems.filter((item) => Number(item.incoming || 0) > 0).length;

  function orderItem(item) {
    const missing = Math.max(0, item.max - item.current - (item.incoming || 0));
    const orderQty = Math.ceil(missing || item.max * 0.2);

    setStockItems((items) => {
      return items.map((current) => {
        if (current.id !== item.id) return current;
        return updateStockStatus({
          ...current,
          incoming: Number(current.incoming || 0) + orderQty,
        });
      });
    });

    addHistory({
      action: `Pedido generado: ${item.name}`,
      result: `+${orderQty} ${item.unit} en camino`,
      confidence: "93.0%",
      impact: "Pendiente de recepción",
    });
    showToast(`Pedido en camino: +${orderQty} ${item.unit} de ${item.name}`);
  }

  function receiveItem(item) {
    setStockItems((items) => {
      return items.map((current) => {
        if (current.id !== item.id) return current;
        return updateStockStatus({
          ...current,
          current: Number(current.current || 0) + Number(current.incoming || 0),
          incoming: 0,
        });
      });
    });

    addHistory({
      action: `Pedido recibido: ${item.name}`,
      result: `${item.incoming} ${item.unit} incorporados`,
      confidence: "100%",
      impact: "Stock real actualizado",
    });
    showToast(`Pedido recibido: ${item.name}`);
  }

  return (
    <>
      <SectionTitle
        title="Control de Stock"
        subtitle="El stock real es sólido. Cuando tocás Pedir queda en camino; cuando llega, tocás Recibido y recién ahí consolida stock real."
        action={
          <button
            onClick={() => openStockModal(null)}
            className="inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7c4dff] to-[#18d4ef] px-5 font-black text-white"
          >
            <Plus className="h-4 w-4" /> Nuevo insumo
          </button>
        }
      />

      <Card className="mb-6 p-5">
        <div className="grid gap-4 xl:grid-cols-[1fr_auto] xl:items-center">
          <div className="flex flex-wrap gap-2">
            {["Todos", "Disponible", "Bajo", "Crítico", "Exceso", "En camino", ...stockCategories.filter((item) => item !== "Todos")].map((filter) => (
              <button key={filter} onClick={() => setStockFilter(filter)} className={`rounded-xl border px-3 py-2 text-sm font-black transition ${stockFilter === filter ? "border-[#7c4dff]/45 bg-[#7c4dff]/20 text-white" : "border-white/[0.08] bg-white/[0.035] text-slate-400 hover:bg-white/[0.07] hover:text-white"}`}>
                {filter}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <select value={stockSort} onChange={(event) => setStockSort(event.target.value)} className="h-11 rounded-xl border border-white/[0.07] bg-[#101118] px-3 font-bold text-white outline-none">
              <option value="riesgo">Ordenar por riesgo</option>
              <option value="cantidad">Menor cantidad</option>
              <option value="nombre">Nombre</option>
            </select>
            <MetricMini label="Alertas" value={lowStockCount} />
            <MetricMini label="En camino" value={incomingCount} />
          </div>
        </div>
      </Card>

      <div className="space-y-5">
        {filteredStockItems.map((item) => {
          const current = Number(item.current || 0);
          const incoming = Number(item.incoming || 0);
          const forecastNeed = Number(item.forecastNeed || 0);
          const max = Math.max(Number(item.max || 1), 1);
          const currentPercent = Math.min(100, Math.round((current / max) * 100));
          const incomingPercent = Math.min(100 - currentPercent, Math.round((incoming / max) * 100));
          const effectivePercent = Math.min(100, currentPercent + incomingPercent);
          const tone = toneMap[item.tone];

          return (
            <div key={item.id} className={`rounded-[22px] border ${tone.border} ${tone.bg} p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.035]`}>
              <div className="grid items-center gap-5 md:grid-cols-[1fr_auto]">
                <div className="flex items-center gap-5">
                  <div className={`flex h-[54px] w-[54px] items-center justify-center rounded-2xl border ${tone.icon}`}>
                    {incoming > 0 ? <Truck className="h-6 w-6" /> : <Package className="h-6 w-6" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-black text-white">{item.name}</h3>
                      <span className="rounded-lg bg-white/[0.05] px-3 py-1 text-sm font-semibold text-slate-500">{item.category}</span>
                      <span className={`rounded-lg border px-3 py-1 text-sm font-black ${tone.pill}`}>{item.status}</span>
                      {incoming > 0 && (
                        <span className="rounded-lg border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-sm font-black text-sky-300">
                          +{formatQty(incoming)} {item.unit} en camino
                        </span>
                      )}
                      {forecastNeed > 0 && (
                        <span className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-1 text-sm font-black text-rose-300">
                          Forecast: comprar {formatQty(forecastNeed)} {item.unit}
                        </span>
                      )}
                    </div>

                    <p className="mb-2 font-semibold text-slate-400">
                      Real: {formatQty(current)} {item.unit} / objetivo {formatQty(max)} {item.unit}
                      {incoming > 0 ? ` · con llegada: ${formatQty(current + incoming)} ${item.unit}` : ""}
                    </p>

                    <div className="relative h-3 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className={`absolute left-0 top-0 h-full ${tone.bar}`}
                        style={{ width: `${currentPercent}%` }}
                      />
                      {incoming > 0 && (
                        <div
                          className="absolute top-0 h-full border-l border-white/20 bg-sky-300/25 blur-[0.4px]"
                          style={{ left: `${currentPercent}%`, width: `${incomingPercent}%` }}
                        />
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap gap-3 text-xs font-bold">
                      <span className="text-slate-500">Stock real {currentPercent}%</span>
                      {incoming > 0 && <span className="text-sky-300">Difuminado en camino hasta {effectivePercent}%</span>}
                      {forecastNeed > 0 && <span className="text-rose-300">Necesidad forecast pendiente</span>}
                    </div>
                  </div>

                  <strong className={`hidden text-lg md:block ${tone.text}`}>{currentPercent}%</strong>
                </div>

                <div className="flex flex-wrap gap-3 md:justify-end">
                  <button
                    onClick={() => openStockModal(item)}
                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-white/[0.06] px-5 font-black text-white hover:bg-white/[0.1]"
                  >
                    <Edit3 className="h-4 w-4" /> Ajustar
                  </button>

                  <button
                    onClick={() => orderItem(item)}
                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#7c4dff] px-5 font-black text-white hover:bg-[#8b5cff]"
                  >
                    <ShoppingCart className="h-4 w-4" /> Pedir
                  </button>

                  {incoming > 0 && (
                    <button
                      onClick={() => receiveItem(item)}
                      className="inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-500 px-5 font-black text-white hover:bg-emerald-400"
                    >
                      <CheckCircle2 className="h-4 w-4" /> Recibido
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function RecipesPage({ recipes, setRecipes, searchTerm, setSearchTerm, addHistory, showToast, openRecipeModal }) {
  const [recipeCategory, setRecipeCategory] = useState("Todos");
  const [recipeSort, setRecipeSort] = useState("nombre");
  const recipeCategories = ["Todos", ...Array.from(new Set(recipes.map((recipe) => recipe.category)))];
  const filtered = recipes.filter((recipe) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch = !q || [recipe.name, recipe.category, recipe.ingredients.map((i) => i.name).join(" ")].join(" ").toLowerCase().includes(q);
    const matchesCategory = recipeCategory === "Todos" || recipe.category === recipeCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (recipeSort === "margen") return b.margin - a.margin;
    if (recipeSort === "precio") return b.price - a.price;
    return a.name.localeCompare(b.name);
  });
  return <><SectionTitle title="Recetas" subtitle="Administrá platos, costos, precios, margen e ingredientes." action={<div className="flex gap-3"><button onClick={() => openRecipeModal(null, "create")} className="inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7c4dff] to-[#18d4ef] px-5 font-black text-white"><Plus className="h-4 w-4" /> Nueva receta</button><button onClick={() => { setSearchTerm(""); setRecipeCategory("Todos"); showToast("Filtros limpiados"); }} className="h-12 rounded-2xl border border-white/[0.08] bg-white/[0.045] px-5 font-black text-white hover:bg-white/[0.08]">Ver todas</button></div>} />
    <Card className="mb-6 p-5"><div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center"><div className="flex flex-wrap gap-2">{recipeCategories.map((category) => <button key={category} onClick={() => setRecipeCategory(category)} className={`rounded-xl border px-3 py-2 text-sm font-black transition ${recipeCategory === category ? "border-[#7c4dff]/45 bg-[#7c4dff]/20 text-white" : "border-white/[0.08] bg-white/[0.035] text-slate-400 hover:bg-white/[0.07] hover:text-white"}`}>{category}</button>)}</div><select value={recipeSort} onChange={(event) => setRecipeSort(event.target.value)} className="h-11 rounded-xl border border-white/[0.07] bg-[#101118] px-3 font-bold text-white outline-none"><option value="nombre">Nombre</option><option value="margen">Mayor margen</option><option value="precio">Mayor precio</option></select></div></Card>
    {(searchTerm || recipeCategory !== "Todos") && <p className="mb-5 text-sm font-bold text-[#9c78ff]">Filtro activo · {filtered.length} resultado(s)</p>}
    <div className="grid gap-6 xl:grid-cols-3">{filtered.map((recipe) => <Card key={recipe.id} className="group overflow-hidden p-6 transition hover:-translate-y-1 hover:border-[#7c4dff]/25"><div className="mb-5 flex items-start justify-between"><div className="text-5xl drop-shadow-lg">{recipe.emoji}</div><span className="rounded-xl border border-[#7c4dff]/20 bg-[#7c4dff]/10 px-3 py-1 font-bold text-[#b49aff]">{recipe.category}</span></div><h3 className="mb-5 text-xl font-black text-white">{recipe.name}</h3><MetricLine label="Costo" value={`$${recipe.cost.toFixed(2)}`} /><MetricLine label="Precio Venta" value={`$${recipe.price.toFixed(2)}`} /><MetricLine label="Ganancia por plato" value={`$${(recipe.price - recipe.cost).toFixed(2)}`} /><div className="mb-5 rounded-2xl border border-[#7c4dff]/15 bg-[#7c4dff]/[0.07] p-4"><div className="flex justify-between"><span className="text-slate-400">Margen</span><strong className="text-[#b49aff]">{recipe.margin}%</strong></div></div><div className="grid grid-cols-2 gap-3"><button onClick={() => openRecipeModal(recipe, "details")} className="h-11 rounded-xl bg-white/[0.06] font-black text-white hover:bg-white/[0.1]">Ver</button><button onClick={() => openRecipeModal(recipe, "edit")} className="h-11 rounded-xl bg-[#7c4dff] font-black text-white hover:bg-[#8b5cff]">Editar</button></div></Card>)}</div></>;
}

function SalesPage({ recipes, salesRows, setSalesRows, addHistory, showToast }) {
  const [draft, setDraft] = useState({ recipeId: recipes[0]?.id || "", period: "Últimos 7 días", units: 0 });
  const selectedRecipe = recipes.find((recipe) => recipe.id === Number(draft.recipeId)) || recipes[0];
  const totalUnits = salesRows.reduce((acc, row) => acc + Number(row.units || 0), 0);
  const totalRevenue = salesRows.reduce((acc, row) => acc + Number(row.revenue || 0), 0);

  function saveSale() {
    if (!selectedRecipe) return;
    const units = Math.max(0, Number(draft.units || 0));
    const row = {
      id: Date.now(),
      period: draft.period,
      recipeId: selectedRecipe.id,
      dish: selectedRecipe.name,
      units,
      revenue: units * Number(selectedRecipe.price || 0),
    };
    setSalesRows((rows) => [row, ...rows].slice(0, 20));
    addHistory({ action: `Ventas cargadas: ${selectedRecipe.name}`, result: `${units} unidades`, confidence: "100%", impact: formatMoney(row.revenue) });
    showToast("Venta cargada");
    setDraft((current) => ({ ...current, units: 0 }));
  }

  return (
    <>
      <SectionTitle title="Ventas" subtitle="Cargá cuántas ventas tuviste, de qué plato y en qué período. Esto alimenta la lectura histórica del restaurante." action={<button onClick={saveSale} className="inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7c4dff] to-[#18d4ef] px-5 font-black text-white"><Plus className="h-4 w-4" /> Cargar venta</button>} />
      <div className="grid gap-6 xl:grid-cols-[.85fr_1.15fr]">
        <Card className="p-7">
          <div className="mb-6 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#7c4dff]/15 text-[#b49aff]"><Store className="h-6 w-6" /></div>
            <div>
              <h3 className="text-2xl font-black text-white">Carga histórica</h3>
              <p className="text-slate-400">Elegí plato, período y unidades vendidas.</p>
            </div>
          </div>
          <div className="grid gap-4">
            <label><span className="mb-2 block text-sm font-bold text-slate-400">Plato</span><select value={draft.recipeId} onChange={(event) => setDraft({ ...draft, recipeId: Number(event.target.value) })} className="h-12 w-full rounded-2xl border border-white/[0.07] bg-[#101118] px-4 font-bold text-white outline-none focus:border-[#8f63ff]/60">{recipes.map((recipe) => <option key={recipe.id} value={recipe.id}>{recipe.name}</option>)}</select></label>
            <TextInput label="Período" value={draft.period} onChange={(value) => setDraft({ ...draft, period: value })} />
            <TextInput label="Unidades vendidas" type="number" value={draft.units} onChange={(value) => setDraft({ ...draft, units: Number(value) })} />
          </div>
        </Card>
        <Card className="p-7">
          <div className="mb-5 grid grid-cols-2 gap-4">
            <MetricMini label="Unidades cargadas" value={totalUnits.toLocaleString("en-US")} />
            <MetricMini label="Venta cargada" value={formatMoney(totalRevenue)} />
          </div>
          <div className="space-y-3">
            {salesRows.map((row) => (
              <div key={row.id} className="grid gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 md:grid-cols-[1fr_auto_auto] md:items-center">
                <div>
                  <h4 className="font-black text-white">{row.dish}</h4>
                  <p className="text-sm text-slate-500">{row.period}</p>
                </div>
                <strong className="text-white">{Number(row.units).toLocaleString("en-US")} u</strong>
                <strong className="text-emerald-300">{formatMoney(row.revenue)}</strong>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function MetricLine({ label, value }) { return <div className="mb-3 flex items-center justify-between rounded-2xl bg-white/[0.025] px-3 py-3"><span className="font-semibold text-slate-400">{label}</span><strong className="text-lg text-white">{value}</strong></div>; }

function MetricsPage({ recipes, salesRows }) {
  const [timeWindow, setTimeWindow] = useState("mes");
  const [metricFocus, setMetricFocus] = useState("pedidos");
  const [foodWindow, setFoodWindow] = useState("mes");
  const chartData = timeWindow === "semana" ? monthlyData.slice(-2) : timeWindow === "mes" ? monthlyData.slice(-3) : monthlyData;
  const windowLabel = timeWindow === "semana" ? "semana" : timeWindow === "mes" ? "mes" : "año";
  const profitData = monthlyData.map((row) => ({ month: row.month, ganancia: row.ingresos - row.costos }));
  const latestProfit = profitData[profitData.length - 1].ganancia;
  const previousProfit = profitData[profitData.length - 2].ganancia;
  const profitDelta = Math.round(((latestProfit - previousProfit) / previousProfit) * 100);
  const topFoodByPeriod = {
    semana: [
      { name: "Pizza Pepperoni", units: 185, emoji: "🍕" },
      { name: "Burger Clásica", units: 148, emoji: "🍔" },
      { name: "Pizza Margherita", units: 132, emoji: "🍕" },
      { name: "Empanadas Carne", units: 96, emoji: "🥟" },
      { name: "Ensalada Caprese", units: 52, emoji: "🥗" },
    ],
    mes: [
      { name: "Pizza Margherita", units: 840, emoji: "🍕" },
      { name: "Pizza Pepperoni", units: 760, emoji: "🍕" },
      { name: "Burger Clásica", units: 690, emoji: "🍔" },
      { name: "Empanadas Carne", units: 410, emoji: "🥟" },
      { name: "Risotto de Champiñones", units: 280, emoji: "🍚" },
    ],
    anual: [
      { name: "Pizza Margherita", units: 9820, emoji: "🍕" },
      { name: "Burger Clásica", units: 8620, emoji: "🍔" },
      { name: "Pizza Pepperoni", units: 8110, emoji: "🍕" },
      { name: "Empanadas Carne", units: 5260, emoji: "🥟" },
      { name: "Ensalada Caprese", units: 3110, emoji: "🥗" },
    ],
  };
  const topFoodData = topFoodByPeriod[foodWindow];
  const maxFoodUnits = Math.max(...topFoodData.map((row) => row.units), 1);
  const kpis = [
    { icon: DollarSign, label: "Venta / pedido", value: "$12.63", change: "+8.2%", accent: "green" },
    { icon: TrendingUp, label: "Precisión forecast", value: "94.2%", change: "+2.4 pp", accent: "purple" },
    { icon: DollarSign, label: "Ganancia pura", value: "$30.8k", change: "+19.3%", accent: "cyan" },
    { icon: ChefHat, label: "Platos por hora", value: "84", change: "+11%", accent: "cyan" },
  ];
  return (
    <>
      <SectionTitle title="Métricas" subtitle="Más profundidad: revenue, costos, pedidos, margen, merma y precisión predictiva." />
      <Card className="mb-6 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex rounded-2xl border border-white/[0.07] bg-white/[0.035] p-1">
            {[["semana", "Semana"], ["mes", "Mes"], ["anual", "Anual"]].map(([id, label]) => <button key={id} onClick={() => setTimeWindow(id)} className={`h-10 rounded-xl px-4 font-black ${timeWindow === id ? "bg-[#7c4dff] text-white" : "text-slate-400 hover:text-white"}`}>{label}</button>)}
          </div>
          <div className="flex flex-wrap gap-2">
            {[["pedidos", "Pedidos"], ["margen", "Margen"], ["desperdicio", "Merma"]].map(([id, label]) => <button key={id} onClick={() => setMetricFocus(id)} className={`rounded-xl border px-3 py-2 text-sm font-black transition ${metricFocus === id ? "border-[#18d4ef]/45 bg-[#18d4ef]/15 text-white" : "border-white/[0.08] bg-white/[0.035] text-slate-400 hover:bg-white/[0.07] hover:text-white"}`}>{label}</button>)}
          </div>
        </div>
      </Card>
      <div className="mb-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">{kpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}</div>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_.95fr]"><Card className="p-7"><h3 className="mb-2 text-xl font-black text-white">Ingresos, costos y margen</h3><p className="mb-6 text-slate-400">Vista configurada por {windowLabel}</p><div className="h-[380px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData}><CartesianGrid stroke="rgba(255,255,255,.05)" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#8b8e9b" tickLine={false} axisLine={false} /><YAxis stroke="#8b8e9b" tickLine={false} axisLine={false} /><Tooltip contentStyle={{ background: "#181920", border: "1px solid rgba(255,255,255,.09)", borderRadius: 14, color: "#fff" }} /><Bar dataKey="ingresos" fill="#8f63ff" radius={[10, 10, 0, 0]} /><Bar dataKey="costos" fill="#12a8c7" radius={[10, 10, 0, 0]} /></BarChart></ResponsiveContainer></div></Card><Card className="p-7"><h3 className="mb-2 text-xl font-black text-white">{metricFocus === "pedidos" ? "Pedidos" : metricFocus === "margen" ? "Margen" : "Merma"}</h3><p className="mb-6 text-slate-400">Cambialo desde el selector superior</p><div className="h-[380px]"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><defs><linearGradient id="focusFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7c4dff" stopOpacity={0.45} /><stop offset="95%" stopColor="#7c4dff" stopOpacity={0.02} /></linearGradient></defs><CartesianGrid stroke="rgba(255,255,255,.05)" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#8b8e9b" tickLine={false} axisLine={false} /><YAxis stroke="#8b8e9b" tickLine={false} axisLine={false} /><Tooltip contentStyle={{ background: "#181920", border: "1px solid rgba(255,255,255,.09)", borderRadius: 14, color: "#fff" }} /><Area type="monotone" dataKey={metricFocus} stroke="#7c4dff" fill="url(#focusFill)" strokeWidth={3} /></AreaChart></ResponsiveContainer></div></Card></div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]"><Card className="relative overflow-hidden p-7"><div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" /><div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><h3 className="mb-2 text-xl font-black text-white">Ganancia últimos meses</h3><p className="text-slate-400">Ingresos menos costos por mes</p></div><div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-right"><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">Último mes</p><p className="text-2xl font-black text-white">{formatMoney(latestProfit)}</p><p className="text-sm font-black text-emerald-300">{profitDelta > 0 ? "+" : ""}{profitDelta}%</p></div></div><div className="h-[290px]"><ResponsiveContainer width="100%" height="100%"><AreaChart data={profitData}><defs><linearGradient id="profitMiniFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.7} /><stop offset="55%" stopColor="#18d4ef" stopOpacity={0.18} /><stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} /></linearGradient></defs><CartesianGrid stroke="rgba(255,255,255,.05)" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#8b8e9b" tickLine={false} axisLine={false} /><YAxis stroke="#8b8e9b" tickLine={false} axisLine={false} /><Tooltip contentStyle={{ background: "#181920", border: "1px solid rgba(255,255,255,.09)", borderRadius: 14, color: "#fff" }} /><Area type="monotone" dataKey="ganancia" stroke="#4ade80" fill="url(#profitMiniFill)" strokeWidth={5} dot={{ r: 5, fill: "#4ade80", strokeWidth: 0 }} /></AreaChart></ResponsiveContainer></div></Card><Card className="p-7"><div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><h3 className="mb-2 text-xl font-black text-white">Comidas más vendidas</h3><p className="text-slate-400">Ranking ficticio por período seleccionado</p></div><div className="flex rounded-2xl border border-white/[0.07] bg-white/[0.035] p-1">{[["semana", "Semana"], ["mes", "Mes"], ["anual", "Año"]].map(([id, label]) => <button key={id} onClick={() => setFoodWindow(id)} className={`h-9 rounded-xl px-3 text-sm font-black ${foodWindow === id ? "bg-[#7c4dff] text-white" : "text-slate-400 hover:text-white"}`}>{label}</button>)}</div></div><div className="space-y-4">{topFoodData.map((row, index) => <div key={row.name} className="rounded-2xl bg-white/[0.035] p-4"><div className="mb-3 flex items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-[#7c4dff]/15 text-sm font-black text-[#b49aff]">#{index + 1}</span><span className="text-2xl">{row.emoji}</span><strong className="text-white">{row.name}</strong></div><span className="font-black text-cyan-300">{row.units.toLocaleString("en-US")} u</span></div><div className="h-2 rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-gradient-to-r from-[#7c4dff] to-[#18d4ef]" style={{ width: `${Math.max(8, (row.units / maxFoodUnits) * 100)}%` }} /></div></div>)}</div></Card></div>
    </>
  );
}

function HistoryPage({ historyRows, clearHistory }) {
  return <><SectionTitle title="Historial" subtitle="Registro de predicciones, eventos, pedidos y cambios de configuración." action={<button onClick={clearHistory} className="h-12 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-5 font-black text-rose-200 hover:bg-rose-400/15">Limpiar historial</button>} /><Card className="overflow-hidden"><div className="overflow-x-auto"><table className="w-full min-w-[840px] text-left"><thead className="border-b border-white/[0.07] bg-white/[0.025] text-slate-400"><tr><th className="px-6 py-5">Fecha</th><th className="px-6 py-5">Acción</th><th className="px-6 py-5">Resultado</th><th className="px-6 py-5">Confianza</th><th className="px-6 py-5">Impacto</th></tr></thead><tbody>{historyRows.map((row, index) => <tr key={index + row.action} className="border-b border-white/[0.05] hover:bg-white/[0.025]"><td className="px-6 py-5 font-bold text-slate-300">{row.date}</td><td className="px-6 py-5 font-black text-white">{row.action}</td><td className="px-6 py-5 text-slate-300">{row.result}</td><td className="px-6 py-5 text-[#12a8c7]">{row.confidence}</td><td className="px-6 py-5 text-emerald-400">{row.impact}</td></tr>)}{!historyRows.length && <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-500">Historial vacío.</td></tr>}</tbody></table></div></Card></>;
}

function SettingsPage({ profile, setProfile, settings, setSettings, showToast, addHistory }) {
  function toggle(key) { setSettings((prev) => ({ ...prev, [key]: !prev[key] })); addHistory({ action: `Configuración actualizada`, result: key, confidence: "100%", impact: "Preferencia guardada" }); showToast("Configuración actualizada"); }
  function saveProfile() { addHistory({ action: "Perfil guardado", result: profile.restaurantName, confidence: "100%", impact: "Configuración actualizada" }); showToast("Perfil guardado"); }
  const cards = [
    { key: "ai", title: "Modelo IA", text: "Forecast de demanda, desperdicio y stock sugerido", value: settings.ai ? "Activo" : "Pausado" },
    { key: "notifications", title: "Notificaciones", text: "Alertas automáticas por quiebre, exceso y oportunidad", value: settings.notifications ? "Activadas" : "Silenciadas" },
    { key: "autoOrders", title: "Pedidos sugeridos", text: "Permite recomendaciones automáticas de compra", value: settings.autoOrders ? "Sugerencias ON" : "Manual" },
    { key: "integrations", title: "Integraciones", text: "POS, clima, calendario y proveedores", value: settings.integrations ? "3 conectadas" : "Desconectadas" },
  ];
  return <><SectionTitle title="Configuración" subtitle="Perfil del restaurante, preferencias operativas, usuarios e integraciones." action={<button onClick={saveProfile} className="h-12 rounded-2xl bg-gradient-to-r from-[#7c4dff] to-[#18d4ef] px-5 font-black text-white">Guardar perfil</button>} />
    <div className="grid gap-6 xl:grid-cols-[.9fr_1.1fr]"><Card className="p-7"><div className="mb-6 flex items-center gap-4"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#7c4dff] to-[#18d4ef]"><Store className="h-8 w-8 text-white" /></div><div><h3 className="text-2xl font-black text-white">Perfil del restaurante</h3><p className="text-slate-400">Datos base para personalizar cálculos</p></div></div><div className="grid gap-4"><TextInput label="Nombre del restaurante" value={profile.restaurantName} onChange={(value) => setProfile({ ...profile, restaurantName: value })} /><TextInput label="Email operativo" value={profile.email} onChange={(value) => setProfile({ ...profile, email: value })} icon={Mail} /><TextInput label="Ubicación" value={profile.location} onChange={(value) => setProfile({ ...profile, location: value })} icon={MapPin} /><TextInput label="Tipo de cocina" value={profile.cuisine} onChange={(value) => setProfile({ ...profile, cuisine: value })} /><TextInput label="Ticket promedio" type="number" value={profile.avgTicket} onChange={(value) => setProfile({ ...profile, avgTicket: value })} /><TextInput label="Objetivo de merma (%)" type="number" value={profile.targetWaste} onChange={(value) => setProfile({ ...profile, targetWaste: value })} /></div></Card>
    <div className="space-y-6"><div className="grid gap-6 md:grid-cols-2">{cards.map((item) => {
        const isActive = Boolean(settings[item.key]);
        return (
          <Card key={item.key} className="p-6 transition hover:border-[#7c4dff]/25">
            <div className="mb-5">
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <h3 className="mb-2 text-xl font-black text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{item.text}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-black ${isActive ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" : "border-slate-500/20 bg-white/[0.04] text-slate-400"}`}>
                  {isActive ? "Activo" : "Pausado"}
                </span>
              </div>

              <button
                onClick={() => toggle(item.key)}
                className={`flex h-12 w-full items-center justify-between rounded-2xl border px-4 font-black transition ${isActive ? "border-[#7c4dff]/30 bg-[#7c4dff]/15 text-white hover:bg-[#7c4dff]/20" : "border-white/[0.08] bg-white/[0.035] text-slate-400 hover:bg-white/[0.07] hover:text-white"}`}
              >
                <span>{item.value}</span>
                <span className={`relative h-6 w-11 rounded-full transition ${isActive ? "bg-[#7c4dff]" : "bg-white/[0.14]"}`}>
                  <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${isActive ? "left-6" : "left-1"}`} />
                </span>
              </button>
            </div>
          </Card>
        );
      })}</div><Card className="p-7"><h3 className="mb-4 text-2xl font-black text-white">Usuarios y permisos</h3><div className="grid gap-3">{["Admin", "Gerente", "Cocina", "Compras"].map((role, index) => <div key={role} className="flex items-center justify-between rounded-2xl bg-white/[0.035] p-4"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#7c4dff]/15 text-[#b49aff]"><Users className="h-4 w-4" /></div><span className="font-black text-white">{role}</span></div><span className="text-sm font-bold text-slate-500">{index === 0 ? "Full access" : "Limitado"}</span></div>)}</div></Card></div></div></>;
}

function TextInput({ label, value, onChange, type = "text", icon: Icon }) {
  return <label><span className="mb-2 block text-sm font-bold text-slate-400">{label}</span><div className="relative">{Icon && <Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />}<input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={`h-12 w-full rounded-2xl border border-white/[0.07] bg-[#101118] px-4 font-bold text-white outline-none focus:border-[#8f63ff]/60 ${Icon ? "pl-11" : ""}`} /></div></label>;
}

function EventModal({ event, onClose, onSave }) {
  const [draft, setDraft] = useState(event || { id: null, name: "", description: "", relevance: 70, impact: 15, active: true });
  const [isCalculating, setIsCalculating] = useState(false);

  function calculateWithAI() {
    setIsCalculating(true);
    window.setTimeout(() => {
      const text = `${draft.name} ${draft.description}`.toLowerCase();
      const negativeSignal = ["lluvia", "baja", "corte", "calor", "fin de mes", "reduce"].some((word) => text.includes(word));
      const manualImpact = Number(draft.impact || 0);
      const direction = manualImpact < 0 || negativeSignal ? -1 : 1;
      const adjustedMagnitude = Math.min(36, Math.max(5, Math.round(Math.abs(manualImpact) * 0.72 + 6)));
      const adjustedImpact = direction * adjustedMagnitude;
      const adjustedRelevance = Math.min(96, Math.max(58, Math.round(Number(draft.relevance || 70) + (direction > 0 ? 7 : 4))));
      setDraft((current) => ({ ...current, impact: adjustedImpact, relevance: adjustedRelevance }));
      setIsCalculating(false);
    }, 5000);
  }

  return <Modal title={event ? "Editar evento" : "Agregar evento"} onClose={onClose} footer={<div className="grid grid-cols-2 gap-3"><button onClick={onClose} className="h-12 rounded-2xl border border-white/[0.08] bg-white/[0.035] font-black text-white">Cancelar</button><button onClick={() => onSave(draft)} className="h-12 rounded-2xl bg-[#7c4dff] font-black text-white">Guardar evento</button></div>}><div className="grid gap-4"><TextInput label="Nombre del evento" value={draft.name} onChange={(value) => setDraft({ ...draft, name: value })} /><TextInput label="Qué pasa cuando ocurre" value={draft.description} onChange={(value) => setDraft({ ...draft, description: value })} /><TextInput label="Cuánto creés que afecta (%)" type="number" value={draft.impact} onChange={(value) => setDraft({ ...draft, impact: Number(value) })} /><button onClick={calculateWithAI} disabled={isCalculating} className="h-12 rounded-2xl border border-[#7c4dff]/30 bg-[#7c4dff]/15 font-black text-white transition hover:bg-[#7c4dff]/20 disabled:cursor-wait disabled:opacity-70">{isCalculating ? "IA calculando impacto..." : "Calcular impacto con IA"}</button>{isCalculating && <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] p-4"><div className="mb-3 h-2 overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-[#7c4dff] to-[#18d4ef]" /></div><p className="text-sm font-bold text-cyan-200">Analizando clima, demanda histórica, tipo de evento y servicio...</p></div>}<div className="grid gap-3 md:grid-cols-2"><MetricMini label="Impacto IA" value={`${Number(draft.impact) > 0 ? "+" : ""}${draft.impact}%`} /><MetricMini label="Confianza IA" value={`${draft.relevance}%`} /></div></div></Modal>;
}

function StockModal({ item, onClose, onSave }) {
  const [draft, setDraft] = useState(item);
  return <Modal title={item.id ? `Ajustar ${item.name}` : "Nuevo insumo"} onClose={onClose} footer={<div className="grid grid-cols-2 gap-3"><button onClick={onClose} className="h-12 rounded-2xl border border-white/[0.08] bg-white/[0.035] font-black text-white">Cancelar</button><button onClick={() => onSave(draft)} className="h-12 rounded-2xl bg-[#7c4dff] font-black text-white">Guardar</button></div>}><div className="grid gap-4 md:grid-cols-2"><TextInput label="Nombre" value={draft.name} onChange={(value) => setDraft({ ...draft, name: value })} /><TextInput label="Categoría" value={draft.category} onChange={(value) => setDraft({ ...draft, category: value })} /><TextInput label="Stock actual" type="number" value={draft.current} onChange={(value) => setDraft({ ...draft, current: Number(value) })} /><TextInput label="Stock óptimo" type="number" value={draft.max} onChange={(value) => setDraft({ ...draft, max: Number(value) })} /><TextInput label="En camino" type="number" value={draft.incoming || 0} onChange={(value) => setDraft({ ...draft, incoming: Number(value) })} /><TextInput label="Unidad" value={draft.unit} onChange={(value) => setDraft({ ...draft, unit: value })} /></div></Modal>;
}

function RecipeModal({ recipe, mode, onClose, onSave }) {
  const [draft, setDraft] = useState(recipe || {
    id: null,
    name: "Nueva receta",
    emoji: "🍽️",
    category: "General",
    time: "15 min",
    portions: 1,
    cost: 0,
    price: 0,
    margin: 0,
    popularity: 0,
    baseDemand: 0,
    ingredients: [],
    instructions: "Cargar preparación e ingredientes.",
  });
  const readOnly = mode === "details";
  return <Modal title={readOnly ? recipe.name : recipe ? `Editar ${recipe.name}` : "Nueva receta"} onClose={onClose} footer={readOnly ? <button onClick={onClose} className="h-12 w-full rounded-2xl bg-[#7c4dff] font-black text-white">Cerrar</button> : <div className="grid grid-cols-2 gap-3"><button onClick={onClose} className="h-12 rounded-2xl border border-white/[0.08] bg-white/[0.035] font-black text-white">Cancelar</button><button onClick={() => onSave(draft)} className="h-12 rounded-2xl bg-[#7c4dff] font-black text-white">Guardar receta</button></div>}>{readOnly ? <div className="space-y-5"><div className="text-6xl">{recipe.emoji}</div><p className="text-slate-400">{recipe.instructions}</p><div className="flex flex-wrap gap-2">{recipe.ingredients.map((ingredient) => <span key={ingredient.name} className="rounded-xl bg-white/[0.055] px-3 py-2 text-sm font-bold text-slate-300">{ingredient.qty} {ingredient.unit} {ingredient.name}</span>)}</div><div className="grid grid-cols-2 gap-3"><MetricMini label="Costo" value={`$${recipe.cost}`} /><MetricMini label="Precio" value={`$${recipe.price}`} /></div></div> : <div className="grid gap-4 md:grid-cols-2"><TextInput label="Nombre" value={draft.name} onChange={(value) => setDraft({ ...draft, name: value })} /><TextInput label="Categoría" value={draft.category} onChange={(value) => setDraft({ ...draft, category: value })} /><TextInput label="Emoji" value={draft.emoji} onChange={(value) => setDraft({ ...draft, emoji: value })} /><TextInput label="Costo" type="number" value={draft.cost} onChange={(value) => setDraft({ ...draft, cost: Number(value) })} /><TextInput label="Precio" type="number" value={draft.price} onChange={(value) => setDraft({ ...draft, price: Number(value) })} /><TextInput label="Cantidad histórica" type="number" value={draft.baseDemand} onChange={(value) => setDraft({ ...draft, baseDemand: Number(value) })} /></div>}</Modal>;
}

function MetricMini({ label, value }) { return <div className="rounded-2xl bg-white/[0.035] p-4"><p className="text-sm text-slate-500">{label}</p><p className="mt-1 text-xl font-black text-white">{value}</p></div>; }

function ReportModal({ onClose, historyRows }) {
  return <Modal title="Reporte IA generado" onClose={onClose} footer={<div className="grid grid-cols-2 gap-3"><button onClick={onClose} className="h-12 rounded-2xl border border-white/[0.08] bg-white/[0.035] font-black text-white">Cerrar reporte</button><button onClick={() => window.alert("Descarga de reporte disponible próximamente")} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7c4dff] to-[#18d4ef] font-black text-white"><Download className="h-4 w-4" /> Descargar</button></div>}><div className="space-y-4"><div className="rounded-2xl border border-[#7c4dff]/20 bg-[#7c4dff]/10 p-5"><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b49aff]">Resumen ejecutivo</p><h4 className="mt-2 text-2xl font-black text-white">Semana con demanda alta y stock controlable</h4><p className="mt-3 text-slate-400">La IA recomienda reforzar mozzarella, revisar eventos activos y monitorear insumos en camino.</p></div><div className="grid grid-cols-3 gap-3"><MetricMini label="Venta estimada" value="$67,420" /><MetricMini label="Costo" value="$36,600" /><MetricMini label="Ganancia pura" value="$30,820" /></div>{historyRows.slice(0, 3).map((row) => <div key={row.action} className="rounded-2xl bg-white/[0.035] p-4"><p className="font-black text-white">{row.action}</p><p className="mt-1 text-sm text-slate-400">{row.result} · {row.impact}</p></div>)}</div></Modal>;
}

export default function CookyliticsApp() {
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [stockItems, setStockItems] = useState(initialStockItems);
  const [recipes, setRecipes] = useState(initialRecipes);
  const [events, setEvents] = useState(initialEvents);
  const [historyRows, setHistoryRows] = useState(initialHistoryRows);
  const [salesRows, setSalesRows] = useState(initialSalesRows);
  const [settings, setSettings] = useState({ ai: true, notifications: true, autoOrders: true, integrations: true });
  const [profile, setProfile] = useState({ restaurantName: "Cookylitics Palermo", email: "admin@cookylitics.com", location: "Palermo, Buenos Aires", cuisine: "Pizza, burgers y casual food", avgTicket: 24, targetWaste: 3.5 });
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(null);
  const [notifications, setNotifications] = useState(4);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [currentScreen]);

  function showToast(message) { setToast(message); window.setTimeout(() => setToast(""), 2600); }
  function todayLabel() { return new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short" }); }
  function addHistory(row) { setHistoryRows((rows) => [{ date: todayLabel(), ...row }, ...rows].slice(0, 12)); }
  function refreshDashboard() { addHistory({ action: "Dashboard actualizado", result: "Datos sincronizados", confidence: "99.0%", impact: "Vista renovada" }); showToast("Dashboard actualizado"); }
  function generateReport() { setModal({ type: "report" }); addHistory({ action: "Reporte IA generado", result: "PDF ejecutivo", confidence: "94.2%", impact: "Listo para enviar" }); setNotifications((n) => n + 1); }
  function clearHistory() { setHistoryRows([]); showToast("Historial limpiado"); }
  function openStockModal(item) { setModal({ type: "stock", item: item || { id: null, name: "Nuevo insumo", category: "General", current: 0, max: 50, unit: "kg", incoming: 0, status: "Stock crítico", tone: "red" } }); }
  function saveStockItem(updated) { const normalized = updateStockStatus({ ...updated, current: Number(updated.current), max: Number(updated.max), incoming: Number(updated.incoming || 0) }); if (updated.id) { setStockItems((items) => items.map((item) => item.id === updated.id ? normalized : item)); addHistory({ action: `Stock ajustado: ${updated.name}`, result: `${updated.current} ${updated.unit}`, confidence: "100%", impact: normalized.status }); } else { const next = { ...normalized, id: Date.now() }; setStockItems((items) => [next, ...items]); addHistory({ action: `Insumo creado: ${updated.name}`, result: `${updated.current} ${updated.unit}`, confidence: "100%", impact: "Nuevo stock" }); } setModal(null); showToast("Stock guardado"); }
  function openRecipeModal(recipe, mode) { setModal({ type: "recipe", recipe, mode }); }
  function saveRecipe(updated) { const normalized = { ...updated, id: updated.id || Date.now(), cost: Number(updated.cost), price: Number(updated.price), margin: Number(updated.price) > 0 ? Math.round(((Number(updated.price) - Number(updated.cost)) / Number(updated.price)) * 100) : 0, baseDemand: Number(updated.baseDemand), popularity: Number(updated.popularity || 0), ingredients: updated.ingredients || [], instructions: updated.instructions || "Cargar preparación e ingredientes." }; if (updated.id) setRecipes((items) => items.map((recipe) => recipe.id === updated.id ? normalized : recipe)); else setRecipes((items) => [normalized, ...items]); addHistory({ action: updated.id ? `Receta editada: ${updated.name}` : `Receta creada: ${updated.name}`, result: `Precio $${updated.price}`, confidence: "100%", impact: "Margen recalculado" }); setModal(null); showToast(updated.id ? "Receta actualizada" : "Receta creada"); }
  function openEventModal(event) { setModal({ type: "event", event }); }
  function saveEvent(event) { const impactLabel = `${Number(event.impact) > 0 ? "+" : ""}${event.impact}%`; if (event.id) setEvents((items) => items.map((item) => item.id === event.id ? event : item)); else setEvents((items) => [{ ...event, id: Date.now() }, ...items]); addHistory({ action: `Evento configurado: ${event.name}`, result: `Impacto ${impactLabel}`, confidence: `${event.relevance}%`, impact: "Usado en calculadora" }); setModal(null); showToast("Evento guardado"); }
  function notificationClick() { setCurrentScreen("history"); setNotifications(0); showToast("Notificaciones revisadas"); }

  const pages = {
    dashboard: <Dashboard historyRows={historyRows} onRefresh={refreshDashboard} onGenerateReport={generateReport} addHistory={addHistory} showToast={showToast} />,
    calculator: <CalculatorPage recipes={recipes} stockItems={stockItems} setStockItems={setStockItems} events={events} setEvents={setEvents} addHistory={addHistory} showToast={showToast} openEventModal={openEventModal} />,
    stock: <StockPage stockItems={stockItems} setStockItems={setStockItems} addHistory={addHistory} showToast={showToast} openStockModal={openStockModal} />,
    recipes: <RecipesPage recipes={recipes} setRecipes={setRecipes} searchTerm={searchTerm} setSearchTerm={setSearchTerm} addHistory={addHistory} showToast={showToast} openRecipeModal={openRecipeModal} />,
    sales: <SalesPage recipes={recipes} salesRows={salesRows} setSalesRows={setSalesRows} addHistory={addHistory} showToast={showToast} />,
    metrics: <MetricsPage recipes={recipes} salesRows={salesRows} />,
    history: <HistoryPage historyRows={historyRows} clearHistory={clearHistory} />,
    settings: <SettingsPage profile={profile} setProfile={setProfile} settings={settings} setSettings={setSettings} showToast={showToast} addHistory={addHistory} />,
  };

  return <div className="min-h-screen overflow-hidden bg-[#0a0b10] font-sans text-white"><div className="pointer-events-none fixed inset-0 opacity-80"><div className="absolute left-[15%] top-[-18%] h-[440px] w-[440px] rounded-full bg-[#7c4dff]/18 blur-[110px]" /><div className="absolute bottom-[-20%] right-[-10%] h-[520px] w-[520px] rounded-full bg-[#18d4ef]/12 blur-[120px]" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,.045)_1px,transparent_0)] [background-size:28px_28px]" /></div><Sidebar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} /><Topbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCurrentScreen={setCurrentScreen} notifications={notifications} onNotificationClick={notificationClick} /><main className="relative px-5 pb-10 pt-9 lg:pl-[316px] lg:pr-8"><div className="mx-auto max-w-[1230px]"><div className="mb-5 flex gap-2 overflow-x-auto lg:hidden">{screens.map(({ id, label }) => <button key={id} onClick={() => setCurrentScreen(id)} className={`shrink-0 rounded-2xl px-4 py-2 font-bold ${currentScreen === id ? "bg-[#7c4dff] text-white" : "bg-[#17181d] text-slate-400"}`}>{label}</button>)}</div>{pages[currentScreen]}</div></main>{modal?.type === "report" && <ReportModal onClose={() => setModal(null)} historyRows={historyRows} />}{modal?.type === "stock" && <StockModal item={modal.item} onClose={() => setModal(null)} onSave={saveStockItem} />}{modal?.type === "recipe" && <RecipeModal recipe={modal.recipe} mode={modal.mode} onClose={() => setModal(null)} onSave={saveRecipe} />}{modal?.type === "event" && <EventModal event={modal.event} onClose={() => setModal(null)} onSave={saveEvent} />}<Toast message={toast} /></div>;
}


createRoot(document.getElementById("root")).render(<React.StrictMode><CookyliticsApp /></React.StrictMode>);
