const supabase = require('./db');

async function seed() {
    console.log('🌱 Starting database seeding...');

    try {
        // 1. Seed Products
        const products = [
            { name: 'Architectural Silk Blazer', price: 1250, stock: 12, category: 'Women', description: 'A structured silk blazer with modern proportions.', sku: 'W-BLZ-001', image_url: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80' },
            { name: 'Minimalist Cashmere Knit', price: 450, stock: 25, category: 'Men', description: 'Ultra-soft cashmere knit in a relaxed silhouette.', sku: 'M-KNIT-002', image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80' },
            { name: 'Artisan Denim Trousers', price: 320, stock: 15, category: 'Men', description: 'Hand-dyed indigo denim with raw edge detailing.', sku: 'M-TRS-003', image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80' },
            { name: 'Sculptural Wool Coat', price: 2100, stock: 8, category: 'Women', description: 'Heavyweight wool coat with asymmetric draping.', sku: 'W-COT-004', image_url: 'https://images.unsplash.com/photo-1539533377285-a9214197460c?auto=format&fit=crop&q=80' },
            { name: 'Juvenile Organic Tee', price: 85, stock: 40, category: 'Kids', description: 'Soft organic cotton tee for the next generation.', sku: 'K-TEE-005', image_url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80' },
            { name: 'Geometric Pattern Scarf', price: 180, stock: 30, category: 'Archive', description: 'Limited edition silk scarf from the 1998 collection.', sku: 'A-SCRF-006', image_url: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80' }
        ];

        console.log('Inserting products...');
        const { data: insertedProducts, error: pError } = await supabase.from('products').upsert(products, { onConflict: 'sku' }).select();
        if (pError) throw pError;

        // 2. Seed Orders (Simulated history)
        const orderDates = [
            new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
            new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            new Date() // Today
        ];

        const dummyOrders = [
            { order_number: 'ETC-1001', customer_name: 'Julian Vane', customer_email: 'julian@vane.com', total_amount: 1700, status: 'Delivered', created_at: orderDates[0] },
            { order_number: 'ETC-1002', customer_name: 'Elena Rossi', customer_email: 'elena@rossi.it', total_amount: 450, status: 'Shipped', created_at: orderDates[1] },
            { order_number: 'ETC-1003', customer_name: 'Marcus Thorne', customer_email: 'marcus@thorne.io', total_amount: 320, status: 'Processing', created_at: orderDates[2] },
            { order_number: 'ETC-1004', customer_name: 'Sophia Chen', customer_email: 'sophia@chen.com', total_amount: 2100, status: 'Delivered', created_at: orderDates[3] },
            { order_number: 'ETC-1005', customer_name: 'David Beck', customer_email: 'david@beck.com', total_amount: 85, status: 'Pending', created_at: orderDates[4] },
            { order_number: 'ETC-1006', customer_name: 'Isabella Noir', customer_email: 'isabella@noir.fr', total_amount: 1430, status: 'Delivered', created_at: orderDates[5] },
            { order_number: 'ETC-1007', customer_name: 'Liam Sterling', customer_email: 'liam@sterling.uk', total_amount: 3350, status: 'Processing', created_at: orderDates[6] }
        ];

        console.log('Inserting orders...');
        const { data: insertedOrders, error: oError } = await supabase.from('orders').upsert(dummyOrders, { onConflict: 'order_number' }).select();
        if (oError) throw oError;

        // 3. Seed Order Items (Connecting them)
        console.log('Connecting items to orders...');
        const items = [];
        insertedOrders.forEach((order, idx) => {
            // Give each order some random items from our seeded products
            const product = insertedProducts[idx % insertedProducts.length];
            items.push({
                order_id: order.id,
                product_id: product.id,
                quantity: 1,
                unit_price: product.price
            });
        });

        const { error: iError } = await supabase.from('order_items').insert(items);
        if (iError) throw iError;

        console.log('✅ Database seeded successfully!');
    } catch (err) {
        console.error('❌ Seeding failed:', err.message);
    } finally {
        process.exit();
    }
}

seed();
