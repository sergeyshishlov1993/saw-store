import { ref, onMounted, onBeforeUnmount } from "vue";

export default function useScrollToTop() {
  const showScrollToTop = ref(false);

  const checkScroll = () => {
    showScrollToTop.value = window.scrollY > 100; // Показывать кнопку после прокрутки 100px
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  onMounted(() => {
    window.addEventListener("scroll", checkScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", checkScroll);
  });

  return {
    showScrollToTop,
    scrollToTop,
  };
}
