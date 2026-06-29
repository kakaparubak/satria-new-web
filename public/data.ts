
export const rcheckImages = [
  {
    "src": "https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779016714/_RZL0599_vgrzr0.jpg"
  },
  {
    "src": "https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779016716/_RZL0332_cru3kx.jpg"
  },
  {
    "src": "https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779016719/_RZL4208_jxbzrm.jpg"
  },
  {
    "src": "https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779016714/_RZL3276_flofxk.jpg"
  },
  {
    "src": "https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779016714/_RZL8664_eu59gw.jpg"
  }
]

export const projects = [
  {
    "name": "Rich Brian in Jakarta 2025",
    "date": "29/11/2025",
    "imgs": [],
    "desc": ""
  },
  {
    "name": "TV Commercial Sirup Marjan",
    "date": "06/11/2025",
    "imgs": [],
    "desc": ""
  },
  {
    "name": "Scream Or Dance 2025",
    "date": "31/10/2025",
    "imgs": [],
    "desc": ""
  },
  {
    "name": "Foo Fighter in Jakarta",
    "date": "02/10/2025",
    "imgs": [],
    "desc": ""
  },
  {
    "name": "MUSE in Jakarta 2025",
    "date": "19/09/2025",
    "imgs": [],
    "desc": ""
  },
  {
    "name": "Konser Jumbo 2025",
    "date": "17/08/2025",
    "imgs": [],
    "desc": ""
  },
  {
    "name": "School Of Rock (Rerun 2025)",
    "date": "27/07/2025",
    "imgs": [],
    "desc": ""
  },
  {
    "name": "Green Day In Jakarta 2025",
    "date": "15/02/2025",
    "imgs": [],
    "desc": ""
  },
  {
    "name": "Dangdut Musikal (FMI Version) 2024",
    "date": "26/10/2024",
    "imgs": [],
    "desc": ""
  },
  {
    "name": "Pestapora 2024",
    "date": "20/09/2024",
    "imgs": [],
    "desc": ""
  }
]

export const redirects = [
  {
    "slug": "BinusianBeachFestival2026",
    "url": "https://drive.google.com/drive/folders/1BtOPjoVkMqZh03hVyRnwfNqcl7sYaeuw?usp=sharing"
  },
  {
    "slug": "hello",
    "url": "https://whatsapp.com"
  },
  {
    "slug": "sample",
    "url": "https://example.com",
    "img": "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1600",
    "text": "You are being redirected to the example page. Thanks for clicking!"
  }
]

export type Redirect = {
  slug: string;
  url: string;
  img?: string;
  text?: string;
};

export function findRedirect(slug: string): Redirect | undefined {
  return redirects.find(r => r.slug === slug);
}
