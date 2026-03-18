import type { CartItem } from "@/types/cart";

export function buildWhatsAppOrderText(args: {
  name: string;
  phone: string;
  address: string;
  items: CartItem[];
  totalPrice: number;
}) {
  const { name, phone, address, items, totalPrice } = args;
  const lines: string[] = [];
  lines.push(`שם: ${name || "-"}`);
  lines.push(`טלפון: ${phone || "-"}`);
  lines.push(`כתובת: ${address || "-"}`);
  lines.push("");
  lines.push("הזמנה:");

  for (const { product, quantity } of items) {
    lines.push(`${product.name} x${quantity}`);
  }

  lines.push("");
  lines.push(`סה״כ: ${totalPrice.toFixed(2)}₪`);
  return lines.join("\n");
}

export function getWhatsAppUrl(phoneE164: string, text: string) {
  const phone = phoneE164.replace(/[^\d+]/g, "");
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${phone.replace("+", "")}?text=${encoded}`;
}

