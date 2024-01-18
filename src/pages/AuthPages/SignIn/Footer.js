function Footer({ onlySocial, type = "white", bg = "transparent", logo }) {
  return (
    <footer
      className={`font-lato ${
        type == "white" || bg == "transparent" ? "bg-transparent" : "bg-gray-50"
      }`}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-md mx-auto pt-4 px-4 sm:max-w-7xl sm:px-6 lg:pt-8 lg:px-8">
        <div
          className={`mt-8 border-t py-4 ${
            type == "white" ? "border-blue-200" : "border-grey-900"
          }`}
        >
          <p
            className={`text-base font-lato text-center ${
              type == "white" ? "theme-indigo-200" : "text-me-primary-gray-1000"
            }`}
          >
            &copy; 2022 Made with love at Caarya
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
