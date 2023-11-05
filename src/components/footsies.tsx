const footerText = ["[object Object]", "undefined"];
export const Footsies = () => {
  const currentYear = new Date().getFullYear();
  const randomFooterText =
    footerText[Math.floor(Math.random() * footerText.length)];
  return (
    <footer className="mt-auto flex h-12 w-full items-center justify-between border-t border-border">
      <span className="text-gray10">{randomFooterText}</span>
      <span className="text-gray10">{currentYear}</span>
    </footer>
  );
};
