import { supabase } from "@/lib/supabase";

export const DEFAULT_CURRENCY = "USD";

export const SUPPORTED_CURRENCIES = [
  "AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN",
  "BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL",
  "BSD","BTN","BWP","BYN","BZD","CAD","CDF","CHF","CLP","CNY",
  "COP","CRC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP",
  "ERN","ETB","EUR","FJD","FKP","GBP","GEL","GHS","GIP","GMD",
  "GNF","GTQ","GYD","HKD","HNL","HTG","HUF","IDR","ILS","INR",
  "IQD","IRR","ISK","JMD","JOD","JPY","KES","KGS","KHR","KMF",
  "KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL",
  "LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR",
  "MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR",
  "NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR",
  "RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD",
  "SHP","SLE","SOS","SRD","SSP","STN","SVC","SYP","SZL","THB",
  "TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX",
  "USD","UYU","UZS","VES","VND","VUV","WST","XAF","XCD","XOF",
  "XPF","YER","ZAR","ZMW","ZWG",
] as const;

const currencySet = new Set<string>(SUPPORTED_CURRENCIES);

export function normalizeCurrency(value?: string | null) {
  const code = value?.trim().toUpperCase();

  return code && currencySet.has(code)
    ? code
    : DEFAULT_CURRENCY;
}

export function formatCurrency(
  value: number | string,
  currency: string = DEFAULT_CURRENCY,
) {
  const numericValue = Number(value || 0);
  const code = normalizeCurrency(currency);
  const safeValue = Number.isFinite(numericValue) ? numericValue : 0;

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits: 2,
    }).format(safeValue);
  } catch {
    return `${code} ${safeValue.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })}`;
  }
}

export function saveWorkspaceCurrency(currency: string) {
  if (typeof window === "undefined") {
    return;
  }

  const code = normalizeCurrency(currency);

  window.localStorage.setItem("bizos_currency", code);

  window.dispatchEvent(
    new CustomEvent("bizos-currency-changed", {
      detail: code,
    }),
  );
}

export function getLocalWorkspaceCurrency() {
  if (typeof window === "undefined") {
    return DEFAULT_CURRENCY;
  }

  return normalizeCurrency(
    window.localStorage.getItem("bizos_currency"),
  );
}

export async function loadWorkspaceCurrency() {
  const localCurrency = getLocalWorkspaceCurrency();

  if (localCurrency !== DEFAULT_CURRENCY) {
    return localCurrency;
  }

  const { data } = await supabase
    .from("workspace_settings")
    .select("currency")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  const databaseCurrency = normalizeCurrency(data?.currency);

  if (typeof window !== "undefined") {
    window.localStorage.setItem("bizos_currency", databaseCurrency);
  }

  return databaseCurrency;
}