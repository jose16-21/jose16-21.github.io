import React, { useState } from 'react';
import { useCart } from '../../application/hooks/useCart';
import { useAuth } from '../../application/hooks/useAuth';
import { useModal } from '../../application/context/ModalContext';
import { useNavigate, Link } from 'react-router-dom';
import { NotificationManager } from '../../infrastructure/services/NotificationManager';

const CartPage: React.FC = () => {
  const { items, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { openLogin } = useModal();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [comments, setComments] = useState('');
  const [isQuoteMode, setIsQuoteMode] = useState(false);
  const notificationManager = new NotificationManager();

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      const orderType = isQuoteMode ? 'cotización' : 'orden';
      const finalAmount = isQuoteMode ? 0 : totalAmount;
      
      console.log(`💳 Procesando ${orderType}...`);
      console.log('Usuario:', user);
      console.log('Items:', items);
      console.log('Total:', finalAmount);
      console.log('Comentarios:', comments);
      console.log('Es cotización:', isQuoteMode);
      
      // TODO: Enviar orden/cotización al backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (isQuoteMode) {
        notificationManager.show({
          message: '¡Cotización enviada exitosamente! Te contactaremos pronto con los detalles.',
          type: 'success'
        });
        
        alert(`✅ Cotización Enviada\n\nServicios solicitados: ${items.length}\nProductos totales: ${items.reduce((sum, item) => sum + item.quantity, 0)}\n\nComentarios: ${comments || 'Sin comentarios'}\n\nNos pondremos en contacto contigo pronto, ${user?.firstName}!`);
      } else {
        notificationManager.show({
          message: '¡Orden procesada exitosamente! Recibirás un email de confirmación.',
          type: 'success'
        });
        
        alert(`✅ Orden Confirmada\n\nTotal: $${totalAmount.toLocaleString()} USD\nItems: ${items.length}\nProductos: ${items.reduce((sum, item) => sum + item.quantity, 0)}\n\nComentarios: ${comments || 'Sin comentarios'}\n\nGracias por tu compra, ${user?.firstName}!`);
      }
      
      clearCart();
      setComments('');
      setIsQuoteMode(false);
      navigate('/');
    } catch (error) {
      console.error('❌ Error al procesar:', error);
      notificationManager.show({
        message: `Error al procesar la ${isQuoteMode ? 'cotización' : 'orden'}. Intenta de nuevo.`,
        type: 'error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-4"
          >
            <i className="fas fa-arrow-left"></i>
            <span>Volver a servicios</span>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-dark mb-2 flex items-center gap-3">
                <i className="fas fa-shopping-cart text-primary"></i>
                Mi Carrito de Compras
              </h1>
              <p className="text-gray-medium">
                {items.length === 0 
                  ? 'Tu carrito está vacío' 
                  : `${items.length} ${items.length === 1 ? 'servicio' : 'servicios'} en tu carrito`
                }
              </p>
            </div>
            
            {items.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
                    clearCart();
                    notificationManager.show({
                      message: 'Carrito vaciado',
                      type: 'success'
                    });
                  }
                }}
                className="px-4 py-2 text-danger hover:bg-danger/10 rounded-lg transition-colors flex items-center gap-2"
              >
                <i className="fas fa-trash"></i>
                Vaciar carrito
              </button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <i className="fas fa-shopping-cart text-8xl text-gray-300 mb-6"></i>
            <h2 className="text-2xl font-bold text-gray-dark mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-medium mb-8">Explora nuestros servicios profesionales y comienza a construir tu proyecto</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
            >
              <i className="fas fa-search"></i>
              Explorar Servicios
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
                  <i className="fas fa-list text-primary"></i>
                  Servicios Seleccionados
                </h2>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <div 
                      key={item.product.id} 
                      className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-primary/40 hover:shadow-md transition-all"
                    >
                      <div className="flex gap-4">
                        {/* Icono del servicio */}
                        <div className="w-20 h-20 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <i className="fas fa-code text-3xl text-white"></i>
                        </div>
                        
                        {/* Información principal */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-dark mb-2">{item.product.title}</h3>
                              {item.product.shortDescription && (
                                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                  {item.product.shortDescription}
                                </p>
                              )}
                            </div>
                            
                            {/* Botón eliminar */}
                            <button 
                              className="ml-4 w-10 h-10 bg-danger/10 text-danger hover:bg-danger hover:text-white rounded-lg transition-all flex items-center justify-center flex-shrink-0"
                              onClick={() => {
                                removeFromCart(item.product.id);
                                notificationManager.show({
                                  message: `${item.product.title} eliminado del carrito`,
                                  type: 'success'
                                });
                              }}
                              title="Eliminar del carrito"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                          
                          {/* Features */}
                          {item.product.features && item.product.features.length > 0 && (
                            <div className="mb-4">
                              <p className="text-xs font-semibold text-gray-dark mb-2">Características incluidas:</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {item.product.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-dark">
                                    <i className="fas fa-check text-success mt-1 text-xs flex-shrink-0"></i>
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Delivery time */}
                          {item.product.deliveryTime && (
                            <div className="flex items-center gap-2 text-sm text-gray-medium mb-4">
                              <i className="fas fa-clock"></i>
                              <span>Tiempo de entrega: {item.product.deliveryTime}</span>
                            </div>
                          )}
                          
                          {/* Customizaciones */}
                          {item.customizations && (
                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-4">
                              <p className="text-sm text-gray-dark">
                                <i className="fas fa-edit text-primary mr-2"></i>
                                <span className="font-medium">Personalización:</span> {item.customizations}
                              </p>
                            </div>
                          )}
                          
                          {/* Footer con precio y cantidad */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            {/* Cantidad */}
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-gray-dark">Cantidad:</span>
                              <div className="flex items-center gap-2 bg-white rounded-lg border-2 border-gray-300 shadow-sm">
                                <button 
                                  className="px-4 py-2 hover:bg-gray-100 transition-colors text-gray-dark hover:text-dark font-bold rounded-l-lg"
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                >
                                  -
                                </button>
                                <span className="text-dark font-bold min-w-[3rem] text-center text-lg">{item.quantity}</span>
                                <button 
                                  className="px-4 py-2 hover:bg-gray-100 transition-colors text-gray-dark hover:text-dark font-bold rounded-r-lg"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            
                            {/* Precio */}
                            <div className="text-right">
                              <div className="text-xs text-gray-medium mb-1">Precio unitario</div>
                              <div className="text-2xl font-bold text-primary">
                                ${item.product.price.amount.toLocaleString()} <span className="text-base font-normal">{item.product.price.currency}</span>
                              </div>
                              {item.quantity > 1 && (
                                <div className="text-sm text-gray-medium mt-1 font-semibold">
                                  Subtotal: ${(item.product.price.amount * item.quantity).toLocaleString()} {item.product.price.currency}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumen y Checkout */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
                  <i className="fas fa-receipt text-primary"></i>
                  Resumen
                </h2>
                
                {/* Resumen de la orden */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-medium flex items-center gap-2">
                      <i className="fas fa-shopping-bag"></i>
                      Total de productos
                    </span>
                    <span className="text-lg font-bold text-dark">
                      {items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-medium flex items-center gap-2">
                      <i className="fas fa-tags"></i>
                      Servicios únicos
                    </span>
                    <span className="text-lg font-bold text-dark">{items.length}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-semibold text-dark">Total:</span>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        ${isQuoteMode ? 0 : totalAmount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-medium">
                        {isQuoteMode ? 'Cotización' : 'USD'}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Campo de comentarios */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-2">
                    <i className="fas fa-comment-alt text-primary"></i>
                    Comentarios <span className="text-gray-medium font-normal">(Opcional)</span>
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Requisitos especiales, preferencias de tecnología, plazos específicos..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none text-sm"
                    rows={4}
                    maxLength={500}
                  />
                  <div className="flex justify-end mt-2">
                    <span className="text-xs text-gray-medium">
                      {comments.length}/500
                    </span>
                  </div>
                </div>

                {/* Toggle para modo cotización */}
                <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl p-4 mb-6 border-2 border-secondary/30">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isQuoteMode}
                      onChange={(e) => setIsQuoteMode(e.target.checked)}
                      className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary/50 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-dark font-semibold mb-1">
                        <i className="fas fa-file-invoice text-secondary"></i>
                        Solicitar cotización sin costo
                      </div>
                      <p className="text-xs text-gray-medium">
                        Te contactaremos con precios personalizados y detalles del proyecto.
                      </p>
                    </div>
                  </label>
                </div>
                
                {!isAuthenticated ? (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <i className="fas fa-info-circle text-primary text-2xl"></i>
                      <p className="text-gray-dark">Inicia sesión para proceder con la compra</p>
                      <button 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all" 
                        onClick={openLogin}
                      >
                        <i className="fas fa-sign-in-alt"></i>
                        Iniciar Sesión
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button 
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4 ${
                        isQuoteMode 
                          ? 'bg-gradient-to-r from-secondary to-accent text-white' 
                          : 'bg-gradient-primary text-white'
                      }`}
                      onClick={handleCheckout}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>
                          Procesando...
                        </>
                      ) : isQuoteMode ? (
                        <>
                          <i className="fas fa-file-invoice"></i>
                          Solicitar Cotización
                        </>
                      ) : (
                        <>
                          <i className="fas fa-credit-card"></i>
                          Proceder al Pago - ${totalAmount.toLocaleString()} USD
                        </>
                      )}
                    </button>
                    
                    {!isQuoteMode && (
                      <div className="flex gap-3 justify-center mb-4 opacity-70">
                        <i className="fab fa-cc-visa text-3xl text-gray-dark"></i>
                        <i className="fab fa-cc-mastercard text-3xl text-gray-dark"></i>
                        <i className="fab fa-cc-paypal text-3xl text-gray-dark"></i>
                        <i className="fab fa-cc-amex text-3xl text-gray-dark"></i>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-medium">
                      <i className={`fas ${isQuoteMode ? 'fa-envelope' : 'fa-shield-alt'} ${isQuoteMode ? 'text-secondary' : 'text-success'}`}></i>
                      <span>{isQuoteMode ? 'Cotización por email' : 'Pago seguro - Simulación'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
