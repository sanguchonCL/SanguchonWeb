export default {
  theme: {
    extend: {
      keyframes: {
        "holiday-shimmer": {
          "0%, 30%": { transform: "translateX(-125%)" },
          "70%, 100%": { transform: "translateX(125%)" },
        },
      },
      animation: {
        "holiday-shimmer": "holiday-shimmer 2.4s ease-in-out 2",
      },
    },
  },
};
