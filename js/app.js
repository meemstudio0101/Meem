const products=[
{id:1,code:'MEEM-001',cat:'cards',catAr:'كروت',name:'Dessert Cards',ar:'كروت حلويات',price:0,img:'images/product-01.jpg',desc:'Dessert-themed cards.',descAr:'كروت بتصميم مستوحى من الحلويات.'},

{id:2,code:'MEEM-002',cat:'cards',catAr:'كروت',name:'Color Pencil Cards',ar:'كروت أقلام ملونة',price:0,img:'images/product-02.jpg',desc:'Color pencil themed cards.',descAr:'كروت بتصميم مستوحى من الأقلام الملونة.'},

{id:3,code:'MEEM-003',cat:'cards',catAr:'كروت',name:'White Cards',ar:'كروت بيضاء',price:0,img:'images/product-03.jpg',desc:'Minimal white cards.',descAr:'كروت بيضاء بتصميم بسيط وأنيق.'},

{id:4,code:'MEEM-004',cat:'cards',catAr:'كروت',name:'Flower Cards',ar:'كروت ورد',price:0,img:'images/product-04.jpg',desc:'Flower-themed cards.',descAr:'كروت بتصميم مستوحى من الورود.'},

{id:5,code:'MEEM-005',cat:'stickers',catAr:'استيكرات',name:'Visual Identity Stickers',ar:'استيكرات الهوية البصرية',price:0,img:'images/product-05.jpg',desc:'Visual identity sticker designs.',descAr:'استيكرات بتصاميم متناسقة مع الهوية البصرية.'},

{id:6,code:'MEEM-006',cat:'cards',catAr:'كروت',name:'Greeting Cards',ar:'كروت تهنئة',price:0,img:'images/product-06.jpg',desc:'Greeting card designs.',descAr:'كروت تهنئة بتصاميم جميلة ومميزة.'}
];

let cart=[];
let lang='ar';
let page=0;
const perPage=6;

const heroImages=[
'images/hero-01.jpg',
'images/hero-02.jpg',
'images/hero-03.jpg'
];

let slide=0;


/* =========================
   PRODUCTS
========================= */

function renderProducts(){
    const el=document.getElementById('products');

    const pages=Math.max(1,Math.ceil(products.length/perPage));

    if(page>=pages) page=pages-1;

    const list=products.slice(
        page*perPage,
        (page+1)*perPage
    );

    el.innerHTML=list.map(p=>`
        <article class="product">

            <div class="product-img">
                <img src="${p.img}" alt="${lang==='en'?p.name:p.ar}">
                <span class="badge">
                    ${lang==='en'?'DIGITAL':'رقمي'}
                </span>
            </div>

            <div class="product-info">

                <span class="category">
                    ${lang==='en'?p.cat:p.catAr}
                </span>

                <h3>
                    ${lang==='en'?p.name:p.ar}
                </h3>

                <p>
                    ${lang==='en'?p.desc:p.descAr}
                </p>

                <div class="product-bottom">
                    <button class="add" onclick="addToCart(${p.id})">
                        +
                    </button>
                </div>

            </div>

        </article>
    `).join('') || `
        <div class="empty">
            ${lang==='en'?'No products found.':'لا توجد منتجات.'}
        </div>
    `;

    document.getElementById('productPage').textContent=
        `${page+1} / ${pages}`;

    document.getElementById('prevProducts').disabled=
        page===0;

    document.getElementById('nextProducts').disabled=
        page===pages-1;
}


/* =========================
   CART
========================= */

function addToCart(id){
    const p=products.find(x=>x.id===id);

    if(!cart.find(x=>x.id===id)){
        cart.push(p);
    }

    renderCart();
}


function removeFromCart(id){
    cart=cart.filter(x=>x.id!==id);
    renderCart();
}


function renderCart(){

    document.getElementById('count').textContent=
        cart.length;

    document.getElementById('cart')
        .classList.toggle(
            'has-items',
            cart.length>0
        );

    document.getElementById('cartItems').innerHTML=
        cart.length
        ?
        cart.map(p=>`
            <div class="cart-item">

                <img src="${p.img}">

                <div>
                    <h4>
                        ${lang==='en'?p.name:p.ar}
                    </h4>
                </div>

                <button
                    class="remove"
                    onclick="removeFromCart(${p.id})"
                >
                    ×
                </button>

            </div>
        `).join('')
        :
        `
        <div class="empty">
            ${lang==='en'
                ?'Your cart is empty.'
                :'السلة فارغة.'
            }
        </div>
        `;

    document.getElementById('total').textContent='';
}


/* =========================
   CART OPEN / CLOSE
========================= */

function openCart(){
    document.getElementById('cart')
        .classList.add('open');

    document.getElementById('overlay')
        .classList.add('open');
}


function closeCart(){
    document.getElementById('cart')
        .classList.remove('open');

    document.getElementById('overlay')
        .classList.remove('open');
}


document.getElementById('cartOpen').onclick=openCart;

document.getElementById('cartClose').onclick=closeCart;

document.getElementById('overlay').onclick=closeCart;


/* =========================
   PRODUCT PAGINATION
========================= */

document.getElementById('prevProducts').onclick=()=>{
    if(page>0){
        page--;
        renderProducts();
    }
};


document.getElementById('nextProducts').onclick=()=>{
    if((page+1)*perPage<products.length){
        page++;
        renderProducts();
    }
};


/* =========================
   LANGUAGE
========================= */

function applyLanguage(){

    document.body.classList.toggle(
        'ar',
        lang==='ar'
    );

    document.documentElement.dir=
        lang==='ar'
        ?'rtl'
        :'ltr';

    document.documentElement.lang=
        lang;

    document.getElementById('lang').textContent=
        lang==='en'
        ?'العربية'
        :'English';

    document.querySelectorAll('[data-en]')
        .forEach(el=>{

            const value=
                lang==='en'
                ?el.dataset.en
                :el.dataset.ar;

            if(value!==undefined){
                el.innerHTML=value;
            }

        });

    renderProducts();
    renderCart();
}


/* LANGUAGE BUTTON */

document.getElementById('lang').onclick=()=>{

    lang=
        lang==='en'
        ?'ar'
        :'en';

    applyLanguage();

};


/* =========================
   HERO SLIDER
========================= */

function hero(){

    document.getElementById('heroBg')
        .style.backgroundImage=
        `url("${heroImages[slide]}")`;

    document.getElementById('slideNo')
        .textContent=
        String(slide+1).padStart(2,'0');
}


document.getElementById('next').onclick=()=>{
    slide=(slide+1)%3;
    hero();
};


document.getElementById('prev').onclick=()=>{
    slide=(slide+2)%3;
    hero();
};


setInterval(()=>{
    slide=(slide+1)%3;
    hero();
},6000);


/* =========================
   INITIAL LOAD
========================= */

lang='ar';

applyLanguage();

hero();

renderProducts();

renderCart();


/* =========================
   WHATSAPP CHECKOUT
========================= */

document.getElementById('checkout').onclick=()=>{

    if(!cart.length){

        return alert(
            lang==='en'
            ?'Your cart is empty.'
            :'السلة فارغة.'
        );

    }

    // اختيار اسم المنتج حسب اللغة
    const text=
        cart
        .map(p=>{
            const productName =
                lang==='en'
                ? p.name
                : p.ar;

            return `${productName} - $${p.price}`;
        })
        .join('%0A');

    const total=
        cart.reduce(
            (s,p)=>s+p.price,
            0
        );

    // رسالة الواتساب حسب اللغة
    const message =
        lang==='en'
        ? `Hello, I want to order:%0A${text}%0ATotal: $${total}`
        : `مرحبًا، أود طلب:%0A${text}%0Aالإجمالي: $${total}`;

    window.open(
        `https://wa.me/923312330597?text=${message}`,
        '_blank'
    );

};
