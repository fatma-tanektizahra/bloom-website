export type Service = {
  slug: string;
  name: string;
  duration: string;
  price: string;
  image: string;
};

export const services: Service[] = [
  {
    slug: "signature-cut",
    name: "Signature cut",
    duration: "45 min",
    price: "60 DT",
    image: "/images/services/signature-cut.jpg",
  },
  {
    slug: "colour-gloss",
    name: "Colour and gloss",
    duration: "1 hr 30 min",
    price: "140 DT",
    image: "/images/services/colour-gloss.jpg",
  },
  {
    slug: "deep-condition",
    name: "Deep-condition treatment",
    duration: "30 min",
    price: "45 DT",
    image: "/images/services/deep-condition.jpg",
  },
  {
    slug: "bridal-styling",
    name: "Bridal styling",
    duration: "2 hr",
    price: "220 DT",
    image: "/images/services/bridal-styling.jpg",
  },
  {
    slug: "blow-dry",
    name: "Blow-dry",
    duration: "30 min",
    price: "35 DT",
    image: "/images/services/blow-dry.jpg",
  },
];
