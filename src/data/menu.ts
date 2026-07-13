// src/data/menu.ts

export interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
}

export interface FeatureItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  text: string;
  rating: number;
}

export interface HeroSlide {
  tagline: string;
  heading: string;
  highlight: string;
  sub: string;
}

export const heroSlides: HeroSlide[] = [
  {
    tagline: "🍔 Lo Mejor de San Miguel",
    heading: "La Mejor",
    highlight: "Hamburguesa",
    sub: "de San Miguel",
  },
  {
    tagline: "🔥 Sabor que Enamora",
    heading: "Donde Cada",
    highlight: "Mordida",
    sub: "es Leyenda",
  },
  {
    tagline: "🥩 Carne Premium",
    heading: "Angus 100%",
    highlight: "Pura & Real",
    sub: "a la Parrilla",
  },
];

export const menuItems: MenuItem[] = [
  {
    id: 1,
    title: "Hamburguesas de Autor",
    description:
      "Carne Angus 100% a la parrilla, queso cheddar fundido, salsas secretas de la casa. La razón por la que San Miguel habla de nosotros.",
    price: "$6.990",
    image: "/images/burger_close.webp",
    badge: "🔥 #1 en San Miguel",
  },
  {
    id: 2,
    title: "Acompañamientos Brutales",
    description:
      "Papas rústicas con cheddar y tocino, aros de cebolla XXL y nuggets artesanales que no encontrarás en otro lado.",
    price: "$2.990",
    image: "/images/burger_local.webp",
  },
  {
    id: 3,
    title: "Bebidas & Shakes",
    description:
      "Milkshakes coronados con crema, limonadas artesanales y bebidas heladas que complementan cada mordida.",
    price: "$3.490",
    image: "/images/local_noche.webp",
    badge: "✨ Nuevo",
  },
];

export const features: FeatureItem[] = [
  {
    id: 1,
    icon: "skillet",
    title: "Parrilla con Alma",
    description:
      "Cocción al carbón natural que sella la jugosidad y ese sabor ahumado que solo la brasa real puede dar.",
  },
  {
    id: 2,
    icon: "spa",
    title: "Frescos del Día",
    description:
      "Cada ingrediente llega fresco cada mañana. Vegetales de huerta local y carne seleccionada a mano.",
  },
  {
    id: 3,
    icon: "nightlife",
    title: "Vibe Única",
    description:
      "Música curada, luces de ambiente y un servicio que te hace sentir VIP. Aquí vienes por la burger, vuelves por la experiencia.",
  },
  {
    id: 4,
    icon: "rocket_launch",
    title: "Delivery Express",
    description:
      "Tu pedido en tu puerta en menos de 40 min. Cubrimos todo San Miguel y alrededores. ¡Sin excusas!",
  },
];

export const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Camila R.",
    text: "La mejor hamburguesa de todo San Miguel, sin exagerar. El ambiente es único, la carne se derrite y el servicio es de otro nivel. ¡Mi lugar favorito!",
    rating: 5,
  },
  {
    id: 2,
    name: "Matías P.",
    text: "Llevé a mi familia y todos quedaron locos. Las papas rústicas son adictivas y el milkshake de Oreo es legendario. San Guchon es imperdible.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sofía L.",
    text: "Vivo en San Miguel y probé de todo, pero San Guchon está en otro planeta. Fui por curiosidad y ahora voy cada fin de semana. 100% recomendado.",
    rating: 5,
  },
];
