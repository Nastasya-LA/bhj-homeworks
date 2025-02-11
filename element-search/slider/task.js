// class Slider {
//     constructor(selector) {
//       this.element = document.querySelector(selector);
//       this.items = this.element.querySelectorAll('.slider__item');
//       this.currentItem = this.items[0];
//       this.currentIndex = 0;
//       this.setupEventListeners();
//       this.animateSlider();
//     }
  
//     setupEventListeners() {
//       const prevArrow = this.element.querySelector('.slider__arrow_prev');
//       const nextArrow = this.element.querySelector('.slider__arrow_next');
  
//       prevArrow.addEventListener('click', () => this.prevSlide());
//       nextArrow.addEventListener('click', () => this.nextSlide());
//     }
  
//     nextSlide() {
//       if (this.currentIndex === this.items.length - 1) {
//         this.currentIndex = 0;
//       } else {
//         this.currentIndex++;
//       }
//       this.updateSlider();
//     }
  
//     prevSlide() {
//       if (this.currentIndex === 0) {
//         this.currentIndex = this.items.length - 1;
//       } else {
//         this.currentIndex--;
//       }
//       this.updateSlider();
//     }
  
//     updateSlider() {
//       const activeItem = this.currentItem.classList.contains('slider__item_active')
//         ? this.currentItem.nextElementSibling
//         : this.currentItem.previousElementSibling;
  
//       activeItem.classList.remove('slider__item_active');
//       activeItem.style.transform = 'scale(1)';
//       this.currentItem.classList.add('slider__item_active');
  
//       const index = Array.from(this.items).indexOf(activeItem);
//       this.currentItem = activeItem;
//       this.currentIndex = index;
//     }
  
//     animateSlider() {
//       setInterval(() => {
//         this.nextSlide();
//       }, 3000);
//     }
//   }
  
//   // Инициализация слайдера
//   const slider = new Slider('.slider');
  




document.addEventListener('DOMContentLoaded', () => {
    const sliderItems = document.querySelectorAll('.slider__item');
    const sliderArrows = document.querySelectorAll('.slider__arrow');
    const sliderDotsContainer = document.querySelector('.slider__dots');

    // Создаем массив слайдеров
    const sliders = Array.from(sliderItems);
    
    // Инициализируем текущий индекс
    let currentIndex = 0;

    // Функция для переключения слайдов вперед
    function nextSlide() {
        currentIndex = (currentIndex + 1) % sliders.length;
        activateSlide(currentIndex);
    }

    // Функция для переключения слайдов назад
    function prevSlide() {
        currentIndex = (currentIndex - 1 + sliders.length) % sliders.length;
        activateSlide(currentIndex);
    }

    // Функция для активации слайда
    function activateSlide(index) {
        sliders.forEach((slide, i) => {
            slide.classList.toggle('slider__item_active', i === index);
        });

        // Обновляем точки навигации
        updateNavigationDots();
    }

    // Функция обновления точек навигации
    function updateNavigationDots() {
        const dots = document.querySelectorAll('.slider__dot');
        dots.forEach(dot => dot.classList.remove('slider__dot_active'));
        
        const activeDot = sliders[currentIndex].querySelector('.slider__image');
        const dotIndex = Array.from(activeDot.closest('.slider__item').children).indexOf(activeDot);
        document.querySelectorAll(`.slider__dot:nth-child(${dotIndex + 1})`).forEach(d => d.classList.add('slider__dot_active'));
    }

    // Добавляем обработчики событий для кнопок навигации
    sliderArrows.forEach(arrow => {
        arrow.addEventListener('click', (e) => {
            e.preventDefault();
            if (arrow.classList.contains('slider__arrow_next')) {
                nextSlide();
            } else {
                prevSlide();
            }
        });
    });

    // Добавляем обработчик клика на слайды
    sliders.forEach(slide => {
        slide.addEventListener('click', () => {
            const image = slide.querySelector('.slider__image');
            const index = Array.from(image.closest('.slider__item').children).indexOf(image);
            currentIndex = index;
            activateSlide(currentIndex);
        });
    });

    // Инициализация
    activateSlide(currentIndex);

    // Автоматическое переключение слайдов каждые 5 секунд
    setInterval(nextSlide, 5000);
});









// import { useState } from 'react';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// // Интерфейс для пропсов компонента
// interface SliderProps {
//   images?: string[];
// }

// // Значения по умолчанию для демонстрации
// const defaultImages = [
//   'https://picsum.photos/id/1018/800/400',
//   'https://picsum.photos/id/1015/800/400',
//   'https://picsum.photos/id/1019/800/400',
// ];




// const Slider = ({ images = defaultImages }: SliderProps) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Обработчик изменения слайда
//   const handleSelect = (index: number) => {
//     setCurrentIndex(index % images.length);
//   };

//   return (
//     <div className="relative w-full max-w-3xl mx-auto">
//       <Carousel
//         opts={{
//           align: "center",
//           loop: true,
//         }}
//         onSelect={(index) => handleSelect(index)}
//         className="w-full"
//       >
//         <CarouselContent>
//           {images.map((image, index) => (
//             <CarouselItem key={index}>
//               <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg">
//                 <img
//                   src={image}
//                   alt={`Слайд ${index + 1}`}
//                   className="absolute inset-0 w-full h-full object-cover"
//                 />
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>

//         {/* Навигационные стрелки */}
//         <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
//           <CarouselPrevious className="bg-black/20 hover:bg-black/40 transition-colors rounded-full p-2" />
//           <CarouselNext className="bg-black/20 hover:bg-black/40 transition-colors rounded-full p-2" />
//         </div>

//         {/* Точки навигации */}
//         <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 p-2">
//           {images.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => handleSelect(index)}
//               aria-label={`Перейти к слайду ${index + 1}`}
//               className={`w-3 h-3 rounded-full transition-colors ${
//                 currentIndex === index 
//                   ? 'bg-white shadow-md' 
//                   : 'bg-gray-400 hover:bg-gray-500'
//               }`}
//             />
//           ))}
//         </div>
//       </Carousel>
//     </div>
//   );
// };

// export default Slider;