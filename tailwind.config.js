module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
      extend: {
        colors: {
          // Phần custom
        },
        height: {
          100: "800px",
          99 :  "680px"
         },
        container: {
          screens: {
            'sm': '100%',
            'md': '100%',
            'lg': '960px',
            'xl': '1140px',
            'xxl': '1200px',
          }
        }
      },
    },
    plugins: [
      
    ],
    
    // corePlugins: {
    //   preflight: false,
    // }, // Tránh đè css
  }