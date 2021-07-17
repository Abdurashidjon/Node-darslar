const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB ulanish hosil qilindi ....');
    })
    .catch((err) => {
        console.error(`MongoDB ga ulanish vaqtida xato ro'y berdi....`);
    });

const SizeSchema = new mongoose.Schema({
    h: Number,
    w: Number,
    uom: String
})

const inventorySchema = new mongoose.Schema({
    item: String,
    qty: Number,
    size: SizeSchema,
    status: String
}, {
    collection: 'inventory'
});
const Inventory = mongoose.model('Inventory', inventorySchema);
async function getInventoryItmes1() {
    return await Inventory
        .find({ status: 'A' })
        .sort({ item: 1 })
        .select({ item: 1, qty: 1, _id: 0 })
}
async function getInventoryItmes2() {
    return await Inventory
        .find()
        .or([{ qty: { $lte: 50 } }, { item: /.*1.*/i }])
        .sort({ qty: -1 })
}

async function run() {
    const items = await getInventoryItmes2();
    console.log(items);
}
run();