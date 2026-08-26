/**
 * ============================================================
 *  ETC Apparel Ltd — Product Catalogue Data
 * ============================================================
 *
 *  HOW TO ADD PRODUCTS
 *  -------------------
 *  1. Find the right category object in `productCategories`.
 *  2. Push a new entry into its `items` array:
 *
 *     { id: 'unique-id', name: 'Your Product Name', image: 'Unsplash URL' }
 *
 *  3. To add a NEW CATEGORY, append a new object to the
 *     `productCategories` array following the same shape.
 *
 * ============================================================
 */

export const productCategories = [
  {
    id: 'mens-wear',
    name: 'Mens Wear',
    icon: '🧵',
    accent: '#885203',
    description: 'Premium woven textiles and tailoring sourced for modern gentlemen.',
    items: [
      { id: 'wf-001', name: 'Plain Weave Cotton Fabric', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop' },
      { id: 'wf-002', name: 'Twill Weave Denim Fabric', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop' },
      { id: 'wf-003', name: 'Satin Weave Silk Fabric', image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?q=80&w=600&auto=format&fit=crop' },
      { id: 'wf-004', name: 'Oxford Weave Shirting Fabric', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop' },
      { id: 'wf-005', name: 'Canvas Weave Duck Fabric', image: 'https://images.unsplash.com/photo-1598901861117-600e845c43d7?q=80&w=600&auto=format&fit=crop' },
      { id: 'wf-006', name: 'Dobby Weave Jacquard Fabric', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop' },
      { id: 'wf-007', name: 'Herringbone Weave Fabric', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop' },
      { id: 'wf-008', name: 'Poplin Weave Fabric', image: 'https://images.unsplash.com/photo-1520638029055-f9385d77014b?q=80&w=600&auto=format&fit=crop' },
      { id: 'gm-001', name: "Men's Casual T-Shirt", image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop' },
      { id: 'gm-002', name: "Men's Formal Dress Shirt", image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop' },
      { id: 'gm-003', name: "Men's Polo Shirt", image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop' },
      { id: 'gm-007', name: 'Cargo Trousers', image: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=600&auto=format&fit=crop' },
      { id: 'gm-008', name: 'Denim Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop' },
    ],
  },
  {
    id: 'kids-collection',
    name: 'Kids Collection',
    icon: '🪢',
    accent: '#6a1b9a',
    description: 'Playful, durable, and certified comfortable apparel for boys and girls.',
    items: [
      { id: 'kc-001', name: "Kids Casual Graphic T-Shirt", image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=600&auto=format&fit=crop' },
      { id: 'kc-002', name: "Boys Comfort Denim Pants", image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?q=80&w=600&auto=format&fit=crop' },
      { id: 'kc-003', name: "Girls Summer Floral Dress", image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=600&auto=format&fit=crop' },
      { id: 'kc-004', name: "Kids Warm Fleece Hoodie", image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop' },
      { id: 'kc-005', name: "Kids Activewear Jogger Set", image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop' },
      { id: 'kc-006', name: "Children's Knitted Cardigan", image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600&auto=format&fit=crop' },
      { id: 'kc-007', name: "Baby Organic Cotton Romper", image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop' },
      { id: 'kc-008', name: "Kids Lightweight Windbreaker", image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop' },
    ],
  },
  {
    id: 'ladies-wear',
    name: 'Ladies Wear',
    icon: '🪡',
    accent: '#3c5a96',
    description: 'Stretchy, comfortable knit constructions and elegant silhouettes for every style.',
    items: [
      { id: 'kf-001', name: 'Single Jersey Knit', image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=600&auto=format&fit=crop' },
      { id: 'kf-002', name: 'Double Jersey Knit', image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=600&auto=format&fit=crop' },
      { id: 'kf-003', name: 'Rib Knit Fabric', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600&auto=format&fit=crop' },
      { id: 'kf-004', name: 'Interlock Knit Fabric', image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=600&auto=format&fit=crop' },
      { id: 'kf-005', name: 'French Terry Fabric', image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop' },
      { id: 'kf-006', name: 'Fleece Fabric', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop' },
      { id: 'kf-007', name: 'Waffle Knit Fabric', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop' },
      { id: 'gm-004', name: "Women's Blouse", image: 'https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?q=80&w=600&auto=format&fit=crop' },
      { id: 'gm-005', name: "Women's Kurti Top", image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop' },
    ],
  },
];
