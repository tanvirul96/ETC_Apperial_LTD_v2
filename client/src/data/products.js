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
    description: 'Premium woven textiles sourced from world-class mills.',
    items: [
      { id: 'wf-001', name: 'Plain Weave Cotton Fabric', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop' },
      { id: 'wf-002', name: 'Twill Weave Denim Fabric', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop' },
      { id: 'wf-003', name: 'Satin Weave Silk Fabric', image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?q=80&w=600&auto=format&fit=crop' },
      { id: 'wf-004', name: 'Oxford Weave Shirting Fabric', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop' },
      { id: 'wf-005', name: 'Canvas Weave Duck Fabric', image: 'https://images.unsplash.com/photo-1598901861117-600e845c43d7?q=80&w=600&auto=format&fit=crop' },
      { id: 'wf-006', name: 'Dobby Weave Jacquard Fabric', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop' },
      { id: 'wf-007', name: 'Herringbone Weave Fabric', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop' },
      { id: 'wf-008', name: 'Poplin Weave Fabric', image: 'https://images.unsplash.com/photo-1520638029055-f9385d77014b?q=80&w=600&auto=format&fit=crop' },
    ],
  },
  {
    id: 'ladies-wear',
    name: 'Ladies Wear',
    icon: '🪡',
    accent: '#3c5a96',
    description: 'Stretchy, comfortable knit constructions for every style.',
    items: [
      { id: 'kf-001', name: 'Single Jersey Knit', image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=600&auto=format&fit=crop' },
      { id: 'kf-002', name: 'Double Jersey Knit', image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=600&auto=format&fit=crop' },
      { id: 'kf-003', name: 'Rib Knit Fabric', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600&auto=format&fit=crop' },
      { id: 'kf-004', name: 'Interlock Knit Fabric', image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=600&auto=format&fit=crop' },
      { id: 'kf-005', name: 'French Terry Fabric', image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&auto=format&fit=crop' },
      { id: 'kf-006', name: 'Fleece Fabric', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop' },
      { id: 'kf-007', name: 'Waffle Knit Fabric', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop' },
    ],
  },
  {
    id: 'boys-wear',
    name: 'Boys Wear',
    icon: '👕',
    accent: '#2e7d32',
    description: 'Ready-to-ship and made-to-order garment lines.',
    items: [
      { id: 'gm-001', name: "Men's Casual T-Shirt", image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop' },
      { id: 'gm-002', name: "Men's Formal Dress Shirt", image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop' },
      { id: 'gm-003', name: "Men's Polo Shirt", image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop' },
      { id: 'gm-004', name: "Women's Blouse", image: 'https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?q=80&w=600&auto=format&fit=crop' },
      { id: 'gm-005', name: "Women's Kurti Top", image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop' },
      { id: 'gm-006', name: 'Unisex Hoodie Sweatshirt', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop' },
      { id: 'gm-007', name: 'Cargo Trousers', image: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=600&auto=format&fit=crop' },
      { id: 'gm-008', name: 'Denim Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop' },
      { id: 'gm-009', name: 'Chino Trousers', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop' },
      { id: 'gm-010', name: 'Activewear Set', image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop' },
    ],
  },
  {
    id: 'girls-wear',
    name: 'Girls Wear',
    icon: '🛏️',
    accent: '#6d4c41',
    description: 'Luxurious home textile products for modern living.',
    items: [
      { id: 'ht-001', name: 'Cotton Bed Sheet', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop' },
      { id: 'ht-002', name: 'Duvet Cover Set', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop' },
      { id: 'ht-003', name: 'Pillow Case', image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=600&auto=format&fit=crop' },
      { id: 'ht-004', name: 'Terry Bath Towel', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=600&auto=format&fit=crop' },
      { id: 'ht-005', name: 'Kitchen Towel', image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop' },
      { id: 'ht-006', name: 'Table Cloth', image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=600&auto=format&fit=crop' },
      { id: 'ht-007', name: 'Curtain Fabric', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop' },
    ],
  },
  {
    id: 'kids-wear',
    name: 'Kids Wear',
    icon: '🪢',
    accent: '#6a1b9a',
    description: 'Quality trims and accessories to finish every garment.',
    items: [
      { id: 'ac-001', name: 'Woven Label', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop' },
      { id: 'ac-002', name: 'Printed Label', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600&auto=format&fit=crop' },
      { id: 'ac-003', name: 'Hang Tag', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600&auto=format&fit=crop' },
      { id: 'ac-004', name: 'Zipper', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop' },
      { id: 'ac-005', name: 'Button Set', image: 'https://images.unsplash.com/photo-1592892111425-15e04305f961?q=80&w=600&auto=format&fit=crop' },
      { id: 'ac-006', name: 'Elastic Band', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600&auto=format&fit=crop' },
      { id: 'ac-007', name: 'Drawstring Cord', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop' },
      { id: 'ac-008', name: 'Velcro Strip', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop' },
    ],
  },
  {
    id: 'others',
    name: 'Others',
    icon: '🌿',
    accent: '#1b5e20',
    description: 'Eco-conscious textiles certified for sustainability.',
    items: [
      { id: 'sr-001', name: 'Organic Cotton Fabric', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop' },
      { id: 'sr-002', name: 'Recycled Polyester Fabric', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600&auto=format&fit=crop' },
      { id: 'sr-003', name: 'Bamboo Blend Fabric', image: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=600&auto=format&fit=crop' },
      { id: 'sr-004', name: 'GOTS Certified Jersey', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop' },
      { id: 'sr-005', name: 'Tencel / Lyocell Fabric', image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?q=80&w=600&auto=format&fit=crop' },
      { id: 'sr-006', name: 'Hemp Blended Fabric', image: 'https://images.unsplash.com/photo-1598901861117-600e845c43d7?q=80&w=600&auto=format&fit=crop' },
    ],
  },
];
