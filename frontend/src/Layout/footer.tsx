export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 px-4 py-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} HoundData
        </p>

        <div className="flex justify-center gap-4 md:justify-end">
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <a href="#" className="hover:text-white">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
