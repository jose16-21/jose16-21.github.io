(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}})();class m{static isValidEmail(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}static isRequired(e){return e.trim().length>0}static minLength(e,t){return e.trim().length>=t}}class i{static querySelector(e){return document.querySelector(e)}static querySelectorAll(e){return document.querySelectorAll(e)}static createElement(e,t){const r=document.createElement(e);return t!=null&&t.className&&(r.className=t.className),t!=null&&t.textContent&&(r.textContent=t.textContent),t!=null&&t.innerHTML&&(r.innerHTML=t.innerHTML),t!=null&&t.attributes&&Object.entries(t.attributes).forEach(([a,s])=>{r.setAttribute(a,s)}),r}static addEventListeners(e,t,r){Array.from(e).forEach(s=>{s.addEventListener(t,r)})}}class y{static fadeIn(e,t={}){const{duration:r=300,delay:a=0}=t;e.style.opacity="0",e.style.transition=`opacity ${r}ms ease`,setTimeout(()=>{e.style.opacity="1"},a)}static slideUp(e,t={}){const{duration:r=300,delay:a=0}=t;e.style.transform="translateY(30px)",e.style.opacity="0",e.style.transition=`transform ${r}ms ease, opacity ${r}ms ease`,setTimeout(()=>{e.style.transform="translateY(0)",e.style.opacity="1"},a)}static animateOnScroll(e){const t=new IntersectionObserver(r=>{r.forEach(a=>{a.isIntersecting&&a.target.classList.add("aos-animate")})},{threshold:.1,rootMargin:"0px 0px -50px 0px"});e.forEach(r=>t.observe(r))}}class d{static setItem(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(r){console.error("Error saving to localStorage:",r)}}static getItem(e){try{const t=localStorage.getItem(e);return t?JSON.parse(t):null}catch(t){return console.error("Error reading from localStorage:",t),null}}static removeItem(e){try{localStorage.removeItem(e)}catch(t){console.error("Error removing from localStorage:",t)}}}class v{static debounce(e,t){let r;return(...a)=>{clearTimeout(r),r=setTimeout(()=>e.apply(this,a),t)}}static throttle(e,t){let r;return(...a)=>{r||(e.apply(this,a),r=!0,setTimeout(()=>r=!1,t))}}}class C{constructor(){this.isMenuOpen=!1,this.navbar=i.querySelector("#navbar"),this.navToggle=i.querySelector("#nav-toggle"),this.navMenu=i.querySelector("#nav-menu"),this.navLinks=i.querySelectorAll(".nav-link"),this.init()}init(){this.setupScrollEffect(),this.setupMobileMenu(),this.setupSmoothScrolling(),this.setupActiveNavigation()}setupScrollEffect(){const e=v.throttle(()=>{this.navbar&&(window.scrollY>100?this.navbar.classList.add("scrolled"):this.navbar.classList.remove("scrolled"))},16);window.addEventListener("scroll",e)}setupMobileMenu(){!this.navToggle||!this.navMenu||(this.navToggle.addEventListener("click",()=>{this.toggleMobileMenu()}),this.navLinks.forEach(e=>{e.addEventListener("click",()=>{this.closeMobileMenu()})}),document.addEventListener("click",e=>{var r;const t=e.target;!((r=this.navbar)!=null&&r.contains(t))&&this.isMenuOpen&&this.closeMobileMenu()}))}toggleMobileMenu(){!this.navMenu||!this.navToggle||(this.isMenuOpen=!this.isMenuOpen,this.navMenu.classList.toggle("active",this.isMenuOpen),this.navToggle.classList.toggle("active",this.isMenuOpen))}closeMobileMenu(){!this.navMenu||!this.navToggle||(this.isMenuOpen=!1,this.navMenu.classList.remove("active"),this.navToggle.classList.remove("active"))}setupSmoothScrolling(){this.navLinks.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const r=e.getAttribute("href");if(r&&r.startsWith("#")){const a=i.querySelector(r);if(a){const s=a.offsetTop-80;window.scrollTo({top:s,behavior:"smooth"})}}})})}setupActiveNavigation(){const e=v.throttle(()=>{let t="";i.querySelectorAll("section").forEach(a=>{const s=a.offsetTop-100,o=a.clientHeight;window.scrollY>=s&&window.scrollY<s+o&&(t="#"+a.getAttribute("id"))}),this.updateActiveLink(t)},16);window.addEventListener("scroll",e)}updateActiveLink(e){this.navLinks.forEach(t=>{t.classList.remove("active"),t.getAttribute("href")===e&&t.classList.add("active")})}scrollToSection(e){const t=i.querySelector(e);if(t){const r=t.offsetTop-80;window.scrollTo({top:r,behavior:"smooth"})}}}class h{constructor(){this.container=this.createContainer()}createContainer(){let e=i.querySelector("#notification-container");return e||(e=i.createElement("div",{attributes:{id:"notification-container"},className:"notification-container"}),e.style.cssText=`
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        pointer-events: none;
      `,document.body.appendChild(e)),e}show(e){const{message:t,type:r,duration:a=5e3}=e;this.clearAll();const s=this.createNotification(t,r);this.container.appendChild(s),setTimeout(()=>{s.style.transform="translateX(0)",s.style.opacity="1"},100);const o=setTimeout(()=>{this.remove(s)},a),c=s.querySelector(".notification-close");c&&c.addEventListener("click",()=>{clearTimeout(o),this.remove(s)})}createNotification(e,t){const r=i.createElement("div",{className:`notification notification-${t}`}),a={success:"fa-check-circle",error:"fa-exclamation-circle",info:"fa-info-circle"},s={success:"#10b981",error:"#ef4444",info:"#3b82f6"};r.innerHTML=`
      <div class="notification-content">
        <i class="fas ${a[t]}"></i>
        <span>${e}</span>
        <button class="notification-close">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `,r.style.cssText=`
      background: ${s[t]};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      transform: translateX(100%);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
      max-width: 400px;
      margin-bottom: 1rem;
      pointer-events: auto;
    `;const o=r.querySelector(".notification-content");o&&(o.style.cssText=`
        display: flex;
        align-items: center;
        gap: 0.75rem;
      `);const c=r.querySelector(".notification-close");return c&&(c.style.cssText=`
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.2s ease;
      `,c.addEventListener("mouseenter",()=>{c.style.opacity="1"}),c.addEventListener("mouseleave",()=>{c.style.opacity="0.8"})),r}remove(e){e.style.transform="translateX(100%)",e.style.opacity="0",setTimeout(()=>{e.parentNode&&e.parentNode.removeChild(e)},300)}clearAll(){this.container.querySelectorAll(".notification").forEach(t=>{this.remove(t)})}}class L{constructor(){this.form=i.querySelector("#contactForm"),this.notificationManager=new h,this.init()}init(){this.form&&(this.setupFormSubmission(),this.setupFieldEnhancements())}setupFormSubmission(){this.form&&this.form.addEventListener("submit",async e=>{e.preventDefault(),await this.handleSubmit()})}async handleSubmit(){if(!this.form)return;const e=this.validateRecaptcha();if(!e.isValid){this.notificationManager.show({message:e.message,type:"error"});return}const t=this.getFormData(),r=this.validateForm(t);if(!r.isValid){this.notificationManager.show({message:r.message,type:"error"});return}const a=this.form.querySelector('button[type="submit"]');if(!a)return;const s=a.innerHTML;try{a.innerHTML='<i class="fas fa-spinner fa-spin"></i> Enviando...',a.disabled=!0,await this.simulateSubmission(t),this.notificationManager.show({message:"¡Mensaje enviado exitosamente! Me pondré en contacto contigo pronto.",type:"success"}),this.form.reset(),this.resetFieldStates(),window.grecaptcha&&window.grecaptcha.reset()}catch{this.notificationManager.show({message:"Error al enviar el mensaje. Por favor, intenta nuevamente.",type:"error"})}finally{a.innerHTML=s,a.disabled=!1}}getFormData(){if(!this.form)throw new Error("Form not found");const e=new FormData(this.form);return{nombre:e.get("nombre")||"",email:e.get("email")||"",empresa:e.get("empresa")||"",presupuesto:e.get("presupuesto")||"",servicio:e.get("servicio")||"",mensaje:e.get("mensaje")||""}}validateRecaptcha(){return window.grecaptcha?window.grecaptcha.getResponse()?(this.hideRecaptchaError(),{isValid:!0,message:""}):(this.showRecaptchaError(),{isValid:!1,message:"Por favor, completa la verificación reCAPTCHA."}):{isValid:!1,message:"reCAPTCHA no está disponible. Por favor, recarga la página."}}showRecaptchaError(){const e=i.querySelector("#recaptcha-error");e&&(e.style.display="block");const t=i.querySelector(".g-recaptcha");t&&(t.style.border="2px solid #ef4444",t.style.borderRadius="4px")}hideRecaptchaError(){const e=i.querySelector("#recaptcha-error");e&&(e.style.display="none");const t=i.querySelector(".g-recaptcha");t&&(t.style.border="none")}validateForm(e){return m.isRequired(e.nombre)?m.isRequired(e.email)?m.isValidEmail(e.email)?m.isRequired(e.servicio)?m.isRequired(e.mensaje)?m.minLength(e.mensaje,10)?{isValid:!0,message:""}:{isValid:!1,message:"El mensaje debe tener al menos 10 caracteres."}:{isValid:!1,message:"El mensaje es requerido."}:{isValid:!1,message:"Por favor, selecciona un servicio."}:{isValid:!1,message:"Por favor, ingresa un email válido."}:{isValid:!1,message:"El email es requerido."}:{isValid:!1,message:"El nombre es requerido."}}async simulateSubmission(e){return new Promise(t=>{setTimeout(()=>{console.log("Form submitted with data:",e),t()},2e3)})}setupFieldEnhancements(){i.querySelectorAll("input, select, textarea").forEach(t=>{var r;t.addEventListener("focus",()=>{var a;(a=t.parentElement)==null||a.classList.add("focused")}),t.addEventListener("blur",()=>{var a;t.value||(a=t.parentElement)==null||a.classList.remove("focused")}),t.value&&((r=t.parentElement)==null||r.classList.add("focused"))})}resetFieldStates(){i.querySelectorAll(".form-group").forEach(t=>{t.classList.remove("focused")}),this.hideRecaptchaError()}}class P{constructor(){this.selectedService=null,this.serviceCards=i.querySelectorAll(".service-card"),this.notificationManager=new h,this.init()}init(){this.setupServiceSelection(),this.setupServiceInteractions(),this.loadSelectedService()}setupServiceSelection(){this.serviceCards.forEach(e=>{e.addEventListener("click",()=>{this.selectService(e)})})}selectService(e){var r;this.serviceCards.forEach(a=>a.classList.remove("selected")),e.classList.add("selected");const t=((r=e.querySelector("h3"))==null?void 0:r.textContent)||"";this.selectedService=t,d.setItem("selectedService",this.selectedService),this.prefillContactForm(t),this.notificationManager.show({message:`Servicio seleccionado: ${t}. ¡Contáctame para más detalles!`,type:"info",duration:3e3})}prefillContactForm(e){var s;const t=i.querySelector("#servicio");if(!t)return;const a={"Desarrollo Web Full-Stack":"web","Desarrollo de Aplicaciones Móviles":"mobile","Consultoría y Arquitectura":"consultoria","Sistemas de Base de Datos":"database","Seguridad y DevOps":"devops","Capacitación Técnica":"capacitacion"}[e];a&&(t.value=a,(s=t.parentElement)==null||s.classList.add("focused"))}setupServiceInteractions(){this.serviceCards.forEach(e=>{e.addEventListener("mouseenter",()=>{e.classList.contains("selected")||(e.style.transform="translateY(-10px) scale(1.02)")}),e.addEventListener("mouseleave",()=>{e.classList.contains("selected")||(e.style.transform="translateY(0) scale(1)")})})}loadSelectedService(){const e=d.getItem("selectedService");e&&this.serviceCards.forEach(t=>{var a;(((a=t.querySelector("h3"))==null?void 0:a.textContent)||"")===e&&(t.classList.add("selected"),this.selectedService=e)})}getSelectedService(){return this.selectedService}clearSelection(){this.serviceCards.forEach(e=>e.classList.remove("selected")),this.selectedService=null,d.removeItem("selectedService")}}class q{constructor(){this.statsAnimated=!1,this.animatedElements=i.querySelectorAll("[data-aos]"),this.init()}init(){this.setupScrollAnimations(),this.setupStatsAnimation(),this.setupParallaxEffect(),this.setupTypingEffect()}setupScrollAnimations(){y.animateOnScroll(this.animatedElements)}setupStatsAnimation(){const e=i.querySelectorAll(".stat-number"),t=v.throttle(()=>{this.statsAnimated||e.forEach(r=>{r.getBoundingClientRect().top<window.innerHeight&&!r.classList.contains("animated")&&this.animateCounter(r)})},100);window.addEventListener("scroll",t)}animateCounter(e){var c;const t=parseInt(((c=e.textContent)==null?void 0:c.replace(/\D/g,""))||"0"),a=t/(2e3/16);let s=0;e.classList.add("animated");const o=()=>{s<t?(s+=a,s>t&&(s=t),e.textContent=Math.floor(s)+"+",requestAnimationFrame(o)):this.statsAnimated=!0};o()}setupParallaxEffect(){const e=i.querySelectorAll(".bg-shape"),t=v.throttle(()=>{const r=window.pageYOffset,a=r*-.5;e.forEach((s,o)=>{const c=(o+1)*.2;s.style.transform=`translateY(${a*c}px) rotate(${r*.1}deg)`})},16);window.addEventListener("scroll",t)}setupTypingEffect(){const e=i.querySelector(".title-highlight");if(!e)return;const t=e.textContent||"";e.textContent="",e.style.borderRight="2px solid var(--primary-color)";let r=0;const a=()=>{r<t.length?(e.textContent+=t.charAt(r),r++,setTimeout(a,100)):setTimeout(()=>{e.style.borderRight="none"},1e3)};setTimeout(a,1e3)}animateElement(e,t){switch(t){case"fadeIn":y.fadeIn(e);break;case"slideUp":y.slideUp(e);break}}resetAnimations(){this.statsAnimated=!1,i.querySelectorAll(".stat-number.animated").forEach(t=>{t.classList.remove("animated")})}}class A{constructor(){this.items=[],this.notificationManager=new h,this.cartButton=i.querySelector("#cart-button"),this.cartModal=i.querySelector("#cart-modal"),this.cartCount=i.querySelector("#cart-count"),this.loadCart(),this.init()}init(){this.setupCartButton(),this.setupCartModal(),this.setupReorderListener(),this.updateCartDisplay()}setupCartButton(){this.cartButton&&this.cartButton.addEventListener("click",()=>{this.toggleCartModal()})}setupCartModal(){if(!this.cartModal)return;this.cartModal.addEventListener("click",t=>{t.target===this.cartModal&&this.closeCartModal()});const e=this.cartModal.querySelector(".cart-close");e&&e.addEventListener("click",()=>{this.closeCartModal()})}addItem(e,t=1,r){const a=this.items.find(s=>s.product.id===e.id);a?(a.quantity+=t,r&&(a.customizations=r)):this.items.push({product:e,quantity:t,customizations:r}),this.saveCart(),this.updateCartDisplay(),this.notificationManager.show({message:`${e.name} agregado al carrito`,type:"success",duration:3e3})}removeItem(e){this.items=this.items.filter(t=>t.product.id!==e),this.saveCart(),this.updateCartDisplay()}updateQuantity(e,t){const r=this.items.find(a=>a.product.id===e);r&&(t<=0?this.removeItem(e):(r.quantity=t,this.saveCart(),this.updateCartDisplay()))}getItems(){return[...this.items]}getTotalAmount(){return this.items.reduce((e,t)=>e+t.product.price*t.quantity,0)}getItemCount(){return this.items.reduce((e,t)=>e+t.quantity,0)}clearCart(){this.items=[],this.saveCart(),this.updateCartDisplay()}toggleCartModal(){this.cartModal&&(this.cartModal.classList.contains("active")?this.closeCartModal():this.openCartModal())}openCartModal(){if(!this.cartModal)return;!d.getItem("currentUser")&&this.items.length>0&&this.notificationManager.show({message:"Debes iniciar sesión para proceder con la compra.",type:"info"}),this.renderCartItems(),this.cartModal.classList.add("active"),document.body.style.overflow="hidden"}closeCartModal(){this.cartModal&&(this.cartModal.classList.remove("active"),document.body.style.overflow="")}renderCartItems(){const e=i.querySelector("#cart-items"),t=i.querySelector("#cart-total"),r=d.getItem("currentUser");if(!(!e||!t)){if(this.items.length===0){e.innerHTML=`
        <div class="cart-empty">
          <i class="fas fa-shopping-cart"></i>
          <p>Tu carrito está vacío</p>
          <button class="btn btn-primary" onclick="document.getElementById('cart-modal').classList.remove('active')">
            Explorar Servicios
          </button>
        </div>
      `,t.textContent="$0.00 USD";return}e.innerHTML=this.items.map(a=>`
      <div class="cart-item" data-product-id="${a.product.id}">
        <div class="cart-item-info">
          <h4>${a.product.name}</h4>
          <p class="cart-item-price">$${a.product.price.toLocaleString()} ${a.product.currency}</p>
          ${a.customizations?`<p class="cart-item-custom">Personalización: ${a.customizations}</p>`:""}
        </div>
        <div class="cart-item-controls">
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="cart.updateQuantity('${a.product.id}', ${a.quantity-1})">-</button>
            <span class="quantity">${a.quantity}</span>
            <button class="quantity-btn" onclick="cart.updateQuantity('${a.product.id}', ${a.quantity+1})">+</button>
          </div>
          <button class="remove-btn" onclick="cart.removeItem('${a.product.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `).join(""),!r&&this.items.length>0&&(e.innerHTML+=`
        <div class="cart-login-prompt">
          <div class="login-prompt-content">
            <i class="fas fa-info-circle"></i>
            <p>Inicia sesión para proceder con la compra</p>
            <button class="btn btn-primary btn-sm" onclick="document.dispatchEvent(new CustomEvent('showLogin'))">
              Iniciar Sesión
            </button>
          </div>
        </div>
      `),t.textContent=`$${this.getTotalAmount().toLocaleString()} USD`}}updateCartDisplay(){var e;if(this.cartCount){const t=this.getItemCount();this.cartCount.textContent=t.toString(),this.cartCount.style.display=t>0?"block":"none"}(e=this.cartModal)!=null&&e.classList.contains("active")&&this.renderCartItems()}saveCart(){d.setItem("cart",this.items)}loadCart(){const e=d.getItem("cart");e&&(this.items=e)}setupReorderListener(){document.addEventListener("reorderItems",e=>{const{items:t}=e.detail;this.clearCart(),t.forEach(r=>{this.addItem(r.product,r.quantity,r.customizations)})})}}const g=[{id:"web-development",name:"Desarrollo Web Full-Stack",description:"Aplicación web completa con frontend moderno y backend robusto",price:2500,currency:"USD",category:"development",deliveryTime:"4-6 semanas",features:["Frontend responsivo con React/Angular/Vue","Backend con Node.js/Python/Java","Base de datos optimizada","API RESTful completa","Autenticación y autorización","Panel de administración","Hosting y dominio incluido","3 meses de soporte gratuito"],featured:!1},{id:"mobile-app",name:"Aplicación Móvil",description:"App nativa o multiplataforma para iOS y Android",price:3500,currency:"USD",category:"development",deliveryTime:"6-8 semanas",features:["Desarrollo multiplataforma (React Native/Flutter)","Diseño UI/UX optimizado","Integración con APIs","Notificaciones push","Almacenamiento local","Publicación en App Store y Google Play","Documentación completa","6 meses de soporte gratuito"],featured:!0},{id:"consulting",name:"Consultoría Técnica",description:"Asesoría especializada en arquitectura y tecnología",price:150,currency:"USD",category:"consulting",deliveryTime:"1-2 semanas",features:["Auditoría de código y arquitectura","Recomendaciones de mejora","Plan de migración tecnológica","Documentación técnica","Sesiones de mentoría","Revisión de seguridad","Optimización de rendimiento","Seguimiento post-consultoría"],featured:!1},{id:"database-design",name:"Diseño de Base de Datos",description:"Diseño e implementación de bases de datos escalables",price:800,currency:"USD",category:"development",deliveryTime:"2-3 semanas",features:["Modelado de datos optimizado","Implementación SQL/NoSQL","Índices y optimización","Procedimientos almacenados","Sistema de backup","Documentación del esquema","Scripts de migración","Capacitación del equipo"],featured:!1},{id:"devops-setup",name:"Configuración DevOps",description:"Implementación de CI/CD y infraestructura como código",price:1500,currency:"USD",category:"development",deliveryTime:"3-4 semanas",features:["Pipeline CI/CD automatizado","Contenedorización con Docker","Orquestación con Kubernetes","Monitoreo y logging","Infraestructura como código","Automatización de despliegues","Configuración de seguridad","Documentación de procesos"],featured:!1},{id:"technical-training",name:"Capacitación Técnica",description:"Formación personalizada para equipos de desarrollo",price:600,currency:"USD",category:"training",deliveryTime:"1-2 semanas",features:["Workshops personalizados","Material didáctico incluido","Ejercicios prácticos","Evaluación de competencias","Certificado de participación","Sesiones de Q&A","Recursos adicionales","Seguimiento post-capacitación"],featured:!1}];class I{constructor(e){this.currentFilter="all",this.cart=e,this.init()}init(){this.renderProducts(),this.setupFilters(),this.setupProductInteractions()}renderProducts(e="all"){const t=i.querySelector("#services-grid");if(!t)return;let r=g;e!=="all"&&(r=g.filter(a=>a.category===e)),t.innerHTML=r.map(a=>this.createProductCard(a)).join(""),this.setupProductInteractions()}createProductCard(e){return`
      <div class="service-card product-card ${e.featured?"featured":""}" data-product-id="${e.id}">
        ${e.featured?'<div class="featured-badge">Más Popular</div>':""}
        <div class="service-icon">
          <i class="fas ${this.getProductIcon(e.category)}"></i>
        </div>
        <h3>${e.name}</h3>
        <p>${e.description}</p>
        <ul class="service-features">
          ${e.features.slice(0,4).map(t=>`<li>${t}</li>`).join("")}
          ${e.features.length>4?`<li class="more-features">+${e.features.length-4} características más</li>`:""}
        </ul>
        <div class="product-info">
          <div class="service-price">$${e.price.toLocaleString()} ${e.currency}</div>
          <div class="delivery-time">
            <i class="fas fa-clock"></i>
            ${e.deliveryTime}
          </div>
        </div>
        <div class="product-actions">
          <button class="btn btn-secondary view-details-btn" data-product-id="${e.id}">
            <i class="fas fa-info-circle"></i>
            Ver Detalles
          </button>
          <button class="btn btn-primary add-to-cart-btn" data-product-id="${e.id}">
            <i class="fas fa-shopping-cart"></i>
            Agregar al Carrito
          </button>
        </div>
      </div>
    `}getProductIcon(e){return{development:"fa-code",consulting:"fa-lightbulb",training:"fa-graduation-cap"}[e]||"fa-cog"}setupFilters(){const e=i.querySelectorAll(".filter-btn");e.forEach(t=>{t.addEventListener("click",r=>{const a=r.target,s=a.dataset.filter||"all";e.forEach(o=>o.classList.remove("active")),a.classList.add("active"),this.currentFilter=s,this.renderProducts(s)})})}setupProductInteractions(){i.querySelectorAll(".add-to-cart-btn").forEach(r=>{r.addEventListener("click",a=>{var c;const s=a.target,o=s.dataset.productId||((c=s.closest(".add-to-cart-btn"))==null?void 0:c.getAttribute("data-product-id"));o&&this.handleAddToCart(o)})}),i.querySelectorAll(".view-details-btn").forEach(r=>{r.addEventListener("click",a=>{var c;const s=a.target,o=s.dataset.productId||((c=s.closest(".view-details-btn"))==null?void 0:c.getAttribute("data-product-id"));o&&this.showProductDetails(o)})})}handleAddToCart(e){const t=g.find(r=>r.id===e);t&&this.cart.addItem(t)}showProductDetails(e){const t=g.find(s=>s.id===e);if(!t)return;const r=document.createElement("div");r.className="product-modal",r.innerHTML=`
      <div class="product-modal-content">
        <button class="product-modal-close">&times;</button>
        <div class="product-modal-header">
          <div class="product-modal-icon">
            <i class="fas ${this.getProductIcon(t.category)}"></i>
          </div>
          <div>
            <h2>${t.name}</h2>
            <p class="product-modal-price">$${t.price.toLocaleString()} ${t.currency}</p>
          </div>
        </div>
        <div class="product-modal-body">
          <p class="product-description">${t.description}</p>
          <div class="delivery-info">
            <i class="fas fa-clock"></i>
            <span>Tiempo de entrega: ${t.deliveryTime}</span>
          </div>
          <h3>Características incluidas:</h3>
          <ul class="product-features-full">
            ${t.features.map(s=>`<li><i class="fas fa-check"></i>${s}</li>`).join("")}
          </ul>
          <div class="customization-section">
            <h3>Personalización (opcional):</h3>
            <textarea id="product-customization" placeholder="Describe cualquier personalización o requerimiento específico para tu proyecto..."></textarea>
          </div>
        </div>
        <div class="product-modal-footer">
          <button class="btn btn-secondary" onclick="this.closest('.product-modal').remove()">
            Cancelar
          </button>
          <button class="btn btn-primary" onclick="productCatalog.addToCartWithCustomization('${t.id}')">
            <i class="fas fa-shopping-cart"></i>
            Agregar al Carrito
          </button>
        </div>
      </div>
    `,r.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    `,document.body.appendChild(r);const a=r.querySelector(".product-modal-close");a==null||a.addEventListener("click",()=>r.remove()),r.addEventListener("click",s=>{s.target===r&&r.remove()})}addToCartWithCustomization(e){const t=g.find(s=>s.id===e),r=document.getElementById("product-customization"),a=(r==null?void 0:r.value.trim())||void 0;if(t){this.cart.addItem(t,1,a);const s=document.querySelector(".product-modal");s&&s.remove()}}}/*!
 * paypal-js v8.4.2 (2025-09-04T17:21:30.135Z)
 * Copyright 2020-present, PayPal, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(n);a<r.length;a++)e.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(n,r[a])&&(t[r[a]]=n[r[a]]);return t}function x(n,e){var t=document.querySelector('script[src="'.concat(n,'"]'));if(t===null)return null;var r=S(n,e),a=t.cloneNode();if(delete a.dataset.uidAuto,Object.keys(a.dataset).length!==Object.keys(r.dataset).length)return null;var s=!0;return Object.keys(a.dataset).forEach(function(o){a.dataset[o]!==r.dataset[o]&&(s=!1)}),s?t:null}function $(n){var e=n.url,t=n.attributes,r=n.onSuccess,a=n.onError,s=S(e,t);s.onerror=a,s.onload=r,document.head.insertBefore(s,document.head.firstElementChild)}function O(n){var e=n.sdkBaseUrl,t=n.environment,r=T(n,["sdkBaseUrl","environment"]),a=e||N(t),s=r,o=Object.keys(s).filter(function(p){return typeof s[p]<"u"&&s[p]!==null&&s[p]!==""}).reduce(function(p,l){var f=s[l].toString();return l=U(l),l.substring(0,4)==="data"||l==="crossorigin"?p.attributes[l]=f:p.queryParams[l]=f,p},{queryParams:{},attributes:{}}),c=o.queryParams,u=o.attributes;return c["merchant-id"]&&c["merchant-id"].indexOf(",")!==-1&&(u["data-merchant-id"]=c["merchant-id"],c["merchant-id"]="*"),{url:"".concat(a,"?").concat(D(c)),attributes:u}}function U(n){var e=function(t,r){return(r?"-":"")+t.toLowerCase()};return n.replace(/[A-Z]+(?![a-z])|[A-Z]/g,e)}function D(n){var e="";return Object.keys(n).forEach(function(t){e.length!==0&&(e+="&"),e+=t+"="+n[t]}),e}function N(n){return n==="sandbox"?"https://www.sandbox.paypal.com/sdk/js":"https://www.paypal.com/sdk/js"}function S(n,e){e===void 0&&(e={});var t=document.createElement("script");return t.src=n,Object.keys(e).forEach(function(r){t.setAttribute(r,e[r]),r==="data-csp-nonce"&&t.setAttribute("nonce",e["data-csp-nonce"])}),t}function k(n,e){if(e===void 0&&(e=Promise),E(n,e),typeof document>"u")return e.resolve(null);var t=O(n),r=t.url,a=t.attributes,s=a["data-namespace"]||"paypal",o=M(s);return a["data-js-sdk-library"]||(a["data-js-sdk-library"]="paypal-js"),x(r,a)&&o?e.resolve(o):R({url:r,attributes:a},e).then(function(){var c=M(s);if(c)return c;throw new Error("The window.".concat(s," global variable is not available."))})}function R(n,e){e===void 0&&(e=Promise),E(n,e);var t=n.url,r=n.attributes;if(typeof t!="string"||t.length===0)throw new Error("Invalid url.");if(typeof r<"u"&&typeof r!="object")throw new Error("Expected attributes to be an object.");return new e(function(a,s){if(typeof document>"u")return a();$({url:t,attributes:r,onSuccess:function(){return a()},onError:function(){var o=new Error('The script "'.concat(t,'" failed to load. Check the HTTP status code and response body in DevTools to learn more.'));return s(o)}})})}function M(n){return window[n]}function E(n,e){if(typeof n!="object"||n===null)throw new Error("Expected an options object.");var t=n.environment;if(t&&t!=="production"&&t!=="sandbox")throw new Error('The `environment` option must be either "production" or "sandbox".');if(typeof e<"u"&&typeof e!="function")throw new Error("Expected PromisePonyfill to be a function.")}class H{constructor(e){this.paypalLoaded=!1,this.cart=e,this.notificationManager=new h}async initializePayPal(){try{const e=await k({"client-id":"AdCDeuiJ5CP-lnHdJ5NqrXKapjQvwaHYSFfHg4m6oKUxdqo-jC3OaPliaDjpeUE2mPVHNkVDzsnWDLJQ",currency:"USD",intent:"capture"});e&&e.Buttons&&(this.paypalLoaded=!0,this.renderPayPalButtons())}catch(e){console.error("Error loading PayPal SDK:",e),this.notificationManager.show({message:"Error al cargar PayPal. Por favor, intenta más tarde.",type:"error"})}}renderPayPalButtons(){const e=document.getElementById("paypal-button-container");e&&(e.innerHTML="",window.paypal&&window.paypal.Buttons({style:{layout:"vertical",color:"gold",shape:"rect",label:"paypal"},createOrder:(t,r)=>{const a=this.cart.getItems(),s=this.cart.getTotalAmount();return a.length===0?(this.notificationManager.show({message:"Tu carrito está vacío",type:"error"}),Promise.reject("Empty cart")):r.order.create({purchase_units:[{amount:{currency_code:"USD",value:s.toFixed(2),breakdown:{item_total:{currency_code:"USD",value:s.toFixed(2)}}},items:a.map(o=>({name:o.product.name,description:o.product.description,unit_amount:{currency_code:o.product.currency,value:o.product.price.toFixed(2)},quantity:o.quantity.toString(),category:"DIGITAL_GOODS"}))}],application_context:{shipping_preference:"NO_SHIPPING"}})},onApprove:async(t,r)=>{try{const a=await r.order.capture();await this.handleSuccessfulPayment(a)}catch(a){console.error("Error capturing payment:",a),this.notificationManager.show({message:"Error al procesar el pago. Por favor, contacta soporte.",type:"error"})}},onError:t=>{console.error("PayPal error:",t),this.notificationManager.show({message:"Error en el procesamiento del pago. Por favor, intenta nuevamente.",type:"error"})},onCancel:t=>{this.notificationManager.show({message:"Pago cancelado por el usuario.",type:"info"})}}).render("#paypal-button-container"))}async handleSuccessfulPayment(e){try{const t=d.getItem("currentUser");if(!t){this.notificationManager.show({message:"Debes iniciar sesión para completar la compra.",type:"error"});return}const r={paypalOrderId:e.id,userId:t.id,items:this.cart.getItems(),totalAmount:this.cart.getTotalAmount(),status:e.status,timestamp:new Date().toISOString()};await this.sendOrderToBackend(r);const a=new CustomEvent("createOrder",{detail:{items:this.cart.getItems(),totalAmount:this.cart.getTotalAmount(),paypalOrderId:e.id}});document.dispatchEvent(a),this.showSuccessModal(e),this.cart.clearCart()}catch(t){console.error("Error handling successful payment:",t),this.notificationManager.show({message:"Pago procesado, pero hubo un error al guardar el pedido. Te contactaremos pronto.",type:"warning"})}}async sendOrderToBackend(e){return new Promise(t=>{setTimeout(()=>{console.log("Order sent to backend:",e),t()},1e3)})}showSuccessModal(e){const t=d.getItem("currentUser"),r=document.createElement("div");r.className="success-modal",r.innerHTML=`
      <div class="success-modal-content">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h2>¡Pago Exitoso!</h2>
        <p>Hola ${(t==null?void 0:t.firstName)||"Cliente"}, tu pedido ha sido procesado correctamente.</p>
        <div class="order-details">
          <p><strong>ID de Transacción:</strong> ${e.id}</p>
          <p><strong>Total:</strong> $${this.cart.getTotalAmount().toLocaleString()} USD</p>
        </div>
        <p class="success-message">
          Te contactaremos dentro de las próximas 24 horas para coordinar los detalles del proyecto.
          Puedes revisar el estado de tu pedido en "Mis Compras".
        </p>
        <div class="success-actions">
          <button class="btn btn-secondary" onclick="this.parentElement.parentElement.remove()">
            Continuar Comprando
          </button>
          <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove(); document.dispatchEvent(new CustomEvent('showOrders'))">
            Ver Mis Compras
          </button>
        </div>
      </div>
    `,r.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    `,document.body.appendChild(r),setTimeout(()=>{r.parentElement&&r.remove()},15e3)}isLoaded(){return this.paypalLoaded}}class z{constructor(){this.currentUser=null,this.loginModal=null,this.registerModal=null,this.notificationManager=new h,this.loadCurrentUser(),this.init()}init(){this.createAuthModals(),this.setupAuthButtons(),this.updateAuthUI()}createAuthModals(){this.createLoginModal(),this.createRegisterModal()}createLoginModal(){const e=i.createElement("div",{attributes:{id:"login-modal"},className:"auth-modal"});e.innerHTML=`
      <div class="auth-modal-content">
        <div class="auth-modal-header">
          <h2><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</h2>
          <button class="auth-modal-close">&times;</button>
        </div>
        <form class="auth-form" id="login-form">
          <div class="form-group">
            <label for="login-email">Email</label>
            <input type="email" id="login-email" name="email" required>
          </div>
          <div class="form-group">
            <label for="login-password">Contraseña</label>
            <input type="password" id="login-password" name="password" required>
          </div>
          <div class="form-group">
            <div id="login-recaptcha-container" class="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"></div>
            <div id="login-recaptcha-error" class="error-message" style="display: none;">
              Por favor, completa la verificación reCAPTCHA
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-full">
            <i class="fas fa-sign-in-alt"></i>
            Iniciar Sesión
          </button>
        </form>
        <div class="auth-footer">
          <p>¿No tienes cuenta? <a href="#" id="show-register">Regístrate aquí</a></p>
        </div>
      </div>
    `,document.body.appendChild(e),this.loginModal=e,this.setupLoginForm()}createRegisterModal(){const e=i.createElement("div",{attributes:{id:"register-modal"},className:"auth-modal"});e.innerHTML=`
      <div class="auth-modal-content">
        <div class="auth-modal-header">
          <h2><i class="fas fa-user-plus"></i> Crear Cuenta</h2>
          <button class="auth-modal-close">&times;</button>
        </div>
        <form class="auth-form" id="register-form">
          <div class="form-row">
            <div class="form-group">
              <label for="register-firstName">Nombre</label>
              <input type="text" id="register-firstName" name="firstName" required>
            </div>
            <div class="form-group">
              <label for="register-lastName">Apellido</label>
              <input type="text" id="register-lastName" name="lastName" required>
            </div>
          </div>
          <div class="form-group">
            <label for="register-email">Email</label>
            <input type="email" id="register-email" name="email" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="register-password">Contraseña</label>
              <input type="password" id="register-password" name="password" required minlength="6">
            </div>
            <div class="form-group">
              <label for="register-confirmPassword">Confirmar Contraseña</label>
              <input type="password" id="register-confirmPassword" name="confirmPassword" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="register-company">Empresa (opcional)</label>
              <input type="text" id="register-company" name="company">
            </div>
            <div class="form-group">
              <label for="register-phone">Teléfono (opcional)</label>
              <input type="tel" id="register-phone" name="phone">
            </div>
          </div>
          <div class="form-group">
            <div id="register-recaptcha-container" class="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"></div>
            <div id="register-recaptcha-error" class="error-message" style="display: none;">
              Por favor, completa la verificación reCAPTCHA
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-full">
            <i class="fas fa-user-plus"></i>
            Crear Cuenta
          </button>
        </form>
        <div class="auth-footer">
          <p>¿Ya tienes cuenta? <a href="#" id="show-login">Inicia sesión aquí</a></p>
        </div>
      </div>
    `,document.body.appendChild(e),this.registerModal=e,this.setupRegisterForm()}setupAuthButtons(){const e=i.querySelector(".nav-actions");if(e){const t=i.createElement("div",{className:"auth-buttons"});t.innerHTML=`
        <div id="auth-guest" class="auth-guest">
          <button id="login-btn" class="btn btn-secondary">
            <i class="fas fa-sign-in-alt"></i>
            Iniciar Sesión
          </button>
          <button id="register-btn" class="btn btn-primary">
            <i class="fas fa-user-plus"></i>
            Registrarse
          </button>
        </div>
        <div id="auth-user" class="auth-user" style="display: none;">
          <div class="user-menu">
            <button id="user-menu-btn" class="user-menu-btn">
              <i class="fas fa-user-circle"></i>
              <span id="user-name"></span>
              <i class="fas fa-chevron-down"></i>
            </button>
            <div class="user-dropdown" id="user-dropdown">
              <a href="#" id="profile-btn">
                <i class="fas fa-user"></i>
                Mi Perfil
              </a>
              <a href="#" id="orders-btn">
                <i class="fas fa-shopping-bag"></i>
                Mis Compras
              </a>
              <a href="#" id="logout-btn">
                <i class="fas fa-sign-out-alt"></i>
                Cerrar Sesión
              </a>
            </div>
          </div>
        </div>
      `,e.insertBefore(t,e.firstChild),this.setupAuthButtonEvents()}}setupAuthButtonEvents(){const e=i.querySelector("#login-btn");e==null||e.addEventListener("click",()=>this.showLoginModal());const t=i.querySelector("#register-btn");t==null||t.addEventListener("click",()=>this.showRegisterModal());const r=i.querySelector("#user-menu-btn"),a=i.querySelector("#user-dropdown");r==null||r.addEventListener("click",()=>{a==null||a.classList.toggle("active")});const s=i.querySelector("#profile-btn");s==null||s.addEventListener("click",l=>{l.preventDefault(),this.showProfileModal()});const o=i.querySelector("#orders-btn");o==null||o.addEventListener("click",l=>{l.preventDefault(),this.showOrdersModal()});const c=i.querySelector("#logout-btn");c==null||c.addEventListener("click",l=>{l.preventDefault(),this.logout()});const u=i.querySelector("#show-register");u==null||u.addEventListener("click",l=>{l.preventDefault(),this.hideLoginModal(),this.showRegisterModal()});const p=i.querySelector("#show-login");p==null||p.addEventListener("click",l=>{l.preventDefault(),this.hideRegisterModal(),this.showLoginModal()}),document.addEventListener("click",l=>{const f=l.target;!(r!=null&&r.contains(f))&&!(a!=null&&a.contains(f))&&(a==null||a.classList.remove("active"))})}setupLoginForm(){const e=i.querySelector("#login-form");e&&(e.addEventListener("submit",async t=>{t.preventDefault(),await this.handleLogin()}),this.setupModalCloseEvents(this.loginModal))}setupRegisterForm(){const e=i.querySelector("#register-form");e&&(e.addEventListener("submit",async t=>{t.preventDefault(),await this.handleRegister()}),this.setupModalCloseEvents(this.registerModal))}setupModalCloseEvents(e){if(!e)return;const t=e.querySelector(".auth-modal-close");t==null||t.addEventListener("click",()=>this.hideAllModals()),e.addEventListener("click",r=>{r.target===e&&this.hideAllModals()})}async handleLogin(){const e=i.querySelector("#login-form");if(!e)return;const t=this.validateRecaptcha("login-recaptcha-error");if(!t.isValid){this.notificationManager.show({message:t.message,type:"error"});return}const r=this.getLoginFormData(),a=this.validateLoginForm(r);if(!a.isValid){this.notificationManager.show({message:a.message,type:"error"});return}const s=e.querySelector('button[type="submit"]'),o=s.innerHTML;try{s.innerHTML='<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...',s.disabled=!0;const c=await this.authenticateUser(r.email,r.password);c?(this.setCurrentUser(c),this.hideAllModals(),this.notificationManager.show({message:`¡Bienvenido de vuelta, ${c.firstName}!`,type:"success"})):this.notificationManager.show({message:"Email o contraseña incorrectos.",type:"error"})}catch{this.notificationManager.show({message:"Error al iniciar sesión. Intenta nuevamente.",type:"error"})}finally{s.innerHTML=o,s.disabled=!1}}async handleRegister(){const e=i.querySelector("#register-form");if(!e)return;const t=this.validateRecaptcha("register-recaptcha-error");if(!t.isValid){this.notificationManager.show({message:t.message,type:"error"});return}const r=this.getRegisterFormData(),a=this.validateRegisterForm(r);if(!a.isValid){this.notificationManager.show({message:a.message,type:"error"});return}const s=e.querySelector('button[type="submit"]'),o=s.innerHTML;try{if(s.innerHTML='<i class="fas fa-spinner fa-spin"></i> Creando cuenta...',s.disabled=!0,this.getUserByEmail(r.email)){this.notificationManager.show({message:"Ya existe una cuenta con este email.",type:"error"});return}const u=await this.createUser(r);this.setCurrentUser(u),this.hideAllModals(),this.notificationManager.show({message:`¡Cuenta creada exitosamente! Bienvenido, ${u.firstName}!`,type:"success"})}catch{this.notificationManager.show({message:"Error al crear la cuenta. Intenta nuevamente.",type:"error"})}finally{s.innerHTML=o,s.disabled=!1}}validateRecaptcha(e){return window.grecaptcha?window.grecaptcha.getResponse()?(this.hideRecaptchaError(e),{isValid:!0,message:""}):(this.showRecaptchaError(e),{isValid:!1,message:"Por favor, completa la verificación reCAPTCHA."}):{isValid:!1,message:"reCAPTCHA no está disponible. Por favor, recarga la página."}}showRecaptchaError(e){const t=i.querySelector(`#${e}`);t&&(t.style.display="block")}hideRecaptchaError(e){const t=i.querySelector(`#${e}`);t&&(t.style.display="none")}getLoginFormData(){const e=i.querySelector("#login-form");if(!e)throw new Error("Login form not found");const t=new FormData(e);return{email:t.get("email")||"",password:t.get("password")||""}}getRegisterFormData(){const e=i.querySelector("#register-form");if(!e)throw new Error("Register form not found");const t=new FormData(e);return{firstName:t.get("firstName")||"",lastName:t.get("lastName")||"",email:t.get("email")||"",password:t.get("password")||"",confirmPassword:t.get("confirmPassword")||"",company:t.get("company")||"",phone:t.get("phone")||""}}validateLoginForm(e){return m.isRequired(e.email)?m.isValidEmail(e.email)?m.isRequired(e.password)?{isValid:!0,message:""}:{isValid:!1,message:"La contraseña es requerida."}:{isValid:!1,message:"Por favor, ingresa un email válido."}:{isValid:!1,message:"El email es requerido."}}validateRegisterForm(e){return m.isRequired(e.firstName)?m.isRequired(e.lastName)?m.isRequired(e.email)?m.isValidEmail(e.email)?m.isRequired(e.password)?m.minLength(e.password,6)?e.password!==e.confirmPassword?{isValid:!1,message:"Las contraseñas no coinciden."}:{isValid:!0,message:""}:{isValid:!1,message:"La contraseña debe tener al menos 6 caracteres."}:{isValid:!1,message:"La contraseña es requerida."}:{isValid:!1,message:"Por favor, ingresa un email válido."}:{isValid:!1,message:"El email es requerido."}:{isValid:!1,message:"El apellido es requerido."}:{isValid:!1,message:"El nombre es requerido."}}async authenticateUser(e,t){await new Promise(s=>setTimeout(s,1e3));const a=this.getAllUsers().find(s=>s.email===e);return a&&t.length>0?(a.lastLogin=new Date().toISOString(),this.updateUser(a),a):null}async createUser(e){await new Promise(r=>setTimeout(r,1500));const t={id:this.generateUserId(),email:e.email,firstName:e.firstName,lastName:e.lastName,company:e.company,phone:e.phone,createdAt:new Date().toISOString(),lastLogin:new Date().toISOString()};return this.saveUser(t),t}generateUserId(){return"user_"+Date.now()+"_"+Math.random().toString(36).substr(2,9)}getAllUsers(){return d.getItem("users")||[]}getUserByEmail(e){return this.getAllUsers().find(r=>r.email===e)||null}saveUser(e){const t=this.getAllUsers(),r=t.findIndex(a=>a.id===e.id);r>=0?t[r]=e:t.push(e),d.setItem("users",t)}updateUser(e){var t;this.saveUser(e),((t=this.currentUser)==null?void 0:t.id)===e.id&&(this.currentUser=e,d.setItem("currentUser",e))}setCurrentUser(e){this.currentUser=e,d.setItem("currentUser",e),this.updateAuthUI()}loadCurrentUser(){const e=d.getItem("currentUser");e&&(this.currentUser=e)}updateAuthUI(){const e=i.querySelector("#auth-guest"),t=i.querySelector("#auth-user"),r=i.querySelector("#user-name");this.currentUser?(e==null||e.style.setProperty("display","none"),t==null||t.style.setProperty("display","block"),r&&(r.textContent=this.currentUser.firstName)):(e==null||e.style.setProperty("display","flex"),t==null||t.style.setProperty("display","none"))}showLoginModal(){this.hideAllModals(),this.loginModal&&(this.loginModal.style.display="flex",document.body.style.overflow="hidden",setTimeout(()=>{window.grecaptcha&&window.grecaptcha.render("login-recaptcha-container")},100))}showRegisterModal(){this.hideAllModals(),this.registerModal&&(this.registerModal.style.display="flex",document.body.style.overflow="hidden",setTimeout(()=>{window.grecaptcha&&window.grecaptcha.render("register-recaptcha-container")},100))}hideLoginModal(){this.loginModal&&(this.loginModal.style.display="none",document.body.style.overflow="")}hideRegisterModal(){this.registerModal&&(this.registerModal.style.display="none",document.body.style.overflow="")}hideAllModals(){this.hideLoginModal(),this.hideRegisterModal(),document.body.style.overflow=""}showProfileModal(){const e=new CustomEvent("showProfile");document.dispatchEvent(e)}showOrdersModal(){const e=new CustomEvent("showOrders");document.dispatchEvent(e)}logout(){this.currentUser=null,d.removeItem("currentUser"),this.updateAuthUI(),this.notificationManager.show({message:"Sesión cerrada exitosamente.",type:"success"})}getCurrentUser(){return this.currentUser}isAuthenticated(){return this.currentUser!==null}requireAuth(){return this.isAuthenticated()?!0:(this.showLoginModal(),this.notificationManager.show({message:"Debes iniciar sesión para continuar.",type:"info"}),!1)}}class F{constructor(){this.ordersModal=null,this.currentPage=1,this.itemsPerPage=5,this.notificationManager=new h,this.init()}init(){this.createOrdersModal(),this.setupEventListeners()}createOrdersModal(){const e=i.createElement("div",{attributes:{id:"orders-modal"},className:"orders-modal"});e.innerHTML=`
      <div class="orders-modal-content">
        <div class="orders-modal-header">
          <h2><i class="fas fa-shopping-bag"></i> Historial de Compras</h2>
          <button class="orders-modal-close">&times;</button>
        </div>
        <div class="orders-modal-body">
          <div class="orders-filters">
            <select id="orders-status-filter" class="filter-select">
              <option value="all">Todos los estados</option>
              <option value="completed">Completadas</option>
              <option value="pending">Pendientes</option>
              <option value="cancelled">Canceladas</option>
              <option value="refunded">Reembolsadas</option>
            </select>
            <select id="orders-sort" class="filter-select">
              <option value="createdAt-desc">Más recientes</option>
              <option value="createdAt-asc">Más antiguas</option>
              <option value="totalAmount-desc">Mayor valor</option>
              <option value="totalAmount-asc">Menor valor</option>
            </select>
          </div>
          <div id="orders-list" class="orders-list">
            <!-- Orders will be rendered here -->
          </div>
          <div id="orders-pagination" class="pagination">
            <!-- Pagination will be rendered here -->
          </div>
        </div>
      </div>
    `,document.body.appendChild(e),this.ordersModal=e,this.setupModalEvents()}setupEventListeners(){document.addEventListener("showOrders",()=>{this.showOrdersModal()})}setupModalEvents(){if(!this.ordersModal)return;const e=this.ordersModal.querySelector(".orders-modal-close");e==null||e.addEventListener("click",()=>this.hideOrdersModal()),this.ordersModal.addEventListener("click",a=>{a.target===this.ordersModal&&this.hideOrdersModal()});const t=i.querySelector("#orders-status-filter"),r=i.querySelector("#orders-sort");t==null||t.addEventListener("change",()=>this.renderOrders()),r==null||r.addEventListener("change",()=>this.renderOrders())}showOrdersModal(){this.ordersModal&&(this.ordersModal.style.display="flex",document.body.style.overflow="hidden",this.currentPage=1,this.renderOrders())}hideOrdersModal(){this.ordersModal&&(this.ordersModal.style.display="none",document.body.style.overflow="")}renderOrders(){const e=i.querySelector("#orders-list");if(!e)return;const t=i.querySelector("#orders-status-filter"),r=i.querySelector("#orders-sort"),a=(t==null?void 0:t.value)||"all",[s,o]=((r==null?void 0:r.value)||"createdAt-desc").split("-"),c={page:this.currentPage,limit:this.itemsPerPage,sortBy:s,sortOrder:o},u=this.getUserOrders(a,c);if(u.data.length===0){e.innerHTML=`
        <div class="orders-empty">
          <i class="fas fa-shopping-bag"></i>
          <h3>No hay compras registradas</h3>
          <p>Cuando realices tu primera compra, aparecerá aquí.</p>
          <button class="btn btn-primary" onclick="document.getElementById('orders-modal').style.display='none'">
            Explorar Servicios
          </button>
        </div>
      `,this.renderPagination(u);return}e.innerHTML=u.data.map(p=>this.createOrderCard(p)).join(""),this.renderPagination(u),this.setupOrderCardEvents()}createOrderCard(e){const t={completed:"fa-check-circle",pending:"fa-clock",cancelled:"fa-times-circle",refunded:"fa-undo"},r={completed:"success",pending:"warning",cancelled:"error",refunded:"info"},a={completed:"Completada",pending:"Pendiente",cancelled:"Cancelada",refunded:"Reembolsada"};return`
      <div class="order-card" data-order-id="${e.id}">
        <div class="order-header">
          <div class="order-info">
            <h4>Orden #${e.id.slice(-8).toUpperCase()}</h4>
            <p class="order-date">
              <i class="fas fa-calendar"></i>
              ${new Date(e.createdAt).toLocaleDateString("es-ES",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}
            </p>
          </div>
          <div class="order-status">
            <span class="status-badge status-${r[e.status]}">
              <i class="fas ${t[e.status]}"></i>
              ${a[e.status]}
            </span>
          </div>
        </div>
        <div class="order-items">
          ${e.items.map(s=>`
            <div class="order-item">
              <div class="item-info">
                <h5>${s.product.name}</h5>
                <p>Cantidad: ${s.quantity}</p>
                ${s.customizations?`<p class="item-customization">Personalización: ${s.customizations}</p>`:""}
              </div>
              <div class="item-price">
                $${(s.product.price*s.quantity).toLocaleString()} ${s.product.currency}
              </div>
            </div>
          `).join("")}
        </div>
        <div class="order-footer">
          <div class="order-total">
            <strong>Total: $${e.totalAmount.toLocaleString()} ${e.currency}</strong>
          </div>
          <div class="order-actions">
            <button class="btn btn-secondary view-order-btn" data-order-id="${e.id}">
              <i class="fas fa-eye"></i>
              Ver Detalles
            </button>
            ${e.status==="completed"?`
              <button class="btn btn-primary reorder-btn" data-order-id="${e.id}">
                <i class="fas fa-redo"></i>
                Volver a Comprar
              </button>
            `:""}
          </div>
        </div>
      </div>
    `}renderPagination(e){const t=i.querySelector("#orders-pagination");if(!t)return;if(e.totalPages<=1){t.innerHTML="";return}const r=[];e.page>1&&r.push(`
        <button class="pagination-btn" data-page="${e.page-1}">
          <i class="fas fa-chevron-left"></i>
        </button>
      `);const a=Math.max(1,e.page-2),s=Math.min(e.totalPages,e.page+2);a>1&&(r.push('<button class="pagination-btn" data-page="1">1</button>'),a>2&&r.push('<span class="pagination-ellipsis">...</span>'));for(let c=a;c<=s;c++)r.push(`
        <button class="pagination-btn ${c===e.page?"active":""}" data-page="${c}">
          ${c}
        </button>
      `);s<e.totalPages&&(s<e.totalPages-1&&r.push('<span class="pagination-ellipsis">...</span>'),r.push(`<button class="pagination-btn" data-page="${e.totalPages}">${e.totalPages}</button>`)),e.page<e.totalPages&&r.push(`
        <button class="pagination-btn" data-page="${e.page+1}">
          <i class="fas fa-chevron-right"></i>
        </button>
      `),t.innerHTML=`
      <div class="pagination-info">
        Mostrando ${(e.page-1)*e.limit+1}-${Math.min(e.page*e.limit,e.total)} de ${e.total} compras
      </div>
      <div class="pagination-buttons">
        ${r.join("")}
      </div>
    `,t.querySelectorAll(".pagination-btn").forEach(c=>{c.addEventListener("click",u=>{const p=u.target,l=parseInt(p.dataset.page||"1");this.currentPage=l,this.renderOrders()})})}setupOrderCardEvents(){i.querySelectorAll(".view-order-btn").forEach(r=>{r.addEventListener("click",a=>{var c;const s=a.target,o=s.dataset.orderId||((c=s.closest(".view-order-btn"))==null?void 0:c.getAttribute("data-order-id"));o&&this.showOrderDetails(o)})}),i.querySelectorAll(".reorder-btn").forEach(r=>{r.addEventListener("click",a=>{var c;const s=a.target,o=s.dataset.orderId||((c=s.closest(".reorder-btn"))==null?void 0:c.getAttribute("data-order-id"));o&&this.reorder(o)})})}getUserOrders(e,t){const r=d.getItem("currentUser");if(!r)return{data:[],total:0,page:t.page,limit:t.limit,totalPages:0};let a=this.getAllOrders().filter(l=>l.userId===r.id);e!=="all"&&(a=a.filter(l=>l.status===e)),t.sortBy&&a.sort((l,f)=>{const b=l[t.sortBy],w=f[t.sortBy];return t.sortOrder==="desc"?w>b?1:-1:b>w?1:-1});const s=a.length,o=Math.ceil(s/t.limit),c=(t.page-1)*t.limit,u=c+t.limit;return{data:a.slice(c,u),total:s,page:t.page,limit:t.limit,totalPages:o}}getAllOrders(){return d.getItem("orders")||[]}showOrderDetails(e){const t=this.getOrderById(e);if(!t)return;const r=document.createElement("div");r.className="order-details-modal",r.innerHTML=`
      <div class="order-details-content">
        <div class="order-details-header">
          <h2>Detalles de la Orden #${t.id.slice(-8).toUpperCase()}</h2>
          <button class="order-details-close">&times;</button>
        </div>
        <div class="order-details-body">
          <div class="order-summary">
            <div class="summary-item">
              <label>Estado:</label>
              <span class="status-badge status-${this.getStatusColor(t.status)}">
                ${this.getStatusLabel(t.status)}
              </span>
            </div>
            <div class="summary-item">
              <label>Fecha de compra:</label>
              <span>${new Date(t.createdAt).toLocaleDateString("es-ES",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</span>
            </div>
            ${t.completedAt?`
              <div class="summary-item">
                <label>Fecha de completado:</label>
                <span>${new Date(t.completedAt).toLocaleDateString("es-ES",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</span>
              </div>
            `:""}
            <div class="summary-item">
              <label>Total:</label>
              <span class="order-total-amount">$${t.totalAmount.toLocaleString()} ${t.currency}</span>
            </div>
            ${t.paypalOrderId?`
              <div class="summary-item">
                <label>ID de PayPal:</label>
                <span class="paypal-id">${t.paypalOrderId}</span>
              </div>
            `:""}
          </div>
          
          <div class="order-items-detail">
            <h3>Servicios Contratados</h3>
            ${t.items.map(s=>`
              <div class="order-item-detail">
                <div class="item-header">
                  <h4>${s.product.name}</h4>
                  <span class="item-price">$${s.product.price.toLocaleString()} ${s.product.currency}</span>
                </div>
                <p class="item-description">${s.product.description}</p>
                <div class="item-meta">
                  <span class="item-quantity">Cantidad: ${s.quantity}</span>
                  <span class="item-delivery">Entrega: ${s.product.deliveryTime}</span>
                </div>
                ${s.customizations?`
                  <div class="item-customizations">
                    <h5>Personalizaciones:</h5>
                    <p>${s.customizations}</p>
                  </div>
                `:""}
                <div class="item-features">
                  <h5>Características incluidas:</h5>
                  <ul>
                    ${s.product.features.map(o=>`<li>${o}</li>`).join("")}
                  </ul>
                </div>
              </div>
            `).join("")}
          </div>

          ${t.notes?`
            <div class="order-notes">
              <h3>Notas adicionales</h3>
              <p>${t.notes}</p>
            </div>
          `:""}
        </div>
        <div class="order-details-footer">
          <button class="btn btn-secondary" onclick="this.closest('.order-details-modal').remove()">
            Cerrar
          </button>
          ${t.status==="completed"?`
            <button class="btn btn-primary" onclick="orderManager.reorder('${t.id}'); this.closest('.order-details-modal').remove();">
              <i class="fas fa-redo"></i>
              Volver a Comprar
            </button>
          `:""}
        </div>
      </div>
    `,r.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10001;
    `,document.body.appendChild(r);const a=r.querySelector(".order-details-close");a==null||a.addEventListener("click",()=>r.remove()),r.addEventListener("click",s=>{s.target===r&&r.remove()})}reorder(e){const t=this.getOrderById(e);if(!t)return;const r=new CustomEvent("reorderItems",{detail:{items:t.items}});document.dispatchEvent(r),this.notificationManager.show({message:"Productos agregados al carrito exitosamente.",type:"success"})}getOrderById(e){return this.getAllOrders().find(r=>r.id===e)||null}getStatusColor(e){return{completed:"success",pending:"warning",cancelled:"error",refunded:"info"}[e]}getStatusLabel(e){return{completed:"Completada",pending:"Pendiente",cancelled:"Cancelada",refunded:"Reembolsada"}[e]}createOrder(e,t,r){const a=d.getItem("currentUser");if(!a)throw new Error("User must be logged in to create order");const s={id:this.generateOrderId(),userId:a.id,items:e,totalAmount:t,currency:"USD",status:"completed",paypalOrderId:r,createdAt:new Date().toISOString(),completedAt:new Date().toISOString()};return this.saveOrder(s),s}generateOrderId(){return"order_"+Date.now()+"_"+Math.random().toString(36).substr(2,9)}saveOrder(e){const t=this.getAllOrders();t.push(e),d.setItem("orders",t)}}class j{constructor(){this.profileModal=null,this.notificationManager=new h,this.init()}init(){this.createProfileModal(),this.setupEventListeners()}createProfileModal(){const e=i.createElement("div",{attributes:{id:"profile-modal"},className:"profile-modal"});e.innerHTML=`
      <div class="profile-modal-content">
        <div class="profile-modal-header">
          <h2><i class="fas fa-user"></i> Mi Perfil</h2>
          <button class="profile-modal-close">&times;</button>
        </div>
        <div class="profile-modal-body">
          <form class="profile-form" id="profile-form">
            <div class="profile-section">
              <h3>Información Personal</h3>
              <div class="form-row">
                <div class="form-group">
                  <label for="profile-firstName">Nombre</label>
                  <input type="text" id="profile-firstName" name="firstName" required>
                </div>
                <div class="form-group">
                  <label for="profile-lastName">Apellido</label>
                  <input type="text" id="profile-lastName" name="lastName" required>
                </div>
              </div>
              <div class="form-group">
                <label for="profile-email">Email</label>
                <input type="email" id="profile-email" name="email" required readonly>
                <small class="form-help">El email no se puede modificar</small>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="profile-company">Empresa</label>
                  <input type="text" id="profile-company" name="company">
                </div>
                <div class="form-group">
                  <label for="profile-phone">Teléfono</label>
                  <input type="tel" id="profile-phone" name="phone">
                </div>
              </div>
            </div>

            <div class="profile-section">
              <h3>Dirección</h3>
              <div class="form-group">
                <label for="profile-street">Dirección</label>
                <input type="text" id="profile-street" name="street">
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="profile-city">Ciudad</label>
                  <input type="text" id="profile-city" name="city">
                </div>
                <div class="form-group">
                  <label for="profile-state">Estado/Provincia</label>
                  <input type="text" id="profile-state" name="state">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="profile-zipCode">Código Postal</label>
                  <input type="text" id="profile-zipCode" name="zipCode">
                </div>
                <div class="form-group">
                  <label for="profile-country">País</label>
                  <select id="profile-country" name="country">
                    <option value="">Seleccionar país</option>
                    <option value="MX">México</option>
                    <option value="US">Estados Unidos</option>
                    <option value="CA">Canadá</option>
                    <option value="ES">España</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="PE">Perú</option>
                    <option value="CL">Chile</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="profile-section">
              <h3>Cambiar Contraseña</h3>
              <div class="form-group">
                <label for="profile-currentPassword">Contraseña Actual</label>
                <input type="password" id="profile-currentPassword" name="currentPassword">
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="profile-newPassword">Nueva Contraseña</label>
                  <input type="password" id="profile-newPassword" name="newPassword" minlength="6">
                </div>
                <div class="form-group">
                  <label for="profile-confirmNewPassword">Confirmar Nueva Contraseña</label>
                  <input type="password" id="profile-confirmNewPassword" name="confirmNewPassword">
                </div>
              </div>
            </div>

            <div class="profile-actions">
              <button type="button" class="btn btn-secondary" onclick="document.getElementById('profile-modal').style.display='none'">
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary">
                <i class="fas fa-save"></i>
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    `,document.body.appendChild(e),this.profileModal=e,this.setupProfileForm()}setupEventListeners(){document.addEventListener("showProfile",()=>{this.showProfileModal()})}setupProfileForm(){const e=i.querySelector("#profile-form");if(e&&(e.addEventListener("submit",async t=>{t.preventDefault(),await this.handleProfileUpdate()}),this.profileModal)){const t=this.profileModal.querySelector(".profile-modal-close");t==null||t.addEventListener("click",()=>this.hideProfileModal()),this.profileModal.addEventListener("click",r=>{r.target===this.profileModal&&this.hideProfileModal()})}}showProfileModal(){if(!this.profileModal)return;const e=d.getItem("currentUser");e&&(this.populateProfileForm(e),this.profileModal.style.display="flex",document.body.style.overflow="hidden")}hideProfileModal(){this.profileModal&&(this.profileModal.style.display="none",document.body.style.overflow="")}populateProfileForm(e){const t=i.querySelector("#profile-form");t&&(t.querySelector("#profile-firstName").value=e.firstName,t.querySelector("#profile-lastName").value=e.lastName,t.querySelector("#profile-email").value=e.email,t.querySelector("#profile-company").value=e.company||"",t.querySelector("#profile-phone").value=e.phone||"",e.address&&(t.querySelector("#profile-street").value=e.address.street||"",t.querySelector("#profile-city").value=e.address.city||"",t.querySelector("#profile-state").value=e.address.state||"",t.querySelector("#profile-zipCode").value=e.address.zipCode||"",t.querySelector("#profile-country").value=e.address.country||""))}async handleProfileUpdate(){const e=i.querySelector("#profile-form");if(!e)return;const t=d.getItem("currentUser");if(!t)return;const r=new FormData(e),a=r.get("newPassword"),s=r.get("confirmNewPassword");if(a||s){if(!m.minLength(a,6)){this.notificationManager.show({message:"La nueva contraseña debe tener al menos 6 caracteres.",type:"error"});return}if(a!==s){this.notificationManager.show({message:"Las contraseñas no coinciden.",type:"error"});return}}const o=e.querySelector('button[type="submit"]'),c=o.innerHTML;try{o.innerHTML='<i class="fas fa-spinner fa-spin"></i> Guardando...',o.disabled=!0,await new Promise(p=>setTimeout(p,1e3));const u={...t,firstName:r.get("firstName"),lastName:r.get("lastName"),company:r.get("company")||void 0,phone:r.get("phone")||void 0,address:{street:r.get("street")||"",city:r.get("city")||"",state:r.get("state")||"",zipCode:r.get("zipCode")||"",country:r.get("country")||""}};this.updateUser(u),this.hideProfileModal(),this.notificationManager.show({message:"Perfil actualizado exitosamente.",type:"success"})}catch{this.notificationManager.show({message:"Error al actualizar el perfil. Intenta nuevamente.",type:"error"})}finally{o.innerHTML=c,o.disabled=!1}}updateUser(e){const t=d.getItem("users")||[],r=t.findIndex(s=>s.id===e.id);r>=0&&(t[r]=e,d.setItem("users",t)),d.setItem("currentUser",e);const a=i.querySelector("#user-name");a&&(a.textContent=e.firstName)}}class B{constructor(){this.navigation=new C,this.contactForm=new L,this.serviceManager=new P,this.animationManager=new q,this.cart=new A,this.productCatalog=new I(this.cart),this.paypalIntegration=new H(this.cart),this.authManager=new z,this.orderManager=new F,this.profileManager=new j,this.init()}init(){this.setupTechItemInteractions(),this.setupPortfolioInteractions(),this.setupLoadingComplete(),this.setupOrderCreation(),this.initializePayPal(),console.log("Portal de servicios de Juan José Hernández cargado exitosamente!")}async initializePayPal(){try{await this.paypalIntegration.initializePayPal()}catch(e){console.error("Error initializing PayPal:",e)}}setupTechItemInteractions(){i.querySelectorAll(".tech-item").forEach(t=>{t.addEventListener("mouseenter",()=>{t.style.transform="translateY(-5px) scale(1.05)"}),t.addEventListener("mouseleave",()=>{t.style.transform="translateY(0) scale(1)"})})}setupPortfolioInteractions(){i.querySelectorAll(".portfolio-item").forEach(t=>{t.addEventListener("click",()=>{var a;const r=((a=t.querySelector("h3"))==null?void 0:a.textContent)||"Proyecto";console.log(`Opening project: ${r}`)})})}setupLoadingComplete(){window.addEventListener("load",()=>{document.body.classList.add("loaded")})}setupOrderCreation(){document.addEventListener("createOrder",e=>{const{items:t,totalAmount:r,paypalOrderId:a}=e.detail;try{this.orderManager.createOrder(t,r,a)}catch(s){console.error("Error creating order:",s)}})}getNavigation(){return this.navigation}getServiceManager(){return this.serviceManager}getAnimationManager(){return this.animationManager}getCart(){return this.cart}getProductCatalog(){return this.productCatalog}getAuthManager(){return this.authManager}getOrderManager(){return this.orderManager}getProfileManager(){return this.profileManager}}document.addEventListener("DOMContentLoaded",()=>{const n=new B;window.portalApp=n,window.cart=n.getCart(),window.productCatalog=n.getProductCatalog(),window.authManager=n.getAuthManager(),window.orderManager=n.getOrderManager(),window.profileManager=n.getProfileManager()});
