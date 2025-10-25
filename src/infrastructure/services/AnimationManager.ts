import { DOMUtils, AnimationUtils, PerformanceUtils } from '../../utils';

export class AnimationManager {
  private animatedElements: NodeListOf<Element>;
  private statsAnimated: boolean = false;

  constructor() {
    this.animatedElements = DOMUtils.querySelectorAll<Element>('[data-aos]');
    
    this.init();
  }

  private init(): void {
    this.setupScrollAnimations();
    this.setupStatsAnimation();
    this.setupParallaxEffect();
    this.setupTypingEffect();
  }

  private setupScrollAnimations(): void {
    AnimationUtils.animateOnScroll(this.animatedElements);
  }

  private setupStatsAnimation(): void {
    const stats = DOMUtils.querySelectorAll<HTMLElement>('.stat-number');
    
    const animateStats = PerformanceUtils.throttle(() => {
      if (this.statsAnimated) return;

      stats.forEach(stat => {
        const elementTop = stat.getBoundingClientRect().top;
        
        if (elementTop < window.innerHeight && !stat.classList.contains('animated')) {
          this.animateCounter(stat);
        }
      });
    }, 100);

    window.addEventListener('scroll', animateStats);
  }

  private animateCounter(element: HTMLElement): void {
    const target = parseInt(element.textContent?.replace(/\D/g, '') || '0');
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    element.classList.add('animated');
    
    const updateCount = () => {
      if (current < target) {
        current += increment;
        if (current > target) current = target;
        element.textContent = Math.floor(current) + '+';
        requestAnimationFrame(updateCount);
      } else {
        this.statsAnimated = true;
      }
    };
    
    updateCount();
  }

  private setupParallaxEffect(): void {
    const shapes = DOMUtils.querySelectorAll<HTMLElement>('.bg-shape');
    
    const handleParallax = PerformanceUtils.throttle(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.2;
        shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
      });
    }, 16);

    window.addEventListener('scroll', handleParallax);
  }

  private setupTypingEffect(): void {
    const titleElement = DOMUtils.querySelector<HTMLElement>('.title-highlight');
    if (!titleElement) return;

    const text = titleElement.textContent || '';
    titleElement.textContent = '';
    titleElement.style.borderRight = '2px solid var(--primary-color)';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        titleElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Remove cursor after typing
        setTimeout(() => {
          titleElement.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    // Start typing after page load
    setTimeout(typeWriter, 1000);
  }

  public animateElement(element: HTMLElement, animation: 'fadeIn' | 'slideUp'): void {
    switch (animation) {
      case 'fadeIn':
        AnimationUtils.fadeIn(element);
        break;
      case 'slideUp':
        AnimationUtils.slideUp(element);
        break;
    }
  }

  public resetAnimations(): void {
    this.statsAnimated = false;
    
    const animatedStats = DOMUtils.querySelectorAll<HTMLElement>('.stat-number.animated');
    animatedStats.forEach(stat => {
      stat.classList.remove('animated');
    });
  }
}